import Head from "next/head";

import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Feed from "../components/Feed/Feed";

export default function Home({ products }) {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-100 scrollbar-hide">
      <Head>
        <title>Amazon</title>
        <meta
          name="description"
          content="amazon.com built with Next.js by Sandeep Ahirwar"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-[1200px]">
        <Banner />
        <Feed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );

  return { props: { products } };
}
