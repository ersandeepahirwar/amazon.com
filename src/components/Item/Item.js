import Image from "next/image";

import { useDispatch } from "react-redux";

import Currency from "react-currency-formatter";

import { MinusIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../slices/cartSlice";

const Item = ({
  id,
  title,
  price,
  description,
  image,
  ratings,
  hasPrime,
  quantity,
}) => {
  const dispatch = useDispatch();

  const increaseProductQuantity = () => {
    dispatch(increaseQuantity(id));
  };

  const decreaseProductQuantity = () => {
    dispatch(decreaseQuantity(id));
  };

  const removeProductFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-col space-y-3 bg-white p-5 shadow-md lg:flex-row lg:items-center lg:justify-evenly lg:space-x-5 lg:space-y-0">
      <div className="p-5 text-center lg:p-0">
        <Image
          src={image}
          alt="Item Thumbnail"
          width={150}
          height={150}
          objectFit="contain"
        />
      </div>
      <div className="space-y-2 lg:max-w-[350px]">
        <p className="text-center text-sm">{title}</p>
        <div className="flex justify-center">
          {Array(ratings)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} className="h-4 text-yellow-500" />
            ))}
        </div>
        <p className="text-center text-xs line-clamp-3">{description}</p>
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
      </div>
      <div className="flex flex-col space-y-3 lg:min-w-[150px]">
        <div className="flex flex-row items-center justify-center space-x-3">
          <button
            disabled={quantity === 1}
            className={`rounded-sm border border-red-300 bg-gradient-to-b from-red-200 to-red-400 p-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 ${
              quantity === 1 && "cursor-not-allowed"
            }`}
            onClick={decreaseProductQuantity}
          >
            <MinusIcon className="h-4" />
          </button>
          <p>{quantity}</p>
          <button
            className="rounded-sm border border-green-300 bg-gradient-to-b from-green-200 to-green-400 p-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
            onClick={increaseProductQuantity}
          >
            <PlusIcon className="h-4" />
          </button>
        </div>
        <button
          className="rounded-sm border border-yellow-300 bg-gradient-to-b from-yellow-200 to-yellow-400 p-1 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
          onClick={removeProductFromCart}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
