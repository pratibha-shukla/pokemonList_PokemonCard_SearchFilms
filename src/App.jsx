// import { useState } from 'react'



// import PokemonCard from './pokemonCard'
// import PokemonList from './pokemon'
// import SearchFilms from "./searchFilms"
// import PaginationProductList from './pagination'
// import TicTacToe from './ticTocGame'
// import Stopwatch from './stopwatch'
// import PaymentSystem from './paymentSystem'
// import FilteredList from './filterdList'
// import ShortOrder from './shortOrder'
// import Products from './sortOrderReactQuery'

// function App() {
//   const [activeTab, setActiveTab] = useState("films");

//   return (

//     <div>
//       <Stopwatch></Stopwatch>
//       <header>
//         <h1>My App</h1>
//         <nav>
//           <button onClick={() => setActiveTab("films")} style={{color: "green"}}>Search Flims</button>
//             <button onClick={() => setActiveTab("products")} style={{color: "blue"}}>Product List</button>
//               <button onClick={() => setActiveTab("pokemonCards")} style={{color: "red"}}>Pokemon Card</button>
//                 <button onClick={() => setActiveTab("pokemon")} style={{color: "purple"}}>Pokemon List</button>
//                 <button onClick={() => setActiveTab("tictacGame")} style={{color: "green"}}> Tic-Tac-Toe-Game</button>
//                  <button onClick={() => setActiveTab("payment")} style={{color: "red"}}>payment System</button>
//                   <button onClick={() => setActiveTab("filterList")} style={{color: "purple"}}>FilterList</button>
//                    <button onClick={() => setActiveTab("sortOrder")} style={{color: "red"}}>sortOrder</button>
//                      <button onClick={() => setActiveTab("PaginationReactQuery")} style={{color: "green"}}>PaginationOrder</button>

         
//         </nav>
//       </header>
   
//     <main>
   
//     {activeTab === "films" &&  <SearchFilms></SearchFilms>}
//     {activeTab === "products" &&  <PaginationProductList></PaginationProductList> }
//      {activeTab === "pokemonCards" &&   <PokemonList></PokemonList> }
//       {activeTab === "pokemon" &&   <PokemonCard></PokemonCard> }
//       {activeTab === "tictacGame" && <TicTacToe></TicTacToe>}
//       {activeTab === "payment" && <PaymentSystem></PaymentSystem>}
//       {activeTab === "filterList" && <FilteredList></FilteredList>}
//       {activeTab === "sortOrder" && <ShortOrder></ShortOrder>}
//       {activeTab === "PaginationReactQuery" && <Products></Products>}
//        </main>
//     </div>
    
//   )
// }

// export default App

import { useState, lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import VirtualProductList from './modernComponents/ReacDottWindow';




import PokemonCard from './pokemonCard' 
import PokemonList from './pokemon' 
import SearchFilms from "./searchFilms" 
import PaginationProductList from './pagination' 
import TicTacToe from './ticTocGame' 
import Stopwatch from './stopwatch' 
import PaymentSystem from './paymentSystem' 
import FilteredList from './filterdList' 
import ShortOrder from './shortOrder' 
import Products from './sortOrderReactQuery' 
import FileSystem from './FileSystem' 
import PriorityJobs from './PriorityJobs'

// import ReduxProducts from './modernComponents/Redux'

const ReduxProducts = lazy(() => import('./modernComponents/ReduxAndLazy.jsx'));

const queryClient = new QueryClient();



function App() { 
  const [activeTab, setActiveTab] = useState("films"); 


  const sampleJobs= [
    {job_id: "job_1", Priority: 5},
    {job_id: "job_2", Priority: 2},
    {job_id: "job_3", Priority: 1},
    {job_id: "job_1", Priority: 3},
    {job_id: "job_2", Priority: 4},
  ]

  return ( 
    <QueryClientProvider client={queryClient}>
      <div> 
        <Stopwatch /> 
        <header> 
          <h1>My App</h1> 
          <nav> 
            <button onClick={() => setActiveTab("films")} style={{color: "green"}}>Search Flims</button> 
            <button onClick={() => setActiveTab("products")} style={{color: "blue"}}>Product List</button> 
            <button onClick={() => setActiveTab("pokemonCards")} style={{color: "red"}}>Pokemon Card</button> 
            <button onClick={() => setActiveTab("pokemon")} style={{color: "purple"}}>Pokemon List</button> 
            <button onClick={() => setActiveTab("tictacGame")} style={{color: "green"}}> Tic-Tac-Toe-Game</button> 
            <button onClick={() => setActiveTab("payment")} style={{color: "red"}}>payment System</button> 
            <button onClick={() => setActiveTab("filterList")} style={{color: "purple"}}>FilterList</button> 
            <button onClick={() => setActiveTab("sortOrder")} style={{color: "red"}}>sortOrder</button> 
           
            <button onClick={() => setActiveTab("PaginationReactQuery")} style={{color: "green"}}>PaginationReactQuery</button> 
             <button onClick={() => setActiveTab("FileSystem")} style={{color: "purple"}}>File System</button> <br></br>
             <button onClick={() => setActiveTab("jobPriority")} style= {{color: "blue"}}> Job Priority</button>
             <button onClick={() => setActiveTab("reduxThunkView")} style={{color: "orange"}}>Redux Products</button>
               <button onClick={() => setActiveTab("virtualWindow")} style={{color: "teal"}}>React Window</button>
          </nav> 
        </header> 
        <main> 
           {activeTab === "films" && <SearchFilms />} 
          {activeTab === "products" && <PaginationProductList /> } 
          {activeTab === "pokemonCards" && <PokemonList /> } 
          {activeTab === "pokemon" && <PokemonCard /> } 
          {activeTab === "tictacGame" && <TicTacToe />} 
          {activeTab === "payment" && <PaymentSystem />} 
          {activeTab === "filterList" && <FilteredList />} 
          {activeTab === "sortOrder" && <ShortOrder />}  
          {activeTab === "FileSystem" && <FileSystem />}
          {activeTab === "jobPriority" && <PriorityJobs intialJobs={sampleJobs}/>}
           {/* {activeTab === "reduxThunkView" && <ReduxProducts />} */}
           {activeTab === "PaginationReactQuery" && <Products />}  

            {activeTab === "virtualWindow" && <VirtualProductList />}
             {/* 4. WRAPPED the conditional render inside <Suspense> with a fallback message */}
          {activeTab === "reduxThunkView" && (
            <Suspense fallback={<div>Loading Redux Bundle...</div>}>
              <ReduxProducts />
            </Suspense>
          )}
        </main> 
      </div> 
    </QueryClientProvider>
  ) 
} 

export default App

