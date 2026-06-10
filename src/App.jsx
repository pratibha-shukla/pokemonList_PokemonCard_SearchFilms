import { useState } from 'react'



import PokemonCard from './pokemonCard'
import PokemonList from './pokemon'
import SearchFilms from "./searchFilms"
import PaginationProductList from './pagination'
import TicTacToe from './ticTocGame'
import Stopwatch from './stopwatch'
import PaymentSystem from './paymentSystem'
import FilteredList from './filterdList'

function App() {
  const [activeTab, setActiveTab] = useState("films");

  return (

    <div>
      <Stopwatch></Stopwatch>
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
         
        </nav>
      </header>
   
    <main>
   
    {activeTab === "films" &&  <SearchFilms></SearchFilms>}
    {activeTab === "products" &&  <PaginationProductList></PaginationProductList> }
     {activeTab === "pokemonCards" &&   <PokemonList></PokemonList> }
      {activeTab === "pokemon" &&   <PokemonCard></PokemonCard> }
      {activeTab === "tictacGame" && <TicTacToe></TicTacToe>}
      {activeTab === "payment" && <PaymentSystem></PaymentSystem>}
      {activeTab === "filterList" && <FilteredList></FilteredList>}
       </main>
    </div>
    
  )
}

export default App
