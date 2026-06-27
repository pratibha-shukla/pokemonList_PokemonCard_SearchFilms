// //FileSystem.jsx
// import React from "react";
// import { useState } from "react";

// const data = {
//   name: "root",
//   type: "directory",
//   children: [
//     {

//       id: "src_Name",
//       name: "src",
//       type: "directory",
//       children: [{ name: "index.ts", type: "file" }],
//     },
//     {
//       id: "public_name",
//       name: "public",
//       type: "directory",
//       children: [{ name: "index.html", type: "file" }],
//     },
//   ],
// };

// function FileNode({item }){
//   const isDirectory = item.type === "directory";
//   const [isOpen , setIsOpen] = useState(false);

// //   //Q. what is useState reurn and what data type?
// //   //ans: useState return an array with 2 elements index 0
// //   // is bollean data type and index 1 is function data type and used to update state

// //   // user click on folder and open folderor close folder
// //   // first step: user check each folder

// //    //import axios from 'axios';

// // // const apiClient = axios.create({
// // //   baseURL: 'https://dummyjson.com',
// // //   timeout: 5000, // 5 seconds timeout limit
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });
// // // const response = await apiClient.get(`/products/search?q=${searchTerm}`, 





//   return(
//     <div>
     
//       <li onClick={() => {
//         isDirectory && setIsOpen((prev) => !prev);
//       } }>
      
//         {isDirectory? "folder " : "file "}{item.name}
//         </li>
     

//         {isDirectory && isOpen && item.children && (
//           <ul>
//             {item.children.map((childNode, index) => (
//             <FileNode key={childNode.id || childNode.name || index}
//             item={childNode}/>
//             ))}
//           </ul>

//         )
//         }
      
     
//     </div>
//   );
  
// }

// export default function FileSystem(){
//   return(
//     <FileNode item={data}/>

   
//   )
// }


console.log("....end of old code........");

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseDebounce } from "./modernComponents/Debounce";

const data = {
  name: "root",
  type: "directory",
  children: [
    {
      id: "src_Name",
      name: "src",
      type: "directory",
      children: [{ name: "index.ts", type: "file" }],
    },
    {
      id: "public_name",
      name: "public",
      type: "directory",
      children: [{ name: "index.html", type: "file" }],
    },
  ],
};

// 1. Recursive React Component
function FileNode({ item, searchTerm }) {
  const isDirectory = item.type === "directory";
  const [isOpen, setIsOpen] = useState(false);

  // Add this helper function here
function hasMatchingNode(item, searchTerm) {
  if (!searchTerm) return true;
  if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
  
  if (item.children) {
    return item.children.some((child) => hasMatchingNode(child, searchTerm));
  }
  return false;
}


  return (
    <div>
      <li onClick={() => isDirectory && setIsOpen((prev) => !prev)}>
        {isDirectory ? "folder " : "file "}
        {item.name}
      </li>
      
      {isDirectory && isOpen && item.children && (
        <ul>
          {item.children.map((childNode, index) => (
            <FileNode 
              key={childNode.id || childNode.name || index} 
              item={childNode}
              searchTerm={searchTerm} // 2. Pass search query deeper down the tree recursively
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FileSystem() {
  const [input, setInput] = useState("");
  
  const debouncedSearch = UseDebounce({ value: input, delay: 300 });

  // 3. React Query holds the query cache state for the search string
  const { data: currentSearchTerm } = useQuery({
    queryKey: ["treeFilter", debouncedSearch],
    queryFn: () => debouncedSearch,
    initialData: "",
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Filter tree..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      {/* 4. Start the initial recursive tree component call */}
      <FileNode item={data} searchTerm={currentSearchTerm} />
    </div>
  );
}
