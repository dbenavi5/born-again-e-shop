import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { products } from "../../utils/data";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from "react-icons/ai";

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const { decreaseQty, increaseQty, qty, onAdd } = useStateContext();

  const product = products.find((p) => p.slug === slug);
  console.log(product);

  if (!product) {
    <div>Product Not Found</div>;
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
              {/* set quantity */}
              <div className="flex items-center justify-between">
                <h3>Quantity: </h3>
                <p className="flex p-1.5">
                  <span className="px-2" onClick={decreaseQty}>
                    <AiOutlineMinus className="text-red-600 w-6 h-6" />
                  </span>
                  <span className="px-2">{qty}</span>
                  <span className="px-2" onClick={increaseQty}>
                    <AiOutlinePlus className="text-green-600 w-6 h-6" />
                  </span>
                </p>
              </div>
              {/* end quantity */}
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
              onClick={() => onAdd(product, qty)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
