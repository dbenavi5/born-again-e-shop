import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useContext} from "react";
import { Layout } from "../../components/Layout";
import { products } from "../../utils/data";
import { AiFillStar } from "react-icons/ai";
import { Store } from "../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;

  const product = products.find((p) => p.slug === slug);
  console.log(product);

  if (!product) {
    <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry, product out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Home</Link>
      </div>
      <div className="grid laptop:grid-cols-4 laptop:gap-3">
        <div className="laptop:col-span-2 pt-4">
          <Image
            className="w-4/5 h-70v object-cover"
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div className='py-6'>
          <div className="card p-5">
            <div>
              <ul>
                <li className="py-2">
                  <h1 className="text-2xl font-black">{product.name}</h1>
                </li>
                <li className="py-2">Brand: {product.brand}</li>
                <li className="py-2 flex items-center">
                  <AiFillStar className='text-amber-400' /> &nbsp;{product.rating} of {product.numReviews}{" "}
                  Reviews
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
