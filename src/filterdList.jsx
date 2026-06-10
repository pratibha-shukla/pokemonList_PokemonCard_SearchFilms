
import { useEffect, useState } from "react";
import { fetchProducts } from "./APIs";

// Pure function: Extracts unique categories using a Set structure efficiently
const extractUniqueCatFromProducts = (products) => {
  return Array.from(new Set(products.map((item) => item.category)));
};

const FilteredList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [curCategory, setCurCategory] = useState("all");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        // Safe check: Fallback to an empty array if data or data.products is undefined
        const productList = data?.products || [];
        
        setProducts(productList);
        setCategories([
          "all", 
          ...extractUniqueCatFromProducts(productList)
        ]);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  // Compute the filtered list clearly outside the JSX render layout
  const filteredProducts = products.filter((item) => {
    if (curCategory === "all") return true;
    return item.category === curCategory;
  });

  return (
    <div>
      {/* Category Selector Dropdown */}
      <div>
        <select value={curCategory} onChange={(e) => setCurCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Rendered Products Output */}
      <div>
        {filteredProducts.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default FilteredList;
