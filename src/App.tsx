import React from 'react';
import Product from "./components/Product";
import axios, {AxiosError} from "axios";
import {IProduct} from "./models";
function App() {
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState('')
  async function fetchProducts() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=7')
      setProducts(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }
  React.useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <p className='text-center'>Loading...</p>}
      {error && <p className='text-center text-red-600'>{error}</p>}
      {products.map((product) => <Product product={product} key={product.id}/>)}
    </div>
  );
}

export default App;
