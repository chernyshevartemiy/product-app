import React from 'react';
import Product from "./components/Product";
import {useProducts} from "./hooks/products";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Modal from "./components/Modal";
import CreateProduct from "./components/CreateProduct";
import {IProduct} from "./models";

function App() {
  const {products, loading, error, addProduct} = useProducts()
  const [modal, setModal] = React.useState(false)
  const createHandler = (product: IProduct) => {
    setModal(false)
    addProduct(product)
  }
  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Loader/>}
      {error && <Error error={error}/>}
      {products.map((product) => <Product product={product} key={product.id}/>)}
      {modal && <Modal onClose={() => setModal(false)} title='Create a new product'>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 font-bold px-4 py-2' onClick={() => setModal(true)}>+</button>
    </div>
  );
}

export default App;
