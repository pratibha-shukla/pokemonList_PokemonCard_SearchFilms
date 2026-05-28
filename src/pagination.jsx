
// A list of product objects is returned from the API (https://dummyjson.com/docs/products)
// 1. Retrieve the products matching the search query from user input and display the titles
// in a list, showing exactly 5 items per page.
// 2. Below the list, implement functional pagination controls: "First", "Prev", dynamic page
// numbers, "Next", and "Last".
// 3. Disable "First" and "Prev" on page 1. Disable "Next" and "Last" on the final page.
// 4. Visually highlight the currently active page number button.
// 5. Bonus: Implement a debounce on the search input
import { useState, useEffect } from "react";

export default function PaginationProductList() {
  const [productSearch, setProductSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const itemPerpage = 5;


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(productSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [productSearch]);

 
useEffect(() => {
    if (!debouncedSearch.trim()) {
    setProductList([]);
    setLoading(false);
    setError(null);
    return; 
  }
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure the URL matches this EXACT structure:
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${debouncedSearch}`
      );
      
      if (!res.ok) {
        throw new Error("Not working with this api");
      }
      
      const data = await res.json();
      setProductList(data.products || []);
      setCurrentPage(1); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [debouncedSearch]);



  // Pagination Calculations
  const totalPage = Math.ceil(productList.length / itemPerpage) || 1;
  const indexOfLastItem = currentPage * itemPerpage;
  const indexOfFirstItem = indexOfLastItem - itemPerpage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div>
      <h3 style={{color: "blue"}}>Product list</h3>
      <input
        type="text"
        placeholder="type here products name ..."
        value={productSearch}
        onChange={(e) => setProductSearch(e.target.value)}
       style={{width: "200px", padding: "10px", color: "red", background: "white", borderRadius: "8px"}}/>

      {loading && <p style={{color: "purple"}}>Loading products...</p>}
      {error && <p style={{color: "red"}}>Error: {error}</p>}

      {!loading && (
        <ul>
          {currentItems.map((p) => (
            <li key={p.id} style={{listStyle: "none", padding: "10px", color: "blue", margin: "10px"}}>
                <span style={{color: "green"}}>{p.title } </span><br></br>
                 <span style={{color: "red"}}> ${p.price}</span><br></br>
                  <span style={{color: "purple"}}>  {p.category} </span><br></br>
                      
                            
            </li>
          ))}
          {currentItems.length === 0 && !error && <p>No products found</p>}
        </ul>
      )}

     
      {!loading && productList.length > 0 && (
        <div>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
             style={{color: "blue", padding: "5px"}}>
            First
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
           style={{color: "blue", padding: "5px"}}>
            Prev
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              disabled={currentPage === number} 
             style={{color: "green", padding: "5px"}}>
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPage}
           style={{color: "blue", padding: "5px"}}>
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPage)}
            disabled={currentPage === totalPage}
           style={{color: "blue", padding: "5px"}}>
            Last
          </button>
        </div>
      )}
    </div>
  );
}



