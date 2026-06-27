import { useEffect, useState } from "react";

export function UseDebounce({value, delay = 300}){
    const[debounceValue, setDebounceValue] = useState(value);



useEffect(() => {
    const timer = setTimeout (() => setDebounceValue(value), delay );
    //The Cleanup Arrow Function
    return () => clearTimeout(timer);

}, [value, delay]);

return debounceValue;
};





// import { useState, useEffect } from "react";
// import { useDebounce } from "./useDebounce"; // Adjust path based on your folder structure

// export default function SearchComponent() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Use the hook here: pass the value and an optional delay
//   const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 });

//   // This effect only runs when the debounced value actually changes
//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       console.log(`API Call triggered for: ${debouncedSearchTerm}`);
//       // Fetch your Pokemon data here
//     }
//   }, [debouncedSearchTerm]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search Pokemon..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <p>Typing: {searchTerm}</p>
//       <p>Debounced (API Target): {debouncedSearchTerm}</p>
//     </div>
//   );
// }


