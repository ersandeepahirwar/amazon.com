const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (request, response) => {
  const { products, email } = request.body;

  const PRODUCTS = products.map((product) => ({
    price_data: {
      currency: "gbp",
      unit_amount: product.price * 100,
      product_data: {
        name: product.title,
        description: product.description,
        images: [product.image],
      },
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "NZ", "AU", "EG"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1LxScvSG5yw0iMBQoRnlfZUY",
      },
    ],
    discounts: [
      {
        coupon: "codeysandeep20",
      },
    ],
    line_items: PRODUCTS,
    mode: "payment",
    success_url: `${process.env.HOST_URL}/success`,
    cancel_url: `${process.env.HOST_URL}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(products.map((product) => product.image)),
    },
  });

  response.status(200).json({ id: session.id });
};
