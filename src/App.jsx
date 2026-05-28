import { useState } from 'react'



import PokemonCard from './pokemonCard'
import PokemonList from './pokemon'
import SearchFilms from "./searchFilms"
import PaginationProductList from './pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
 <PokemonCard></PokemonCard>
  <SearchFilms></SearchFilms>
  <PaginationProductList></PaginationProductList>
 <PokemonList></PokemonList>

    </>
  )
}

export default App
