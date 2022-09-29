import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { Layout } from '../components/Layout';
import { Store } from '../utils/Store';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
    
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  }

  return (
    <Layout title="shopping-cart">
      <h1 className="mb-4 text-lg">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/">
            <b className="cursor-pointer">Go shopping</b>
          </Link>
        </div>
      ) : (
        <div className="grid tablet:grid-cols tablet:gap-5">
          <div className="overflow-x-auto tablet:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                          &nbsp;{item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">$ {item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <AiOutlineCloseCircle />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal:(
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}) :{" "}
                  ${" "}
                  {cartItems.reduce(
                    (acc, curr) => acc + curr.quantity * curr.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  {" "}
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });