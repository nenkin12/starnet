import type { Order } from "@/types/store";

interface Props {
  order: Order;
  customerName: string;
}

export function OrderConfirmation({ order, customerName }: Props) {
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
              Order Confirmed
            </h1>
            <p style={{ color: "#6b7280" }}>
              Hi {customerName}, thanks for your order! We&apos;ll send tracking
              info once it ships.
            </p>
            <p style={{ color: "#6b7280" }}>
              Order ID:{" "}
              <strong style={{ color: "#111827" }}>#{orderId}</strong>
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 24,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px 0",
                      color: "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "8px 0",
                      color: "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "8px 0",
                      color: "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 0", color: "#111827", fontSize: 14 }}>
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 0",
                        textAlign: "right",
                        color: "#6b7280",
                        fontSize: 14,
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "12px 0",
                        textAlign: "right",
                        color: "#111827",
                        fontSize: 14,
                      }}
                    >
                      ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <p style={{ color: "#111827", fontWeight: 700, fontSize: 16 }}>
                Total: ${(order.total_cents / 100).toFixed(2)}
              </p>
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
                {customerName}
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
