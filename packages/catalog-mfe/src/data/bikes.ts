export type BikeCategory = "Road" | "Mountain" | "Gravel" | "Track";

export interface Bike {
  id: string;
  name: string;
  category: BikeCategory;
  price: number;
  description: string;
  specs: {
    frame: string;
    groupset: string;
    wheelSize: string;
    weight: string;
  };
  badge?: "New" | "Best Seller" | "Limited";
}

export const bikes: Bike[] = [
  {
    id: "vf-aero-sl",
    name: "Aero SL",
    category: "Road",
    price: 6499,
    description:
      "Our flagship race machine. Wind-tunnel tested aero tube shapes paired with featherlight carbon lay-up.",
    specs: {
      frame: "VeloForge UD Carbon Monocoque",
      groupset: "Shimano Dura-Ace Di2 12sp",
      wheelSize: "700c",
      weight: "6.8 kg",
    },
    badge: "Best Seller",
  },
  {
    id: "vf-endure-pro",
    name: "Endure Pro",
    category: "Road",
    price: 4299,
    description:
      "All-day comfort without sacrificing speed. Engineered for long breakaways and sportive events.",
    specs: {
      frame: "VeloForge T700 Carbon",
      groupset: "Shimano Ultegra Di2 12sp",
      wheelSize: "700c",
      weight: "7.6 kg",
    },
  },
  {
    id: "vf-gravel-x",
    name: "Gravel X",
    category: "Gravel",
    price: 3799,
    description:
      "Where tarmac ends the adventure begins. Clearance for 45mm tyres, titanium bolts throughout.",
    specs: {
      frame: "VeloForge T800 Carbon Gravel",
      groupset: "SRAM Force XPLR 12sp",
      wheelSize: "700c / 650b",
      weight: "8.2 kg",
    },
    badge: "New",
  },
  {
    id: "vf-trail-275",
    name: "Trail 275",
    category: "Mountain",
    price: 5199,
    description:
      "Aggressive trail geometry, 130mm travel fork. Ready for anything the mountain throws at you.",
    specs: {
      frame: "VeloForge Full-Sus Carbon MTB",
      groupset: "Shimano XT 12sp",
      wheelSize: '27.5"',
      weight: "11.4 kg",
    },
  },
  {
    id: "vf-xc-rocket",
    name: "XC Rocket",
    category: "Mountain",
    price: 4899,
    description:
      "Cross-country race weapon. 100mm travel, stiff as a road bike, lighter than your excuses.",
    specs: {
      frame: "VeloForge HM Carbon XC",
      groupset: "Shimano XTR 12sp",
      wheelSize: '29"',
      weight: "8.9 kg",
    },
    badge: "New",
  },
  {
    id: "vf-pista-evo",
    name: "Pista Evo",
    category: "Track",
    price: 3299,
    description:
      "Fixed. Fast. Fearless. Regulation-compliant track frame with stiff bottom bracket shell.",
    specs: {
      frame: "VeloForge Track Carbon",
      groupset: "Sugino 75 / Dura-Ace Track",
      wheelSize: "700c",
      weight: "6.2 kg",
    },
    badge: "Limited",
  },
];

export const categories: BikeCategory[] = [
  "Road",
  "Mountain",
  "Gravel",
  "Track",
];
