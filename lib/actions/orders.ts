// lib/actions/orders.ts
"use server";

import { prisma } from "@/lib/prisma";
import { generatePayHereHash, PAYHERE_CONFIG } from "@/lib/payhere";

type OrderItemInput = {
  productId: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
  image?: string;
};

type CreateOrderInput = {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  items: OrderItemInput[];
};

export type PayHereCheckoutData = {
  orderId: string;
  orderNumber: string;
  hash: string;
  merchantId: string;
  checkoutUrl: string;
  amount: string;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  itemsSummary: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
};

export async function createOrder(input: CreateOrderInput): Promise<PayHereCheckoutData> {
  // 0. Validate all product IDs exist before creating the order
  const productIds = [...new Set(input.items.map((i) => i.productId))];
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true },
  });
  const existingIds = new Set(existingProducts.map((p) => p.id));
  const missingIds = productIds.filter((id) => !existingIds.has(id));

  if (missingIds.length > 0) {
    throw new Error(
      `Some products in your cart are no longer available. Please refresh your cart and try again.`
    );
  }

  const subtotal = input.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shipping + tax;

  // 1. Save order to DB with PENDING status
  const order = await prisma.order.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      city: input.city,
      state: input.state,
      postalCode: input.postalCode,
      country: input.country ?? "LK",
      subtotal,
      shipping,
      tax,
      totalAmount,
      status: "PENDING",
      items: {
        create: input.items,
      },
    },
    include: { items: true },
  });

  // 2. Generate PayHere hash and return checkout data
  // ✅ Email is NOT sent here — it fires from the IPN webhook after confirmed payment
  const currency = "LKR";
  const hash = generatePayHereHash(order.orderNumber, totalAmount, currency);

  const nameParts = input.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // ⚠️ IMPORTANT (localhost only): PayHere's notify_url requires a publicly accessible URL.
  // When developing locally, use ngrok (e.g. https://<id>.ngrok-free.app) and set
  // NEXT_PUBLIC_BASE_URL in your .env to the ngrok URL so the IPN webhook can reach your server.
  // Example: NEXT_PUBLIC_BASE_URL=https://abc123.ngrok-free.app

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    hash,
    merchantId: PAYHERE_CONFIG.merchantId,
    checkoutUrl: PAYHERE_CONFIG.checkoutUrl,
    amount: totalAmount.toFixed(2),
    currency,
    firstName,
    lastName,
    email: input.email,
    phone: input.phone || "",
    address: input.address,
    city: input.city,
    country: input.country ?? "LK",
    itemsSummary: input.items.map((i) => i.name).join(", "),
    returnUrl: `${baseUrl}/success`,
    cancelUrl: `${baseUrl}/cancel`,
    notifyUrl: `${baseUrl}/api/payhere/notify`,
  };
}

export async function getOrders() {
  return prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(
  id: string,
  status: "PENDING" | "PAID" | "CONFIRMED" | "PACKED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED",
  trackingNumber?: string
) {
  return prisma.order.update({
    where: { id },
    data: {
      status,
      ...(trackingNumber ? { trackingNumber } : {}),
    },
  });
}