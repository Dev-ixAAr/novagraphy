import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

type OrderItem = {
  name: string;
  color?: string | null;
  size?: string | null;
  price: number;
  quantity: number;
};

type OrderReceiptProps = {
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  totalAmount: number;
  shippingAddress: string;
  city: string;
};

export default function OrderReceipt({
  customerName = "Customer",
  orderNumber = "#NVG-0001",
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  totalAmount = 0,
  shippingAddress = "",
  city = "",
}: OrderReceiptProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Novagraphy order {orderNumber} has been confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={logo}>NOVAGRAPHY</Text>
            <Text style={subtitle}>ORDER CONFIRMED</Text>
          </Section>

          <Hr style={divider} />

          {/* Greeting */}
          <Section style={section}>
            <Heading style={heading}>Thank you, {customerName}.</Heading>
            <Text style={paragraph}>
              Your order has been received and is being processed. Here&apos;s a
              summary of your purchase.
            </Text>
          </Section>

          {/* Order Number */}
          <Section style={orderBadgeSection}>
            <Text style={orderBadge}>ORDER {orderNumber}</Text>
          </Section>

          <Hr style={divider} />

          {/* Items */}
          <Section style={section}>
            <Text style={sectionTitle}>ITEMS</Text>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemDetails}>
                  <Text style={itemName}>{item.name}</Text>
                  {(item.color || item.size) && (
                    <Text style={itemMeta}>
                      {[item.color, item.size].filter(Boolean).join(" / ")}
                    </Text>
                  )}
                </Column>
                <Column style={itemPrice} align="right">
                  <Text style={priceText}>
                    {item.quantity}x ${item.price.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Totals */}
          <Section style={section}>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>${subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Tax</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>${tax.toFixed(2)}</Text>
              </Column>
            </Row>
            <Hr style={thinDivider} />
            <Row style={totalRow}>
              <Column>
                <Text style={grandTotalLabel}>TOTAL</Text>
              </Column>
              <Column align="right">
                <Text style={grandTotalValue}>${totalAmount.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Shipping Address */}
          <Section style={section}>
            <Text style={sectionTitle}>SHIPPING TO</Text>
            <Text style={addressText}>
              {customerName}
              <br />
              {shippingAddress}
              <br />
              {city}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              If you have any questions about your order, reply to this email or
              contact us at hello@novagraphy.com.
            </Text>
            <Text style={footerBrand}>
              © {new Date().getFullYear()} NOVAGRAPHY. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ============================================
// STYLES — Premium Dark Theme
// ============================================
const main: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 20px",
};

const headerSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const logo: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#ffffff",
  letterSpacing: "6px",
  margin: "0",
};

const subtitle: React.CSSProperties = {
  fontSize: "11px",
  color: "#2DE1FC",
  letterSpacing: "4px",
  marginTop: "8px",
};

const divider: React.CSSProperties = {
  borderColor: "#1a1a1a",
  margin: "24px 0",
};

const thinDivider: React.CSSProperties = {
  borderColor: "#1a1a1a",
  margin: "12px 0",
};

const section: React.CSSProperties = {
  padding: "0 4px",
};

const heading: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "300",
  margin: "0 0 12px 0",
};

const paragraph: React.CSSProperties = {
  color: "#888888",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "10px",
  color: "#555555",
  letterSpacing: "3px",
  fontWeight: "600",
  marginBottom: "16px",
};

const orderBadgeSection: React.CSSProperties = {
  textAlign: "center" as const,
};

const orderBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 20px",
  border: "1px solid #2DE1FC",
  borderRadius: "999px",
  color: "#2DE1FC",
  fontSize: "12px",
  letterSpacing: "3px",
  fontWeight: "600",
};

const itemRow: React.CSSProperties = {
  marginBottom: "12px",
};

const itemDetails: React.CSSProperties = {
  verticalAlign: "top",
};

const itemName: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const itemMeta: React.CSSProperties = {
  color: "#666666",
  fontSize: "12px",
  margin: "2px 0 0 0",
};

const itemPrice: React.CSSProperties = {
  verticalAlign: "top",
};

const priceText: React.CSSProperties = {
  color: "#aaaaaa",
  fontSize: "14px",
  margin: "0",
};

const totalRow: React.CSSProperties = {
  marginBottom: "4px",
};

const totalLabel: React.CSSProperties = {
  color: "#666666",
  fontSize: "13px",
  margin: "0",
};

const totalValue: React.CSSProperties = {
  color: "#aaaaaa",
  fontSize: "13px",
  margin: "0",
};

const grandTotalLabel: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
};

const grandTotalValue: React.CSSProperties = {
  color: "#2DE1FC",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const addressText: React.CSSProperties = {
  color: "#aaaaaa",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const footerSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const footerText: React.CSSProperties = {
  color: "#555555",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 16px 0",
};

const footerBrand: React.CSSProperties = {
  color: "#333333",
  fontSize: "10px",
  letterSpacing: "3px",
  margin: "0",
};
