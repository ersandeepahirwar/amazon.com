import Image from "next/image";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { selectProducts } from "../../slices/cartSlice";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const products = useSelector(selectProducts);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-[#131921] px-3 py-3 sm:space-x-3">
        <div className="flex flex-grow items-center sm:flex-grow-0">
          <Image
            src="https://i.ibb.co/yWHdh7K/Amazon-Logo.png"
            alt="Amazon Logo"
            width={70}
            height={20}
            objectFit="contain"
            className="cursor-pointer active:scale-90 active:transform"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="hidden h-6 flex-grow items-center rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex">
          <input
            type="text"
            className="h-full flex-shrink flex-grow rounded-l-md px-2 text-xs focus:outline-none"
          />
          <SearchIcon className="h-full cursor-pointer p-1" />
        </div>
        <div className="flex items-center space-x-3 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut}>
            <p className="cursor-pointer text-xs text-white hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="cursor-pointer text-xs text-white hover:underline">
              Account & List
            </p>
          </div>
          <div
            onClick={() => router.push("/orders")}
            className="hidden flex-col sm:flex"
          >
            <p className="cursor-pointer text-xs text-white hover:underline">
              Returns
            </p>
            <p className="cursor-pointer text-xs text-white hover:underline">
              & Orders
            </p>
          </div>
          <div
            className="relative flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span
              className={`absolute -top-1 -right-1 h-4 ${
                products.length >= 10 ? "w-5" : "w-4"
              } cursor-pointer rounded-full bg-yellow-400 text-center text-xs font-semibold text-black md:right-7`}
            >
              {products.length}
            </span>
            <ShoppingCartIcon className="h-6 cursor-pointer text-white" />
            <p className="hidden cursor-pointer text-xs text-white md:ml-2 md:inline">
              Cart
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3 bg-[#232F3E] p-2">
        <p className="flex cursor-pointer items-center space-x-1 text-xs text-white">
          <MenuIcon className="h-6" />
          <span className="hidden sm:inline-flex">All</span>
        </p>
        <p
          onClick={() => router.push("/orders")}
          className="cursor-pointer text-xs text-white sm:hidden"
        >
          Returns & Orders
        </p>
        <p className="hidden cursor-pointer text-xs text-white sm:inline-flex">
          Prime Video
        </p>
        <p className="hidden cursor-pointer text-xs text-white sm:inline-flex">
          Amazon Business
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Today's Deals
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Electronics
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Foods & Grocery
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Prime
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Buy Again
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Shopper Toolkit
        </p>
        <p className="hidden cursor-pointer text-xs text-white lg:inline-flex">
          Health & Personal Care
        </p>
      </div>
    </header>
  );
};

export default Header;
