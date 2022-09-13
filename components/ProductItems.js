/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductItems({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            className="rounded shadow object-cover h-64 w-full"
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            layout='responsive'
          ></Image>
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>$ {product.price}</p>
        <button className="primary-button" type="button">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
