import { useState } from 'react'



import PokemonCard from './pokemonCard'
import PokemonList from './pokemon'
import SearchFilms from "./searchFilms"
import PaginationProductList from './pagination'

function App() {
  const [activeTab, setActiveTab] = useState("films");

  return (

    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <button onClick={() => setActiveTab("films")} style={{color: "green"}}>Search Flims</button>
            <button onClick={() => setActiveTab("products")} style={{color: "blue"}}>Product List</button>
              <button onClick={() => setActiveTab("pokemonCards")} style={{color: "red"}}>Pokemon Card</button>
                <button onClick={() => setActiveTab("pokemon")} style={{color: "purple"}}>Pokemon List</button>
         
        </nav>
      </header>
   
    <main>
   
    {activeTab === "films" &&  <SearchFilms></SearchFilms>}
    {activeTab === "products" &&  <PaginationProductList></PaginationProductList> }
     {activeTab === "pokemonCards" &&   <PokemonList></PokemonList> }
      {activeTab === "pokemon" &&   <PokemonCard></PokemonCard> }
       </main>
    </div>
    
  )
}

export default App
