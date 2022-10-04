import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";
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
      return toast.error('Sorry, product out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to cart');

  }
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 laptop:grid-cols-4">
        {products.map((product) => (
          <ProductItems product={product} key={product.slug} addToCartHandler={addToCartHandler}></ProductItems>
        ))}
      </div>
    </Layout>
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