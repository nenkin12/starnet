import type { Order } from "@/types/store";

interface Props {
  order: Order;
  trackingNumber: string;
  trackingUrl: string;
}

export function ShippingConfirmation({
  order,
  trackingNumber,
  trackingUrl,
}: Props) {
  const orderId = order.id.slice(-8).toUpperCase();
  const { line1, city, state, postal_code } = order.shipping_address;

  return (
    <html>
      <body
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          background: "#f9fafb",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ background: "#0A1628", padding: "32px 40px" }}>
            <p
              style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}
            >
              Starnet Pros
            </p>
          </div>
          <div style={{ padding: "32px 40px" }}>
            <h1
              style={{
                color: "#111827",
                fontSize: 20,
                fontWeight: 700,
                marginTop: 0,
              }}
            >
              Your Order Has Shipped!
            </h1>
            <p style={{ color: "#6b7280" }}>
              Hi {order.customer_name}, your order #{orderId} is on its way!
            </p>
            <div
              style={{
                marginTop: 24,
                padding: 20,
                background: "#eff6ff",
                borderRadius: 12,
                border: "1px solid #bfdbfe",
              }}
            >
              <p
                style={{
                  color: "#1e40af",
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 0,
                  textTransform: "uppercase",
                }}
              >
                Tracking Number
              </p>
              <p
                style={{
                  color: "#111827",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "8px 0",
                }}
              >
                {trackingNumber}
              </p>
              {trackingUrl && (
                <a
                  href={trackingUrl}
                  style={{
                    display: "inline-block",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    marginTop: 8,
                  }}
                >
                  Track Your Package
                </a>
              )}
            </div>
            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: "#f9fafb",
                borderRadius: 8,
              }}
            >
              <p
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 0,
                }}
              >
                SHIPPING TO
              </p>
              <p style={{ color: "#111827", fontSize: 14, margin: 0 }}>
                {order.customer_name}
                <br />
                {line1}
                <br />
                {city}, {state} {postal_code}
              </p>
            </div>
          </div>
          <div
            style={{
              background: "#f9fafb",
              padding: "24px 40px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                color: "#9ca3af",
                fontSize: 12,
                margin: 0,
                textAlign: "center",
              }}
            >
              Questions? Email info@starnetpros.com or call (833) 411-2089
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
