import Image from "next/image";

import { useState } from "react";
import { useDispatch } from "react-redux";

import isprime from "isprime";

import Currency from "react-currency-formatter";

import { StarIcon } from "@heroicons/react/solid";

import { addToCart } from "../../slices/cartSlice";

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useDispatch();

  const [ratings] = useState(Math.ceil(rating.rate));
  const [hasPrime] = useState(isprime(id));

  const addProductToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      ratings,
      hasPrime,
    };

    dispatch(addToCart(product));
  };

  return (
    <div className="relative z-30 mx-auto flex w-[90vw] origin-bottom scale-100 transform flex-col justify-end space-y-3 bg-white p-5 shadow-md transition-transform duration-300 hover:scale-95 sm:w-auto">
      <p className="absolute top-2 right-3 text-xs capitalize text-gray-400">
        {category}
      </p>
      <div className="p-5 text-center">
        <Image
          src={image}
          alt="Product Image"
          width={150}
          height={150}
          objectFit="contain"
        />
      </div>
      <p className="text-center text-sm">{title}</p>
      <div className="flex justify-center">
        {Array(ratings)
          .fill()
          .map((_, index) => (
            <StarIcon key={index} className="h-4 text-yellow-500" />
          ))}
      </div>
      <p className="text-center text-xs line-clamp-2">{description}</p>
      <div className="text-center">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center justify-center space-x-2">
          <img
            loading="lazy"
            src="https://i.ibb.co/dWmVqy3/Prime.png"
            alt="Prime Image"
            className="w-12"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button
        className="rounded-sm border border-yellow-300 bg-gradient-to-b from-yellow-200 to-yellow-400 p-1 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
        onClick={addProductToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
