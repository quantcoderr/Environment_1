export type Bin = "dry" | "wet" | "hazard";

// 2026 household rules split rejection/hazardous waste into two bins:
// red = sanitary waste, black = special care / domestic hazardous waste.
export type HazardSub = "red" | "black";

export interface WasteItem {
  name: string;
  emoji: string;
  bin: Bin;
  sub?: HazardSub;
  tip: string;
}

export const BIN_INFO: Record<Bin, { label: string; short: string }> = {
  dry: { label: "Dry Waste", short: "Dry" },
  wet: { label: "Wet Waste", short: "Wet" },
  hazard: { label: "Rejection / Hazardous", short: "Hazardous" },
};

export const HAZARD_SUB_INFO: Record<HazardSub, { label: string; short: string; rule: string }> = {
  red: {
    label: "Red Bin — Sanitary Waste",
    short: "Red Bin",
    rule: "Wrap securely (preferably in newspaper) before handing over.",
  },
  black: {
    label: "Black Bin — Domestic Hazardous",
    short: "Black Bin",
    rule: "Hand over strictly to authorised collection agencies or designated drop-off centres.",
  },
};

export const WASTE_ITEMS: WasteItem[] = [
  { name: "Plastic Bottle", emoji: "🧴", bin: "dry", tip: "Rinse, crush and cap it. Clean PET plastic is highly recyclable." },
  { name: "Cardboard Box", emoji: "📦", bin: "dry", tip: "Flatten and keep dry. Remove tape and food-soiled parts." },
  { name: "Old Newspaper", emoji: "📰", bin: "dry", tip: "Bundle and keep dry — paper fibres can be recycled 5–7 times." },
  { name: "Glass Jar", emoji: "🫙", bin: "dry", tip: "Rinse out food residue. Wrap if broken to protect handlers." },
  { name: "Aluminium Can", emoji: "🥫", bin: "dry", tip: "Rinse and crush. Aluminium recycles endlessly without quality loss." },
  { name: "Milk Carton", emoji: "🥛", bin: "dry", tip: "Rinse and flatten. Tetra packs go to dry waste for special recycling." },
  { name: "Plastic Bag", emoji: "🛍️", bin: "dry", tip: "Keep clean and dry; bundle several bags together." },
  { name: "Steel Utensil", emoji: "🥄", bin: "dry", tip: "Metal scrap is valuable — give it to a scrap dealer if possible." },
  { name: "Magazine", emoji: "📖", bin: "dry", tip: "Glossy paper is still recyclable. Keep away from moisture." },
  { name: "Old Clothes", emoji: "👕", bin: "dry", tip: "Donate wearable clothes; worn-out fabric goes in dry waste." },
  { name: "Thermocol", emoji: "🧊", bin: "dry", tip: "Keep clean and dry; break into pieces for collection." },
  { name: "Paper Cup", emoji: "🥤", bin: "dry", tip: "Empty and dry it. Plastic-lined cups need special recycling." },
  { name: "Banana Peel", emoji: "🍌", bin: "wet", tip: "Perfect for composting — rich in potassium for plants." },
  { name: "Vegetable Scraps", emoji: "🥕", bin: "wet", tip: "Compost at home or put in the wet bin. No plastic bags!" },
  { name: "Leftover Food", emoji: "🍛", bin: "wet", tip: "Drain liquids first. Food waste becomes compost or biogas." },
  { name: "Eggshells", emoji: "🥚", bin: "wet", tip: "Crush them — they add calcium to compost." },
  { name: "Tea Leaves", emoji: "🍵", bin: "wet", tip: "Used tea leaves and coffee grounds compost beautifully." },
  { name: "Fruit Peel", emoji: "🍊", bin: "wet", tip: "All fruit peels are organic and go in the wet bin." },
  { name: "Garden Leaves", emoji: "🍂", bin: "wet", tip: "Dry leaves balance compost moisture. Never burn them." },
  { name: "Flowers", emoji: "💐", bin: "wet", tip: "Remove ribbons and wrappers, then compost the flowers." },
  { name: "Bones", emoji: "🦴", bin: "wet", tip: "Meat and fish bones go to wet waste; they decompose slowly." },
  { name: "Coconut Shell", emoji: "🥥", bin: "wet", tip: "Organic, but break it up so it composts faster." },
  { name: "Bread", emoji: "🍞", bin: "wet", tip: "Stale bread is organic waste — or feed it to compost." },
  { name: "AA Battery", emoji: "🔋", bin: "hazard", sub: "black", tip: "Contains toxic metals. Drop at a battery collection point." },
  { name: "Mobile Phone", emoji: "📱", bin: "hazard", sub: "black", tip: "E-waste! Give to an authorised e-waste recycler." },
  { name: "Light Bulb (CFL)", emoji: "💡", bin: "hazard", sub: "black", tip: "CFLs contain mercury. Wrap and hand to hazardous collection." },
  { name: "Medicine Strips", emoji: "💊", bin: "hazard", sub: "black", tip: "Expired medicines go to pharmacies' take-back programmes." },
  { name: "Syringe", emoji: "💉", bin: "hazard", sub: "red", tip: "Sanitary/medical waste — wrap securely in newspaper and seal in a rigid container before handing over." },
  { name: "Sanitary Pad", emoji: "🩹", bin: "hazard", sub: "red", tip: "Wrap in newspaper, mark with a red dot, and use the red bin." },
  { name: "Diaper", emoji: "🧷", bin: "hazard", sub: "red", tip: "Wrap securely in newspaper; sanitary waste goes in the red bin." },
  { name: "Paint Can", emoji: "🎨", bin: "hazard", sub: "black", tip: "Chemical residue — never pour down drains. Hazardous collection." },
  { name: "Charger Cable", emoji: "🔌", bin: "hazard", sub: "black", tip: "Cables are e-waste. Bundle with other electronics for recycling." },
  { name: "Thermometer", emoji: "🌡️", bin: "hazard", sub: "black", tip: "Mercury thermometers are hazardous. Never break or bin them." },
  { name: "Insecticide Spray", emoji: "🧪", bin: "hazard", sub: "black", tip: "Pressurised chemical can — hazardous waste only." },

  // Kitchen & pantry
  { name: "Pizza Box", emoji: "🍕", bin: "dry", tip: "Only the clean lid is recyclable — tear off the grease-soaked base for the reject bin." },
  { name: "Tea Bag", emoji: "🫖", bin: "wet", tip: "Empty the leaves into compost — many bags hold plastic mesh, so check the label." },
  { name: "Coffee Grounds", emoji: "☕", bin: "wet", tip: "Drain first. Grounds feed compost and worms, and keep the pile sweet." },
  { name: "Paper Egg Carton", emoji: "🍳", bin: "wet", tip: "Tear it up and compost — paper cartons break down fast. Plastic ones go to dry waste." },

  // Bathroom & laundry
  { name: "Shampoo Bottle", emoji: "🫧", bin: "dry", tip: "Empty, rinse and crush. Twist the pump head off — it is mixed plastic." },
  { name: "Toothpaste Tube", emoji: "🪥", bin: "dry", tip: "Squeeze it flat and re-cap it. Multi-layer tubes need a brand take-back scheme." },
  { name: "Human Hair", emoji: "💇", bin: "wet", tip: "Hair composts and adds nitrogen — bundle it into a ball or scatter it on the pile." },
  { name: "Old Shoes", emoji: "👟", bin: "dry", tip: "Donate wearable pairs; worn-out shoes go to dry waste for rubber and textile recovery." },

  // Glass & packaging
  { name: "Glass Bottle", emoji: "🍾", bin: "dry", tip: "Rinse and remove the cap — glass can be melted down endlessly." },
  { name: "Plastic Food Container", emoji: "🥡", bin: "dry", tip: "Rinse off food and keep the lid on. Oily containers stay dry — never wet waste." },

  // Office & desk
  { name: "Old Notebook", emoji: "📓", bin: "dry", tip: "Remove the spiral binding and plastic cover — the paper pages are recyclable." },
  { name: "Sticky Notes", emoji: "🗒️", bin: "dry", tip: "Reuse the pad first; the adhesive weakens recycled paper, so bin it as paper." },
  { name: "Ballpoint Pen", emoji: "🖊️", bin: "dry", tip: "Mixed plastic — collect pens for a take-back drive instead of the daily bin." },
  { name: "Metal Stapler", emoji: "📎", bin: "dry", tip: "Valuable metal scrap — hand it to a scrap dealer or the dry bin." },
  { name: "Ink Cartridge", emoji: "🖨️", bin: "hazard", sub: "black", tip: "Never bin ink — refill it or return it to the manufacturer's take-back scheme." },

  // Electronics & batteries
  { name: "Power Bank", emoji: "🪫", bin: "hazard", sub: "black", tip: "Lithium cells can catch fire. Never crush or bin them — use an e-waste drop-off." },
  { name: "LED Bulb", emoji: "💡", bin: "hazard", sub: "black", tip: "LEDs are e-waste, not glass recycling. Take them to an e-waste collection point." },

  // Reject / hazardous extras
  { name: "Wet Wipes", emoji: "🧻", bin: "hazard", sub: "black", tip: "Wipes never break down and clog drains — wrap them and use the reject bin." },
  { name: "Cigarette Butt", emoji: "🚬", bin: "hazard", sub: "black", tip: "The filter is plastic and holds toxins — never litter it; use the reject bin." },
  { name: "Thermal Receipt", emoji: "🧾", bin: "hazard", sub: "black", tip: "The glossy coating is chemical-laden — receipts can't be recycled. Reject bin." },

  // Basic segregation chart — wet waste (green bin)
  { name: "Soiled Tissues", emoji: "🤧", bin: "wet", tip: "Used tissues and napkins are organic — they go in the green wet bin, not with paper recycling." },
  { name: "Paper Towels", emoji: "🧻", bin: "wet", tip: "Food-soiled paper towels can't be recycled — compost them or use the wet bin." },
  { name: "Fish & Meat Scraps", emoji: "🐟", bin: "wet", tip: "All cooked and uncooked food, including fish and meat, goes in the wet bin." },
  { name: "Fruit Juice Pulp", emoji: "🧃", bin: "wet", tip: "Leftover pulp and juice waste is organic — add it to compost or the wet bin." },
  { name: "Plant Trimmings", emoji: "🪴", bin: "wet", tip: "Household garden and plant waste belongs in the green bin — never burn it." },

  // Basic segregation chart — dry waste (blue bin) sub-segregation
  { name: "Rags", emoji: "🧣", bin: "dry", tip: "Clean, dry rags and cloth scraps go in the blue bin for textile recovery." },
  { name: "Rubber Items", emoji: "🩴", bin: "dry", tip: "Old rubber chappals, mats and tubes are dry waste — keep them clean and dry." },
  { name: "Wood Scraps", emoji: "🪵", bin: "dry", tip: "Untreated wood pieces go in dry waste; painted or chemically treated wood needs special disposal." },
  { name: "Old Furniture", emoji: "🪑", bin: "dry", tip: "Discarded furniture is dry waste — arrange a bulk pickup or donate if usable." },
  { name: "Metal Scraps", emoji: "⚙️", bin: "dry", tip: "All metal offcuts are valuable scrap — sell to a scrap dealer or use the blue bin." },
  { name: "House Sweepings", emoji: "🧹", bin: "dry", tip: "Dust and sweepings from inside the house are inerts — bag them for the dry bin. Garden and street sweepings don't belong here." },
  { name: "Empty Blister Pack", emoji: "💊", bin: "dry", tip: "Empty foil-plastic blisters are compound packaging — dry waste. Strips with medicine left go to hazardous." },

  // Basic segregation chart — domestic hazardous
  { name: "Tube Light", emoji: "💡", bin: "hazard", sub: "black", tip: "Tube lights contain mercury vapour — never break them; hand over at a hazardous collection point." },
  { name: "Car Battery", emoji: "🔋", bin: "hazard", sub: "black", tip: "Car batteries hold acid and lead — return them to the dealer or an authorised recycler." },
  { name: "Oil Filter", emoji: "🛢️", bin: "hazard", sub: "black", tip: "Used oil filters carry toxic residue — drain and give them to a garage or hazardous collection." },
  { name: "Car Care Products", emoji: "🚗", bin: "hazard", sub: "black", tip: "Polishes, coolants and car consumables are chemical waste — never pour them down drains." },
  { name: "Paint Thinner", emoji: "🖌️", bin: "hazard", sub: "black", tip: "Solvents and thinners are flammable chemicals — seal tightly and use hazardous disposal." },
  { name: "Pesticide Container", emoji: "🐛", bin: "hazard", sub: "black", tip: "Empty pesticide tins and bottles still hold toxic residue — hazardous collection only." },
  { name: "Used Cooking Oil", emoji: "🍳", bin: "hazard", sub: "black", tip: "Never pour oil down the drain — cool it, seal it in a bottle and hand it to a collection drive." },

  // 2026 rules — red bin (sanitary) and black bin (special care) additions
  { name: "Tampons", emoji: "🩸", bin: "hazard", sub: "red", tip: "Wrap securely in newspaper before handing over — sanitary waste goes in the red bin." },
  { name: "Condoms", emoji: "🎈", bin: "hazard", sub: "red", tip: "Wrap in newspaper and dispose with sanitary waste in the red bin — never flush." },
  { name: "Broken Glass", emoji: "🥂", bin: "hazard", sub: "black", tip: "Sharp objects are special-care waste — wrap thickly in newspaper, label it, and hand to authorised collection." },
  { name: "Razor Blades", emoji: "🪒", bin: "hazard", sub: "black", tip: "Sharp metal — wrap securely and tape it before handing to a designated drop-off centre." },
  { name: "Expired Medicines", emoji: "💊", bin: "hazard", sub: "black", tip: "Black bin waste — return to a pharmacy take-back programme or authorised collection agency." },
];

export const SAMPLE_PILLS = ["Plastic Bottle", "Banana Peel", "AA Battery", "Cardboard Box", "Old Newspaper"];

export const TIERS = [
  { name: "Eco Beginner", min: 0 },
  { name: "Green Pioneer", min: 60 },
  { name: "Upcoming Reformer", min: 160 },
];

export function badgeFor(points: number) {
  if (points >= 160) return "Upcoming Reformer";
  if (points >= 60) return "Green Pioneer";
  return "Eco Beginner";
}

export function nextTier(points: number) {
  return TIERS.find((t) => t.min > points) ?? null;
}
