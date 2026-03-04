import type { Order } from "@/types/store";

interface Props {
  order: Order;
}

export function NewOrderAlert({ order }: Props) {
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
          <div style={{ background: "#0A1628", padding: "24px 40px" }}>
            <p
              style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: 0 }}
            >
              New Order Alert
            </p>
          </div>
          <div style={{ padding: "32px 40px" }}>
            <p
              style={{
                color: "#111827",
                fontSize: 16,
                fontWeight: 700,
                marginTop: 0,
              }}
            >
              Order #{orderId}
            </p>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Customer:{" "}
              <strong style={{ color: "#111827" }}>
                {order.customer_name}
              </strong>{" "}
              ({order.customer_email})
            </p>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Ship to: {line1}, {city}, {state} {postal_code}
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16,
              }}
            >
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "8px 0",
                        color: "#111827",
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "8px 0",
                        textAlign: "center",
                        color: "#6b7280",
                      }}
                    >
                      x{item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "8px 0",
                        textAlign: "right",
                        color: "#111827",
                      }}
                    >
                      ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                color: "#111827",
                fontSize: 18,
                fontWeight: 700,
                marginTop: 16,
                borderTop: "1px solid #e5e7eb",
                paddingTop: 16,
              }}
            >
              Total: ${(order.total_cents / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
