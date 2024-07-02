import Product from "../Product/Product";

const Feed = ({ products }) => {
  return (
    <div className="-mt-12 grid grid-flow-row-dense space-y-5 pb-10 sm:-mt-32 sm:grid-cols-2 sm:gap-5 sm:space-y-0 sm:p-5 md:-mt-40 lg:-mt-52 lg:grid-cols-3 xl:-mt-72 xl:grid-cols-4">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}

      {products.length > 0 && (
        <img
          src="https://i.ibb.co/S0H3PMZ/Showcase.jpg"
          alt="Showcase Thumbnail"
          className="hidden sm:col-span-full sm:inline-flex"
        />
      )}

      <div className="sm:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}
    </div>
  );
};

export default Feed;
