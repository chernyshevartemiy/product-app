import React from 'react';
import {IProduct} from "../models";
import axios from "axios";
import Error from "./Error";

const productData:IProduct = {
  title: 'Unnamed',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 4.2,
    count: 10,
  }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

function CreateProduct ({onCreate}: CreateProductProps) {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState('')
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    if (value.trim().length === 0) {
      setError('Please enter valid title.')
    } else {
      setError('')
    }
    productData.title = value
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    onCreate(response.data)
  }
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <form>
      <input
        type='text'
        className='border py-2 px-4 mb-2 w-full outline-none'
        placeholder='Enter a product title...'
        value={value}
        onChange={(e) => changeHandler(e)}

      />
      {error && <Error error={error}/>}
      <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-white' onClick={submitHandler}>Create</button>
    </form>
  );
};

export default CreateProduct;