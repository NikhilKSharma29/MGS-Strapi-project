const productsData = {
  badge: "What We Manufacture",
  heading: "Comprehensive Range of Wire & Steel Products",
  description:
    "Our products are designed to meet diverse industrial and commercial needs, ensuring strength, reliability, and long-lasting performance.",

  items: [
    {
      id: 1,
      title: "Mild Steel Wire (HB / HHB / Annealed)",
      image: "/products/Rectangle 17.png",
      specs: "0.7mm – 11mm, SAE 1008/1010, Cold Drawn",
      bundle: "25kg – 200kg",
      packing: "Custom orders",
      application: "Construction binding, industrial use, nails",
    },
    {
      id: 2,
      title: "Galvanized Iron Wire",
      image: "/products/Rectangle 17a.png",
      specs: "0.20mm – 4.0mm, 8g – 14g",
      bundle: "50kg – 100kg",
      coating: "40-200 GSM",
      application: "Fencing, gabions, industrial mesh, binding",
    },
    {
      id: 3,
      title: "Galvanized Iron Chain Link Fence",
      image: "/products/Rectangle 17d.png",
      specs: "2.5mm – 4.0mm, 8g – 13g",
      bundle: "25ft – 100ft (7.5m – 31m)",
      height: "4ft – 10ft",
      application: "Boundary fencing, security enclosures",
    },
    {
      id: 4,
      title: "Galvanized Iron Barbed Wire",
      image: "/products/Rectangle 17s.png",
      specs: "2mm – 3mm, 12g – 14g",
      length: "200m – 300m (750ft – 950ft)",
      bundle: "25kg – 35kg",
      application: "Agricultural fencing, property boundaries",
    },
    {
      id: 5,
      title: "Mild Steel Binding Wire",
      image: "/products/Rectangle 17x.png",
      specs: "0.7mm – 1.2mm, 18g / 20g / 22g",
      coils: "25kg bundles or random coils",
      application: "Tying rebars in construction, scaffolding, packaging",
    },
    {
      id: 6,
      title: "Mild Steel Wire (HB / HHB / Annealed)",
      image: "/products/Rectangle 17c.png",
      specs: "8g – 20g",
      capacity: "Above 100 MT",
      length: "½ inch – 4 inch",
      packing: "50kg bags / 2.5kg packets",
      application: "Carpentry, furniture making, packaging",
    },
  ],

  catalogButton: {
    label: "Download Product Catalog",
    link: "/catalog.pdf", // You can later connect this to Strapi
  },
};

export default productsData;
