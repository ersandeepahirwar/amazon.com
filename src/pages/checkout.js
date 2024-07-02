import Image from "next/image";

import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import Currency from "react-currency-formatter";

import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.stripe_publishable_key);

import { selectProducts } from "../slices/cartSlice";

import Header from "../components/Header/Header";
import Item from "../components/Item/Item";

const Checkout = () => {
  const products = useSelector(selectProducts);

  const { data: session } = useSession();

  const totalItems = 0;
  const totalPrice = 0;
  products.forEach((product) => {
    totalItems += product.quantity;
    totalPrice += product.price * product.quantity;
  });

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      products: products,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll bg-gray-100 pb-10 scrollbar-hide">
      <Header />
      <main className="mx-auto mt-5 max-w-[1200px] space-y-5 sm:flex sm:w-[90vw] sm:space-x-5 sm:space-y-0">
        <div className="mx-auto w-[90vw] space-y-3 md:w-auto">
          <Image
            src="https://i.ibb.co/jTFfyDw/Prime-Day-Banner.png"
            alt="Prime Day Thumbnail"
            width={800}
            height={200}
            objectFit="contain"
          />
          <div className="space-y-5">
            <p className="bg-white p-2 text-center text-[14px] font-[500] shadow-md lg:p-3 lg:text-left lg:text-[15px]">
              {products.length === 0
                ? "Your Amazon Cart is empty"
                : "Shopping Cart"}
            </p>
            <div className="space-y-5">
              {products.map(
                (
                  {
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    ratings,
                    hasPrime,
                    quantity,
                  },
                  index
                ) => (
                  <Item
                    key={index}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    ratings={ratings}
                    hasPrime={hasPrime}
                    quantity={quantity}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="sticky top-28 mx-auto w-[90vw] shadow-md sm:h-fit sm:w-auto sm:min-w-[250px] lg:flex-grow">
          {products.length > 0 && (
            <div className="space-y-3 bg-white p-5">
              <p className="text-center text-sm">
                Subtotal ({totalItems} Items):
                <span>
                  &nbsp;
                  <Currency quantity={totalPrice} currency="GBP" />
                </span>
              </p>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`w-full rounded-sm border bg-gradient-to-b p-1 text-xs focus:outline-none focus:ring-1 ${
                  !session
                    ? "cursor-not-allowed border-gray-700 from-gray-500 to-gray-700 text-white focus:ring-gray-700"
                    : "border-yellow-300 from-yellow-200 to-yellow-400  focus:ring-yellow-500"
                }`}
              >
                {!session ? "Login To Checkout" : "Proceed To Checkout"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
