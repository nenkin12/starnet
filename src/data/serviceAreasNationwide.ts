import { ServiceArea } from "./serviceAreas";

/** Build a service area from city/state with consistent copy for nationwide coverage. */
function area(
  city: string,
  state: string,
  stateAbbr: string,
  testimonialId: number = 1
): ServiceArea {
  const slug = `${city.toLowerCase().replace(/\s+/g, "-").replace(/[.'']/g, "")}-${stateAbbr.toLowerCase()}`;
  return {
    city,
    state,
    stateAbbr,
    slug,
    description: `Starnet Pros provides professional Starlink installation throughout the greater ${city} area and ${state}. Whether you're in the city limits or in surrounding rural and suburban communities, we deliver clean, reliable installations that get you connected with high-speed satellite internet.`,
    challenges: `Many areas in and around ${city} face connectivity gaps — from new developments waiting on fiber to rural properties that traditional ISPs have not reached. Starlink offers an immediate, high-speed alternative.`,
    benefits: `With Starlink installed by Starnet Pros, ${city}-area customers enjoy speeds that rival fiber, often exceeding 600 Mbps. Our professional installation includes optimal dish placement, clean cable routing, and a full walkthrough so you get the most from your connection.`,
    testimonialId,
  };
}

/** Major metros and regions across most states — broad coverage list. */
export const serviceAreasNationwide: ServiceArea[] = [
  // Alabama
  area("Birmingham", "Alabama", "AL"),
  area("Montgomery", "Alabama", "AL", 2),
  area("Mobile", "Alabama", "AL", 3),
  // Arizona
  area("Phoenix", "Arizona", "AZ"),
  area("Tucson", "Arizona", "AZ", 2),
  area("Scottsdale", "Arizona", "AZ", 3),
  area("Mesa", "Arizona", "AZ"),
  // Arkansas
  area("Little Rock", "Arkansas", "AR"),
  // California
  area("Los Angeles", "California", "CA"),
  area("San Diego", "California", "CA", 2),
  area("San Francisco", "California", "CA", 3),
  area("Sacramento", "California", "CA"),
  area("San Jose", "California", "CA", 2),
  area("Fresno", "California", "CA", 3),
  area("Bakersfield", "California", "CA"),
  area("Riverside", "California", "CA", 2),
  area("Modesto", "California", "CA"),
  // Colorado
  area("Denver", "Colorado", "CO"),
  area("Colorado Springs", "Colorado", "CO", 2),
  area("Fort Collins", "Colorado", "CO", 3),
  area("Pueblo", "Colorado", "CO"),
  // Connecticut
  area("Hartford", "Connecticut", "CT"),
  area("New Haven", "Connecticut", "CT", 2),
  area("Stamford", "Connecticut", "CT"),
  // Delaware
  area("Wilmington", "Delaware", "DE"),
  area("Dover", "Delaware", "DE", 2),
  // Florida
  area("Jacksonville", "Florida", "FL"),
  area("Miami", "Florida", "FL", 2),
  area("Tampa", "Florida", "FL", 3),
  area("Orlando", "Florida", "FL"),
  area("Tallahassee", "Florida", "FL", 2),
  area("Fort Lauderdale", "Florida", "FL"),
  area("Naples", "Florida", "FL", 2),
  area("Sarasota", "Florida", "FL"),
  area("Melbourne", "Florida", "FL", 3),
  // Georgia
  area("Atlanta", "Georgia", "GA"),
  area("Augusta", "Georgia", "GA", 2),
  area("Savannah", "Georgia", "GA", 3),
  area("Columbus", "Georgia", "GA"),
  area("Macon", "Georgia", "GA", 2),
  area("Athens", "Georgia", "GA"),
  // Hawaii
  area("Honolulu", "Hawaii", "HI"),
  area("Maui", "Hawaii", "HI", 2),
  // Idaho
  area("Boise", "Idaho", "ID"),
  area("Idaho Falls", "Idaho", "ID", 2),
  area("Twin Falls", "Idaho", "ID"),
  // Illinois
  area("Chicago", "Illinois", "IL"),
  area("Springfield", "Illinois", "IL", 2),
  area("Peoria", "Illinois", "IL", 3),
  area("Rockford", "Illinois", "IL"),
  area("Champaign", "Illinois", "IL", 2),
  // Indiana
  area("Indianapolis", "Indiana", "IN"),
  area("Fort Wayne", "Indiana", "IN", 2),
  area("Evansville", "Indiana", "IN", 3),
  area("South Bend", "Indiana", "IN"),
  // Iowa
  area("Des Moines", "Iowa", "IA"),
  area("Cedar Rapids", "Iowa", "IA", 2),
  area("Davenport", "Iowa", "IA", 3),
  area("Iowa City", "Iowa", "IA"),
  // Kansas
  area("Wichita", "Kansas", "KS"),
  area("Kansas City", "Kansas", "KS", 2),
  area("Topeka", "Kansas", "KS", 3),
  // Kentucky
  area("Louisville", "Kentucky", "KY"),
  area("Lexington", "Kentucky", "KY", 2),
  area("Owensboro", "Kentucky", "KY"),
  // Louisiana
  area("New Orleans", "Louisiana", "LA"),
  area("Shreveport", "Louisiana", "LA", 2),
  area("Lafayette", "Louisiana", "LA", 3),
  area("Lake Charles", "Louisiana", "LA"),
  // Maine
  area("Bangor", "Maine", "ME"),
  area("Lewiston", "Maine", "ME", 2),
  // Maryland
  area("Baltimore", "Maryland", "MD"),
  area("Annapolis", "Maryland", "MD", 2),
  area("Hagerstown", "Maryland", "MD"),
  // Massachusetts
  area("Boston", "Massachusetts", "MA"),
  area("Worcester", "Massachusetts", "MA", 2),
  area("Springfield", "Massachusetts", "MA", 3),
  area("Cambridge", "Massachusetts", "MA"),
  // Michigan
  area("Detroit", "Michigan", "MI"),
  area("Grand Rapids", "Michigan", "MI", 2),
  area("Lansing", "Michigan", "MI", 3),
  area("Traverse City", "Michigan", "MI"),
  area("Ann Arbor", "Michigan", "MI", 2),
  area("Flint", "Michigan", "MI"),
  // Minnesota
  area("Minneapolis", "Minnesota", "MN"),
  area("Saint Paul", "Minnesota", "MN", 2),
  area("Rochester", "Minnesota", "MN", 3),
  area("Saint Cloud", "Minnesota", "MN"),
  // Mississippi
  area("Jackson", "Mississippi", "MS"),
  area("Gulfport", "Mississippi", "MS", 2),
  // Missouri
  area("Kansas City", "Missouri", "MO"),
  area("Saint Louis", "Missouri", "MO", 2),
  area("Springfield", "Missouri", "MO", 3),
  area("Columbia", "Missouri", "MO"),
  // Montana
  area("Missoula", "Montana", "MT"),
  area("Billings", "Montana", "MT", 2),
  area("Great Falls", "Montana", "MT"),
  // Nebraska
  area("Omaha", "Nebraska", "NE"),
  area("Lincoln", "Nebraska", "NE", 2),
  area("Grand Island", "Nebraska", "NE"),
  // Nevada
  area("Las Vegas", "Nevada", "NV"),
  area("Reno", "Nevada", "NV", 2),
  area("Henderson", "Nevada", "NV"),
  // New Hampshire
  area("Manchester", "New Hampshire", "NH"),
  area("Nashua", "New Hampshire", "NH", 2),
  area("Concord", "New Hampshire", "NH"),
  // New Jersey
  area("Newark", "New Jersey", "NJ"),
  area("Jersey City", "New Jersey", "NJ", 2),
  area("Atlantic City", "New Jersey", "NJ", 3),
  area("Trenton", "New Jersey", "NJ"),
  // New Mexico
  area("Albuquerque", "New Mexico", "NM"),
  area("Santa Fe", "New Mexico", "NM", 2),
  area("Las Cruces", "New Mexico", "NM", 3),
  area("Rio Rancho", "New Mexico", "NM"),
  // New York
  area("New York City", "New York", "NY"),
  area("Buffalo", "New York", "NY", 2),
  area("Rochester", "New York", "NY", 3),
  area("Syracuse", "New York", "NY"),
  area("Albany", "New York", "NY", 2),
  area("Yonkers", "New York", "NY"),
  area("Binghamton", "New York", "NY", 3),
  // North Dakota
  area("Fargo", "North Dakota", "ND"),
  area("Bismarck", "North Dakota", "ND", 2),
  area("Grand Forks", "North Dakota", "ND"),
  // Ohio (Columbus in Midwest)
  area("Cleveland", "Ohio", "OH"),
  area("Cincinnati", "Ohio", "OH", 2),
  area("Toledo", "Ohio", "OH", 3),
  area("Dayton", "Ohio", "OH"),
  area("Akron", "Ohio", "OH", 2),
  area("Canton", "Ohio", "OH"),
  // Oklahoma
  area("Oklahoma City", "Oklahoma", "OK"),
  area("Tulsa", "Oklahoma", "OK", 2),
  area("Norman", "Oklahoma", "OK", 3),
  // Oregon
  area("Portland", "Oregon", "OR"),
  area("Eugene", "Oregon", "OR", 2),
  area("Salem", "Oregon", "OR", 3),
  area("Medford", "Oregon", "OR"),
  // Pennsylvania
  area("Philadelphia", "Pennsylvania", "PA"),
  area("Pittsburgh", "Pennsylvania", "PA", 2),
  area("Harrisburg", "Pennsylvania", "PA", 3),
  area("Scranton", "Pennsylvania", "PA"),
  area("Allentown", "Pennsylvania", "PA", 2),
  area("Lancaster", "Pennsylvania", "PA"),
  // Rhode Island
  area("Providence", "Rhode Island", "RI"),
  area("Warwick", "Rhode Island", "RI", 2),
  // South Carolina
  area("Charleston", "South Carolina", "SC"),
  area("Columbia", "South Carolina", "SC", 2),
  area("Myrtle Beach", "South Carolina", "SC", 3),
  // South Dakota
  area("Rapid City", "South Dakota", "SD"),
  area("Aberdeen", "South Dakota", "SD", 2),
  // Tennessee
  area("Nashville", "Tennessee", "TN"),
  area("Memphis", "Tennessee", "TN", 2),
  area("Knoxville", "Tennessee", "TN", 3),
  area("Chattanooga", "Tennessee", "TN"),
  area("Johnson City", "Tennessee", "TN", 2),
  // Texas
  area("Houston", "Texas", "TX"),
  area("San Antonio", "Texas", "TX", 2),
  area("Austin", "Texas", "TX", 3),
  area("Dallas", "Texas", "TX"),
  area("Fort Worth", "Texas", "TX", 2),
  area("El Paso", "Texas", "TX", 3),
  area("Lubbock", "Texas", "TX"),
  area("Amarillo", "Texas", "TX", 2),
  area("Corpus Christi", "Texas", "TX", 3),
  area("Laredo", "Texas", "TX"),
  area("McAllen", "Texas", "TX", 2),
  area("Plano", "Texas", "TX"),
  area("Arlington", "Texas", "TX", 2),
  // Utah
  area("Salt Lake City", "Utah", "UT"),
  area("Provo", "Utah", "UT", 2),
  area("Ogden", "Utah", "UT", 3),
  area("Orem", "Utah", "UT"),
  // Vermont
  area("Rutland", "Vermont", "VT"),
  area("Montpelier", "Vermont", "VT", 2),
  // Virginia
  area("Richmond", "Virginia", "VA"),
  area("Virginia Beach", "Virginia", "VA", 2),
  area("Norfolk", "Virginia", "VA", 3),
  area("Chesapeake", "Virginia", "VA"),
  area("Roanoke", "Virginia", "VA", 2),
  area("Lynchburg", "Virginia", "VA"),
  // Washington
  area("Seattle", "Washington", "WA"),
  area("Spokane", "Washington", "WA", 2),
  area("Tacoma", "Washington", "WA", 3),
  area("Vancouver", "Washington", "WA"),
  area("Olympia", "Washington", "WA", 2),
  area("Yakima", "Washington", "WA"),
  // West Virginia
  area("Charleston", "West Virginia", "WV"),
  area("Huntington", "West Virginia", "WV", 2),
  area("Morgantown", "West Virginia", "WV", 3),
  // Wisconsin
  area("Milwaukee", "Wisconsin", "WI"),
  area("Madison", "Wisconsin", "WI", 2),
  area("Green Bay", "Wisconsin", "WI", 3),
  area("Kenosha", "Wisconsin", "WI"),
  area("Racine", "Wisconsin", "WI", 2),
  area("Appleton", "Wisconsin", "WI"),
  // Wyoming
  area("Cheyenne", "Wyoming", "WY"),
  area("Casper", "Wyoming", "WY", 2),
  area("Laramie", "Wyoming", "WY"),
];
