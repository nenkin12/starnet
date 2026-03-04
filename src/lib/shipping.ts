const FREE_SHIPPING_THRESHOLD_CENTS = 15000; // $150.00
const FLAT_SHIPPING_CENTS = 999; // $9.99

export function calculateShipping(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
    ? 0
    : FLAT_SHIPPING_CENTS;
}
