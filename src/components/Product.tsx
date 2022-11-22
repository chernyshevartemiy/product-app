import React from 'react';
import {IProduct} from "../models";

interface ProductProps {
  product: IProduct
}

const Product = ({product}: ProductProps) => {
  const [details, setShow] = React.useState(false)
  const btnClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
  const buttonClasses = [btnClassName, 'border px-4 py-2']
  return (
    <div className='border py-2 px-4 rounded flex flex-col items-center mb-2'>
      <img className='w-1/6 mb-4' src={product.image}/>
      <p>{product.title}</p>
      <span className='font-bold mb-2'>{product.price}$</span>
      <button className={buttonClasses.join(' ')}
              onClick={() => setShow(!details)}>
        {details ? 'Hide Details' : 'Show Details'}
      </button>
      {details &&
        <div>
          <span>{product.description}</span>
          <p>Rate: <span className='font-bold'>{product.rating.rate}</span></p>
        </div>
      }
    </div>
  );
};

export default Product;