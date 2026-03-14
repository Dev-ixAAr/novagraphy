// app/api/payhere/notify/route.ts
// PayHere IPN (Instant Payment Notification) Webhook
// This endpoint receives server-to-server POST from PayHere after payment

import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend, FROM_EMAIL } from "@/lib/resend";
import OrderReceipt from "@/components/emails/OrderReceipt";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract all required fields from PayHere's POST
    const merchant_id = formData.get("merchant_id") as string;
    const order_id = formData.get("order_id") as string;
    const payment_id = formData.get("payment_id") as string;
    const payhere_amount = formData.get("payhere_amount") as string;
    const payhere_currency = formData.get("payhere_currency") as string;
    const status_code = formData.get("status_code") as string;
    const md5sig = formData.get("md5sig") as string;

    console.log(`[PayHere IPN] order_id=${order_id}, status_code=${status_code}, payment_id=${payment_id}`);

    // Validate required fields
    if (!merchant_id || !order_id || !payhere_amount || !payhere_currency || !status_code || !md5sig) {
      console.error("[PayHere IPN] Missing required fields");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Step 1: Validate PayHere MD5 Signature
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;

    // 1a. MD5 hash the secret → uppercase
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    // 1b. Concatenate: merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret
    const rawString = merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret;

    // 1c. MD5 hash the concatenated string → uppercase
    const localMd5Sig = crypto
      .createHash("md5")
      .update(rawString)
      .digest("hex")
      .toUpperCase();

    // 1d. Compare signatures
    if (localMd5Sig !== md5sig) {
      console.error("[PayHere IPN] ❌ Invalid signature! Local:", localMd5Sig, "Received:", md5sig);
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    console.log("[PayHere IPN] ✅ Signature verified");

    // ✅ Step 2: Process based on status code
    // PayHere status codes:
    // 2 = Success
    // 0 = Pending
    // -1 = Canceled
    // -2 = Failed
    // -3 = Chargedback

    if (status_code === "2") {
      // ✅ Payment successful — update order to PAID
      const order = await prisma.order.update({
        where: { orderNumber: order_id },
        data: {
          status: "PAID",
          paymentId: payment_id,
        },
        include: { items: true },
      });

      console.log(`[PayHere IPN] ✅ Order ${order_id} marked as PAID (payment: ${payment_id})`);

      // ✅ Send Order Receipt Email NOW (after confirmed payment)
      try {
        const { error: resendError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: order.email,
          subject: `Payment Confirmed — ${order.orderNumber}`,
          react: OrderReceipt({
            customerName: order.name,
            orderNumber: order.orderNumber,
            items: order.items.map((item) => ({
              name: item.name,
              color: item.color,
              size: item.size,
              price: item.price,
              quantity: item.quantity,
            })),
            subtotal: order.subtotal,
            shipping: order.shipping,
            tax: order.tax,
            totalAmount: order.totalAmount,
            shippingAddress: order.address,
            city: order.city,
          }),
        });

        if (resendError) {
          console.error("RESEND EMAIL ERROR:", resendError);
        } else {
          console.log(`[PayHere IPN] 📧 Receipt email sent to ${order.email}`);
        }
      } catch (error) {
        console.error("RESEND EMAIL ERROR:", error);
      }
    } else if (status_code === "0") {
      console.log(`[PayHere IPN] ⏳ Order ${order_id} payment pending`);
    } else {
      await prisma.order.update({
        where: { orderNumber: order_id },
        data: {
          status: "CANCELLED",
          paymentId: payment_id,
        },
      });
      console.log(`[PayHere IPN] ❌ Order ${order_id} cancelled (status_code: ${status_code})`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[PayHere IPN] Error processing notification:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
