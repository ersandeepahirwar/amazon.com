import { useRouter } from "next/router";

import { CheckCircleIcon } from "@heroicons/react/solid";

import Header from "../components/Header/Header";

const Success = () => {
  const router = useRouter();

  return (
    <div className="h-screen overflow-y-scroll bg-gray-100 scrollbar-hide">
      <Header />
      <main className="mx-auto mt-5 w-[90vw] max-w-[1000px]">
        <div className="flex flex-col space-y-5 bg-white p-5">
          <div className="flex flex-col items-center space-x-2 md:flex-row">
            <CheckCircleIcon className="h-20 text-green-500 md:h-8" />
            <p className="text-center text-[14px] md:text-start md:text-[16px]">
              Thank you, your order has been confirmed!
            </p>
          </div>
          <p className="text-center text-[13px] text-gray-600 md:text-start">
            Thank you for shopping with us. We'll send a confirmation once your
            item has been shipped, If you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="w-full rounded-sm border border-yellow-300 bg-gradient-to-b from-yellow-200 to-yellow-400 p-1 text-[13px] focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
