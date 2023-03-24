import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import Categories from "../components/Categories";
import ProductItems from "../components/ProductItems";
import Slider from "../components/Slider";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, product out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to cart");
  };
  return (
    <div title="Home Page">
      <Slider />
      <Categories />
      <h3 className='text-center items-center justify-center m-auto p-10 text-slate-500 w-[80%]'>Our Featured <b>Products</b></h3>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 pt-4 lg:px-24 lg:py-14">
        {products.map((product) => (
          <ProductItems
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
