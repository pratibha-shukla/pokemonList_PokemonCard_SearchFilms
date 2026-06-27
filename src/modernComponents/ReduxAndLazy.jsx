import React, { useEffect } from "react"; 
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { Provider, useSelector, useDispatch } from "react-redux"; 
import axios from "axios"; 

const BASE_URL = "https://dummyjson.com"; 

// 1. The Async Action to fetch data
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => { 
  const response = await axios.get(`${BASE_URL}/products`); 
  return response.data.products; 
}); 

// 2. The Slice managing state
const productsSlice = createSlice({ 
  name: "products", 
  initialState: { items: [], loading: false }, 
  reducers: {}, 
  extraReducers: (builder) => { 
    builder 
      .addCase(fetchProducts.pending, (state) => { state.loading = true; }) 
      .addCase(fetchProducts.fulfilled, (state, action) => { 
        state.loading = false; 
        state.items = action.payload; 
      }); 
  }, 
}); 

// 3. Create the Redux Store
const store = configureStore({ 
  reducer: { products: productsSlice.reducer }, 
}); 

// 4. The UI List Component
function ProductsList() { 
  const dispatch = useDispatch(); 
  const { items, loading } = useSelector((state) => state.products); 

  useEffect(() => { 
    dispatch(fetchProducts()); 
  }, [dispatch]); 

  return ( 
    <div> 
      {loading && <p>Loading Redux Thunk Items...</p>} 
      <ul> 
        {items.map((product) => ( 
          <li key={product.id}>{product.title}</li> 
        ))} 
      </ul> 
    </div> 
  ); 
} 

// 5. Wrap the sub-component inside its isolated Redux Provider
export default function ReduxProducts() { 
  return ( 
    <Provider store={store}> 
      <ProductsList /> 
    </Provider> 
  ); 
}


