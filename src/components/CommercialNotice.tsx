/**
 * Google Ads compliance components — B2B commercial-only positioning.
 * The notice goes at the top of the homepage, service pages, and blog posts;
 * the disclaimer goes in the footer and at the bottom of every blog post.
 */

export const COMMERCIAL_NOTICE =
  "Commercial Service Notice: Starnet Pros provides hardware installation " +
  "and cabling services exclusively to commercial businesses, corporate " +
  "offices, remote construction sites, agricultural facilities, and " +
  "enterprise clients. We do not offer residential installation, consumer " +
  "setups, or personal technical support.";

export const BRAND_DISCLAIMER =
  "Disclaimer: Starnet Pros is an independent, third-party contractor " +
  "specializing in commercial mounting, cabling, and custom hardware " +
  "installation services. We are not affiliated with, authorized by, " +
  "sponsored by, or an official partner of Starlink or SpaceX. All product " +
  "names, trademarks, and registered trademarks (including “Starlink”) are " +
  "the property of their respective owners and are used here solely for " +
  "descriptive purposes to identify the equipment being installed.";

export function CommercialNoticeBanner() {
  return (
    <div className="bg-[#0A1628] border-b border-white/10">
      <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 text-center text-xs text-gray-300 leading-relaxed">
        {COMMERCIAL_NOTICE}
      </p>
    </div>
  );
}

export function BrandDisclaimerBlock() {
  return (
    <p className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-xs text-gray-500 leading-relaxed">
      {BRAND_DISCLAIMER}
    </p>
  );
}
