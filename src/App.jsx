import { useState } from 'react'




import PaginationProductList from './pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PaginationProductList></PaginationProductList>
 

    </>
  )
}

export default App
