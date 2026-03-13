// lib/payhere.ts
import crypto from "crypto";

// ============================================
// PayHere Configuration
// ============================================
export const PAYHERE_CONFIG = {
  merchantId: process.env.PAYHERE_MERCHANT_ID!,
  merchantSecret: process.env.PAYHERE_MERCHANT_SECRET!,
  isSandbox: process.env.PAYHERE_ENV !== "live",
  get checkoutUrl() {
    return this.isSandbox
      ? "https://sandbox.payhere.lk/pay/checkout"
      : "https://www.payhere.lk/pay/checkout";
  },
};

// ============================================
// Generate PayHere Checkout Hash
// Formula: md5(merchant_id + order_id + amount_formatted + currency + md5(merchant_secret))
// ============================================
export function generatePayHereHash(
  orderId: string,
  amount: number,
  currency: string = "LKR"
): string {
  const merchantId = PAYHERE_CONFIG.merchantId;
  const merchantSecret = PAYHERE_CONFIG.merchantSecret;

  // Amount MUST be formatted to 2 decimal places
  const amountFormatted = amount.toFixed(2);

  // Step 1: MD5 of the merchant secret (uppercase)
  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  // Step 2: MD5 of the full string
  const rawString = merchantId + orderId + amountFormatted + currency + secretHash;

  return crypto
    .createHash("md5")
    .update(rawString)
    .digest("hex")
    .toUpperCase();
}

// ============================================
// Verify PayHere IPN Signature
// Formula: md5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + md5(merchant_secret))
// ============================================
export function verifyPayHereSignature(params: {
  merchant_id: string;
  order_id: string;
  payhere_amount: string;
  payhere_currency: string;
  status_code: string;
  md5sig: string;
}): boolean {
  const merchantSecret = PAYHERE_CONFIG.merchantSecret;

  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const rawString =
    params.merchant_id +
    params.order_id +
    params.payhere_amount +
    params.payhere_currency +
    params.status_code +
    secretHash;

  const localSig = crypto
    .createHash("md5")
    .update(rawString)
    .digest("hex")
    .toUpperCase();

  return localSig === params.md5sig.toUpperCase();
}
