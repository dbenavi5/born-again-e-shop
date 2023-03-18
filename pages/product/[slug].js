import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { AiFillStar } from "react-icons/ai";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductScreen({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="p-10 hover:text-indigo-500">
          <Link href="/">Back to Home</Link>
        </div>
        <div className="px-10 pb-20 pt-10 md:p-24 text-center justify-center text-slate-400 text-2xl md:text-4xl">Sorry, Product Not Found</div>
      </Layout>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, product out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Added to cart successfully");
    router.push("/cart");
  };

  return (
    <Layout title={product.name} >
      <div className="pl-10 pt-10 hover:text-indigo-500">
        <Link href="/">Back to Home</Link>
      </div>
      <div className="grid lg:grid-cols-4 lg:gap-3 px-24 py-10">
        <div className="lg:col-span-2 pt-4">
          <Image
            className="w-4/5 h-70v object-cover"
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div className="py-6">
          <div className="card p-5">
            <div>
              <ul>
                <li className="py-2">
                  <h1 className="text-2xl font-black">{product.name}</h1>
                </li>
                <li className="py-2">Brand: {product.brand}</li>
                <li className="py-2 flex items-center">
                  <AiFillStar className="text-amber-400" /> &nbsp;
                  {product.rating} of {product.numReviews} Reviews
                </li>
                <li className="py-3">Details: {product.description}</li>
              </ul>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Price:</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status:</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
