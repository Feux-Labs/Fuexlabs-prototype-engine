export type SectionItem = {
  title: string;
  desc: string;
};

export type BusinessTypeConfig = {
  key: string;
  label: string;
  /** Real photo for this business type, reused (with different crops) across hero + section cards. Null means no good real photo was found — the page falls back to a clean color tile instead. */
  heroImage: string | null;
  taglineTemplate: (city: string) => string;
  aboutTemplate: (name: string) => string;
  sectionTitle: string;
  sectionItems: SectionItem[];
};

// Generic "What We Offer" defaults, shared across every business type so this
// section stays reusable when the tool is pointed at a new kind of business.
export const GENERIC_OFFERINGS: SectionItem[] = [
  { title: "Quality You Can Trust", desc: "Consistent, dependable standards behind everything we do." },
  { title: "Experienced Team", desc: "A dedicated team committed to getting it right for you." },
  { title: "Trusted & Reliable", desc: "Built on relationships that keep people coming back." },
];

export const BUSINESS_TYPES: BusinessTypeConfig[] = [
  {
    key: "school",
    label: "School / Educational Institution",
    heroImage: "/images/business/school.jpg",
    taglineTemplate: (city) => `Nurturing young minds in ${city}.`,
    aboutTemplate: (name) =>
      `${name} is committed to providing quality education and a supportive learning environment for every student.`,
    sectionTitle: "Programs Offered",
    sectionItems: [
      { title: "Structured Curriculum", desc: "Academic programs designed around each student's growth." },
      { title: "Experienced Staff", desc: "Qualified teachers dedicated to nurturing every learner." },
      { title: "Extracurriculars", desc: "Sports, clubs and activities that build well-rounded students." },
    ],
  },
  {
    key: "restaurant",
    label: "Restaurant / Cafe",
    heroImage: "/images/business/restaurant.jpg",
    taglineTemplate: (city) => `Fresh flavors, made with love in ${city}.`,
    aboutTemplate: (name) =>
      `${name} serves great food in a warm atmosphere, using quality ingredients in every dish we make.`,
    sectionTitle: "Menu Highlights",
    sectionItems: [
      { title: "Signature Dishes", desc: "Crowd favorites made fresh, every single time." },
      { title: "Great Drinks", desc: "A drinks menu that pairs perfectly with your meal." },
      { title: "Dine-in & Delivery", desc: "Enjoy it at our tables or order straight to your door." },
    ],
  },
  {
    key: "clinic",
    label: "Clinic / Hospital",
    heroImage: null,
    taglineTemplate: (city) => `Compassionate care you can rely on in ${city}.`,
    aboutTemplate: (name) =>
      `${name} provides professional healthcare services with a patient-first approach to every visit.`,
    sectionTitle: "Our Services",
    sectionItems: [
      { title: "General Consultations", desc: "Thorough checkups from qualified medical professionals." },
      { title: "Modern Facilities", desc: "Clean, well-equipped spaces for your care and comfort." },
      { title: "Fast Appointments", desc: "Minimal wait times, with emergency slots available." },
    ],
  },
  {
    key: "store",
    label: "Retail Store",
    heroImage: "/images/business/store.jpg",
    taglineTemplate: (city) => `Everything you need, right here in ${city}.`,
    aboutTemplate: (name) =>
      `${name} offers a curated selection of quality products at prices that make sense.`,
    sectionTitle: "Featured Products",
    sectionItems: [
      { title: "Wide Selection", desc: "A range of products picked for quality and value." },
      { title: "Fair Prices", desc: "Great products that don't break the bank." },
      { title: "Fast Restocking", desc: "New arrivals and restocks so you always find what you need." },
    ],
  },
  {
    key: "salon",
    label: "Salon / Spa",
    heroImage: null,
    taglineTemplate: (city) => `Look good, feel good — ${city}'s go-to spot.`,
    aboutTemplate: (name) =>
      `${name} offers professional beauty and grooming services in a relaxing, welcoming space.`,
    sectionTitle: "Our Services",
    sectionItems: [
      { title: "Hair & Styling", desc: "Cuts, color and styling from skilled professionals." },
      { title: "Nails & Beauty", desc: "Manicures, pedicures and beauty treatments done right." },
      { title: "Relaxing Space", desc: "A calm, comfortable environment to unwind in." },
    ],
  },
  {
    key: "hotel",
    label: "Hotel / Hospitality",
    heroImage: "/images/business/hotel.jpg",
    taglineTemplate: (city) => `Comfort and hospitality in the heart of ${city}.`,
    aboutTemplate: (name) =>
      `${name} offers comfortable stays and attentive service for every guest, every time.`,
    sectionTitle: "Rooms & Amenities",
    sectionItems: [
      { title: "Comfortable Rooms", desc: "Well-appointed rooms designed for a restful stay." },
      { title: "On-site Dining", desc: "Great food available without leaving the building." },
      { title: "Free Wi-Fi & Amenities", desc: "Everything you need to stay comfortable and connected." },
    ],
  },
  {
    key: "church",
    label: "Church / Religious Organization",
    heroImage: "/images/business/church.jpg",
    taglineTemplate: (city) => `A place to belong, right here in ${city}.`,
    aboutTemplate: (name) =>
      `${name} is a welcoming community dedicated to faith, fellowship and service to others.`,
    sectionTitle: "Ministries & Services",
    sectionItems: [
      { title: "Sunday Services", desc: "Join us for worship, teaching and fellowship." },
      { title: "Community Outreach", desc: "Programs that serve and uplift our local community." },
      { title: "Ministries for All Ages", desc: "Groups and activities for children, youth and adults." },
    ],
  },
  {
    key: "law",
    label: "Law Firm / Professional Services",
    heroImage: "/images/business/law.jpg",
    taglineTemplate: (city) => `Trusted legal counsel based in ${city}.`,
    aboutTemplate: (name) =>
      `${name} provides professional, results-driven legal services tailored to each client's needs.`,
    sectionTitle: "Practice Areas",
    sectionItems: [
      { title: "Corporate Law", desc: "Guidance for businesses at every stage of growth." },
      { title: "Property & Real Estate", desc: "Sound legal support for property transactions." },
      { title: "Litigation & Advisory", desc: "Experienced representation when it matters most." },
    ],
  },
  {
    key: "realestate",
    label: "Real Estate Agency",
    heroImage: "/images/business/realestate.jpg",
    taglineTemplate: (city) => `Finding your next home in ${city}.`,
    aboutTemplate: (name) =>
      `${name} helps clients buy, sell and rent property with clear guidance from start to finish.`,
    sectionTitle: "Featured Listings",
    sectionItems: [
      { title: "Homes for Sale", desc: "A range of properties to fit every budget and need." },
      { title: "Rentals", desc: "Verified rental listings across the city." },
      { title: "Property Advisory", desc: "Expert guidance to help you make the right call." },
    ],
  },
  {
    key: "generic",
    label: "Other / General Business",
    heroImage: "/images/business/generic.jpg",
    taglineTemplate: (city) => `Proudly serving ${city} and beyond.`,
    aboutTemplate: (name) =>
      `${name} is committed to delivering great service and real value to every customer.`,
    sectionTitle: "What We Do",
    sectionItems: [
      { title: "Reliable Service", desc: "Consistent results you can count on, every time." },
      { title: "Straightforward Approach", desc: "No jargon — just clear, honest work." },
      { title: "Always Reachable", desc: "Easy to reach when you need us." },
    ],
  },
];

export function getBusinessType(key: string): BusinessTypeConfig {
  return BUSINESS_TYPES.find((b) => b.key === key) ?? BUSINESS_TYPES[BUSINESS_TYPES.length - 1];
}
