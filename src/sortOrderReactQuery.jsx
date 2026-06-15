// Homework: build useQuery(options)
// Options: queryKey, queryFn, staleTime (default 0) Returns: { data, isLoading, isError, error }.
// Submit your work in the same spreadsheet above

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const SIZE = 10;
const BASE_URL = "https://dummyjson.com";

// Fetcher function defined outside the component
const fetchProducts = async (page, isAsc) => {
  const skip = (page - 1) * SIZE;
  const order = isAsc ? "asc" : "desc";
  
  const res = await fetch(
    `${BASE_URL}/products?limit=${SIZE}&skip=${skip}&sortBy=title&order=${order}`
  );
  
  if (!res.ok) {
    throw new Error("Network response error");
  }
  
  return res.json();
};

const Products = () => {
  const [page, setPage] = useState(1);
  const [isAsc, setIsAsc] = useState(true);

  
  const { data, isLoading, isError, error } = useQuery({
   
    queryKey: ["products", page, isAsc],
    queryFn: () => fetchProducts(page, isAsc),
    keepPreviousData: (previousData) => previousData, 
     staleTime: Infinity,
   
  });

  // Extract variables safely from the data object returned by useQuery
  const products = data?.products || [];
  const totalItems = data?.total || 0;
  const lastPage = Math.ceil(totalItems / SIZE);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

   return (
    <div>
        <div>
            sort by title: {""}
            <button onClick={() => {setIsAsc((prev ) => !prev); setPage(1); }}> {isAsc? "Ascending": "Descending"}</button>
        </div>
        <div>
            <ul>
                {products.map((item) =>(
                    <li key= {item.id}> {item.title}</li>

                ))}
            </ul>
        </div>

        <div>
            <button  disabled= {page === 1}onClick={() => setPage((prev) => prev -1)}>prev</button>
             <span> Page {page} of {lastPage || 1} </span>
            <button disabled = { page === lastPage}onClick={() => setPage((prev) => prev +1)}>next</button>
        </div>
       
    </div>
   )


};
export default Products;
