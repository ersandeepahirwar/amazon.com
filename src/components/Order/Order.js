import moment from "moment";

import Currency from "react-currency-formatter";

const Order = ({
  id,
  amount,
  amountShipping,
  amountDiscount,
  images,
  timestamp,
  products,
}) => {
  return (
    <div className="border shadow-md">
      <div className="flex items-center justify-between bg-gray-100 p-3 sm:p-4 md:items-start lg:p-5">
        <div className="space-y-1 md:space-y-2">
          <p className="text-xs font-[600] md:text-[13px]">TOTAL</p>
          <div className="space-y-[1px] md:space-y-[3px]">
            <p className="space-x-1 text-xs">
              <span className="text-gray-500">Delivery Charges</span>
              <span className="text-blue-500">
                <Currency quantity={amountShipping} currency="GBP" />
              </span>
            </p>
            <p className="space-x-1 text-xs">
              <span className="text-gray-500">Discount</span>
              <span className="text-blue-500">
                <Currency quantity={amountDiscount} currency="GBP" />
              </span>
            </p>
            <p className="space-x-1 text-xs">
              <span className="text-gray-500">Total</span>
              <span className="text-blue-500">
                <Currency quantity={amount} currency="GBP" />
              </span>
            </p>
          </div>
        </div>
        <div className="hidden flex-col text-center md:flex md:space-y-2">
          <p className="text-[13px] font-[600]">ORDER PLACED</p>
          <p className="text-[13px] text-gray-500">
            {moment.unix(timestamp).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="overflow-hidden text-center sm:w-[200px] md:space-y-2">
          <p className="text-xs font-[500] text-blue-500 md:text-[13px]">
            {products.length === 1
              ? `${products.length} Product`
              : `${products.length} Products`}
          </p>
          <p className="hidden truncate whitespace-nowrap text-xs text-gray-500 sm:inline-block">
            ORDER # {id}
          </p>
        </div>
      </div>
      <div className="p-3 sm:p-4 lg:p-5">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Product Thumbnail"
              className="h-10 object-contain sm:h-12 md:h-14 lg:h-20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
