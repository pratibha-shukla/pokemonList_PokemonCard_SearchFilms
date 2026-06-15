// Homework: build useQuery(options)
// Options: queryKey, queryFn, staleTime (default 0) Returns: { data, isLoading, isError, error }.
// Submit your work in the same spreadsheet above

import { useState, useEffect } from "react";

const limit = 10;
const base_url = "https://dummyjson.com/products";


export default function ShortOrder(){
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isAsc, setIsAsc] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const lastPage = Math.ceil(totalItems / limit);

    useEffect(() => {
        async function fetchProducts() {
            const skip = (page - 1 )* limit
              const shortOrder = isAsc ? "asc" : "desc";
              try {
                const res = await fetch (
                `${base_url}?limit=${limit}&skip=${skip}&sortBy=title&order=${shortOrder}`
            );
            const data = await res.json();

            setProducts(data.products || []);
            setTotalItems(data.total || 0)
              } catch(error) {
                console.log("error fetching data" , error);
         }
        }
     fetchProducts();
                       
     },[page, isAsc])

   return (
    <div>
        <div>
            sort by title: {""}
            <button onClick={() => {setIsAsc((prev ) => !prev); setPage(1); }}> {isAsc? "A-Z": "Z-A"}</button>
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


}