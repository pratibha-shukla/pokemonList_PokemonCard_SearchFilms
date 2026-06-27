import React from "react";
import { useQuery } from "@tanstack/react-query";
import { List } from "react-window"; // v2 API: just "List"
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

// 1. Standard structural asset data retrieval framework
const fetchMassiveProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products?limit=100`);
  return res.data.products;
};

// 2. Row component (v2 naming: rowComponent, receives rowProps spread in)
const ProductRow = ({ index, style, products }) => {
  const product = products[index];
  return (
    <div style={style}>
      {product ? `${product.title} - $${product.price}` : "Loading row..."}
    </div>
  );
};

export default function VirtualProductList() {
  // 3. React Query handles the background network fetching pipeline
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["massiveProducts"],
    queryFn: fetchMassiveProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ 
   whiteSpace: "nowrap",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px", 
  overflow: "hidden", 
  width: "360px",
  margin: "24px auto", // <-- Centering trick: 24px top/bottom space, auto calculates equal left/right space
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" // Optional: adds a clean subtle shadow
}}> 
      {/* 4. v2 List: rowComponent + rowCount + rowHeight + rowProps */}
      <List
        rowComponent={ProductRow}
        rowCount={products.length}
        rowHeight={35}
        rowProps={{ products }}
        style={{ height: 400, width: 350 }}
      />
    </div>
  );
}
