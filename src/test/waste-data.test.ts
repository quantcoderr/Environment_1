import { describe, expect, it } from "vitest";

import { WASTE_ITEMS, type Bin } from "@/lib/waste-data";

const binOf = (name: string): Bin => {
  const item = WASTE_ITEMS.find((i) => i.name === name);
  if (!item) throw new Error(`Missing waste item: ${name}`);
  return item.bin;
};

// The 20 household/office items added in this expansion, with the bin each belongs in.
const NEW_ITEMS: Record<string, Bin> = {
  "Pizza Box": "dry",
  "Tea Bag": "wet",
  "Coffee Grounds": "wet",
  "Paper Egg Carton": "wet",
  "Shampoo Bottle": "dry",
  "Toothpaste Tube": "dry",
  "Human Hair": "wet",
  "Old Shoes": "dry",
  "Glass Bottle": "dry",
  "Plastic Food Container": "dry",
  "Old Notebook": "dry",
  "Sticky Notes": "dry",
  "Ballpoint Pen": "dry",
  "Metal Stapler": "dry",
  "Ink Cartridge": "hazard",
  "Power Bank": "hazard",
  "LED Bulb": "hazard",
  "Wet Wipes": "hazard",
  "Cigarette Butt": "hazard",
  "Thermal Receipt": "hazard",
};

describe("Waste database", () => {
  it("adds the 20 new household and office items in the right bins", () => {
    expect(Object.keys(NEW_ITEMS)).toHaveLength(20);
    for (const [name, bin] of Object.entries(NEW_ITEMS)) {
      expect(binOf(name), `${name} bin`).toBe(bin);
    }
  });

  it("keeps the items the brief named in their correct bins", () => {
    expect(binOf("Pizza Box")).toBe("dry");
    expect(binOf("Glass Jar")).toBe("dry");
    expect(binOf("Old Clothes")).toBe("dry");
    expect(binOf("Light Bulb (CFL)")).toBe("hazard");
    expect(binOf("LED Bulb")).toBe("hazard");
    expect(binOf("Tea Bag")).toBe("wet");
  });

  it("covers the basic segregation chart items in the right bins", () => {
    const CHART_ITEMS: Record<string, Bin> = {
      // Wet waste (green bin)
      "Soiled Tissues": "wet",
      "Paper Towels": "wet",
      "Fish & Meat Scraps": "wet",
      "Fruit Juice Pulp": "wet",
      "Plant Trimmings": "wet",
      // Dry waste (blue bin) sub-segregation
      Rags: "dry",
      "Rubber Items": "dry",
      "Wood Scraps": "dry",
      "Old Furniture": "dry",
      "Metal Scraps": "dry",
      "House Sweepings": "dry",
      "Empty Blister Pack": "dry",
      // Domestic hazardous
      "Tube Light": "hazard",
      "Car Battery": "hazard",
      "Oil Filter": "hazard",
      "Car Care Products": "hazard",
      "Paint Thinner": "hazard",
      "Pesticide Container": "hazard",
      "Used Cooking Oil": "hazard",
    };
    for (const [name, bin] of Object.entries(CHART_ITEMS)) {
      expect(binOf(name), `${name} bin`).toBe(bin);
    }
  });

  it("splits hazardous waste into red (sanitary) and black (domestic hazardous) bins", () => {
    const subOf = (name: string) => {
      const item = WASTE_ITEMS.find((i) => i.name === name);
      if (!item) throw new Error(`Missing waste item: ${name}`);
      return item.sub;
    };
    // Red bin: sanitary waste
    for (const name of ["Diaper", "Sanitary Pad", "Tampons", "Condoms", "Syringe"]) {
      expect(subOf(name), `${name} sub-bin`).toBe("red");
    }
    // Black bin: special care / domestic hazardous
    for (const name of [
      "Paint Can",
      "AA Battery",
      "Light Bulb (CFL)",
      "Thermometer",
      "Expired Medicines",
      "Medicine Strips",
      "Broken Glass",
      "Razor Blades",
      "Tube Light",
      "Car Battery",
    ]) {
      expect(subOf(name), `${name} sub-bin`).toBe("black");
    }
    // Every hazardous item must carry a red/black sub-classification
    expect(WASTE_ITEMS.filter((i) => i.bin === "hazard").every((i) => i.sub === "red" || i.sub === "black")).toBe(true);
  });

  it("gives every item a disposal tip and no duplicate name", () => {
    expect(WASTE_ITEMS.every((i) => i.tip.trim().length > 20)).toBe(true);
    expect(new Set(WASTE_ITEMS.map((i) => i.name)).size).toBe(WASTE_ITEMS.length);
  });
});
