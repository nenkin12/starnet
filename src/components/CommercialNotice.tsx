/**
 * Brand disclaimer — third-party / non-affiliation disclosure.
 * Rendered in the footer and at the bottom of every blog post.
 */

export const BRAND_DISCLAIMER =
  "Disclaimer: Starnet Pros is an independent, third-party contractor " +
  "specializing in commercial mounting, cabling, and custom hardware " +
  "installation services. We are not affiliated with, authorized by, " +
  "sponsored by, or an official partner of Starlink or SpaceX. All product " +
  "names, trademarks, and registered trademarks (including “Starlink”) are " +
  "the property of their respective owners and are used here solely for " +
  "descriptive purposes to identify the equipment being installed.";

export function BrandDisclaimerBlock() {
  return (
    <p className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-xs text-gray-500 leading-relaxed">
      {BRAND_DISCLAIMER}
    </p>
  );
}
