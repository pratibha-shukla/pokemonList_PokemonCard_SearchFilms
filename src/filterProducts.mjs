// New user browsing history using descriptive, non-sequential IDs
const recentItems = [
  { productId: "id_oled_99", category: "Gaming" },
  { productId: "id_mech_key", category: "Gaming" },
  { productId: "id_hoodie_2", category: "Apparel" },
  { productId: "id_air_fryer", category: "Appliances" },
  { productId: "id_espresso", category: "Appliances" },
  { productId: "id_protein_shk", category: "Wellness" },
];

// New comprehensive catalog with unique IDs and distinct names
const catalog = [
  { id: "id_oled_99", name: "4K OLED Gaming Monitor", category: "Gaming", price: 799 },
  { id: "id_rtx_gpu", name: "NVIDIA RTX Graphics Card", category: "Gaming", price: 1199 },
  { id: "id_mech_key", name: "Mechanical Gaming Keyboard", category: "Gaming", price: 149 },
  { id: "id_wire_mice", name: "Wireless Ergonomic Mouse", category: "Gaming", price: 89 },
  { id: "id_vr_head", name: "Virtual Reality Headset", category: "Gaming", price: 499 },
  { id: "id_cargo_pnt", name: "Waterproof Cargo Pants", category: "Apparel", price: 65 },
  { id: "id_hoodie_2", name: "Oversized Fleece Hoodie", category: "Apparel", price: 55 },
  { id: "id_run_shoe", name: "Carbon Fiber Running Shoes", category: "Apparel", price: 140 },
  { id: "id_sun_glass", name: "Polarized Sports Sunglasses", category: "Apparel", price: 75 },
  { id: "id_air_fryer", name: "Digital Air Fryer XL", category: "Appliances", price: 120 },
  { id: "id_espresso", name: "Automated Espresso Machine", category: "Appliances", price: 599 },
  { id: "id_slow_cook", name: "Smart Programmable Slow Cooker", category: "Appliances", price: 85 },
  { id: "id_protein_shk", name: "Whey Protein Shaker Bottle", category: "Wellness", price: 25 },
  { id: "id_yoga_blk", name: "High-Density Cork Yoga Block", category: "Wellness", price: 18 },
  { id: "id_stand_dsk", name: "Motorized Standing Desk", category: "Office Furniture", price: 399 },
];

/**
 * Generates item recommendations based on past user interactions.
 * 
 * @param {Array} history - Array of items the user viewed recently
 * @param {number} totalLimit - Maximum number of recommendations to return
 * @param {Array} itemCatalog - Complete list of all items on sale
 */
const fetchSmartRecommendations = (history, totalLimit, itemCatalog) => {
  const categoryFrequency = {};
  const excludedIdsSet = new Set();

  // 1. Calculate how frequently categories appear in history
  for (const item of history) {
    categoryFrequency[item.category] = (categoryFrequency[item.category] || 0) + 1;
    excludedIdsSet.add(item.productId);
  }

  return itemCatalog
    // 2. Filter out products the user has already viewed
    .filter((product) => !excludedIdsSet.has(product.id))
    // 3. Sort by priority
    .sort((itemA, itemB) => {
      const weightA = categoryFrequency[itemA.category] || 0;
      const weightB = categoryFrequency[itemB.category] || 0;

      // If category ranks match, sort alphabetically by product name for stable UX
      if (weightA === weightB) {
        return itemA.name.localeCompare(itemB.name);
      }
      
      // Sort in descending order (highest category views first)
      return weightB - weightA;
    })
    // 4. Return the specific slice count requested
    .slice(0, totalLimit);
};

// Execute and view results in your console terminal
console.log(fetchSmartRecommendations(recentItems, 5, catalog));
