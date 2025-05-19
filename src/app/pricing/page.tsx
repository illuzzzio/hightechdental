import React from "react";

const pricingItems = [
  {
    category: "Consultation",
    items: [{ name: "Valid for 10 days", price: 200 }],
  },
  {
    category: "Scans",
    items: [
      { name: "IOPA x-ray (RVG, Digital)", price: 150 },
      { name: "OPG (Panoramic Scan of Jaws)", price: 1000 },
    ],
  },
  {
    category: "Extraction / Tooth",
    items: [
      { name: "Simple", price: 500 },
      { name: "Pedo", price: 300 },
      { name: "R.C Treated", price: 1000 },
      { name: "Wisdom Tooth", price: 1000 },
      { name: "Impacted Tooth (Surgical Removal)", price: 4000 },
    ],
  },
  {
    category: "Sutures",
    items: [
      { name: "Silk", price: 500 },
      { name: "Resorbable", price: 1000 },
    ],
  },
  {
    category: "Fillings",
    items: [
      { name: "Temporary", price: 300 },
      { name: "GIC", price: 800 },
      { name: "Light Cure Composite", price: 1200 },
    ],
  },
  {
    category: "Scaling & Polishing",
    items: [{ name: "", price: 1500 }],
  },
  {
    category: "Root Canal Treatment (RCT)",
    items: [
      { name: "Single Visit", price: 4000 },
      { name: "Multiple Visit", price: 3500 },
    ],
  },
  {
    category: "Post & Core",
    items: [{ name: "", price: 1500 }],
  },
  {
    category: "Crown & Bridge",
    items: [
      
      { name: "PFM (Porcelain fused to metal)", price: 3500 },
      { name: "DMLS Crown", price: 4500 },
      { name: "All Ceramic", price: 5000 },
      { name: "Zirconium", price: 7500 },
      { name: "Zirconium Monolithic", price: 9500 },
    ],
  },
  {
    category: "Implants",
    items: [
      { name: "Conventional (Delayed Loading)", price: 25000 },
      { name: "Immediate Loading Implants", price: 30000 },
      { name: "Pterigoid Implant", price: 35000 },
      { name: "Zygomatic Implant", price: 45000 },
    ],
  },
  {
    category: "Bone Grafting",
    items: [{ name: "", price: 9000 }],
  },
  {
    category: "Orthodontics (Braces)",
    items: [
      { name: "Single Arch", price: 18000 },
      { name: "Both Arch", price: 30000 },
      { name: "Retainers/Arch", price: 2500 },
    ],
  },
  {
    category: "Partial Dentures",
    items: [
      { name: "Acrylic (Hard)", price: "1000 + Plate + 500/- each tooth" },
      { name: "Flexi Ble", price: "3000 + Plate + 500/- each tooth" },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 animate-fade-in-down">
        Pricing for Dental Procedures
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {pricingItems.map((section, idx) => (
          <div
            key={idx}
            className="bg-green-950 p-5 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-green-500/30 animate-fade-in-up"
          >
            <h2 className="text-2xl font-semibold border-b border-green-700 pb-2 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex justify-between items-center bg-green-800/20 hover:bg-green-700/40 transition rounded-lg px-4 py-2"
                >
                  <span>{item.name || section.category}</span>
                  <span className="font-medium">₹ {item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
