import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/orders");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <div title="Transactions">
      <div className="grid md:grid-cols-3 md:gap-5 px-5">
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-lg ml-5 text-blue-500 font-extrabold">Transactions</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-zinc-500">
                  <tr>
                    <th className="px-5 text-left text-blue-600 font-extrabold">ID</th>
                    <th className="p-5 text-left text-blue-500">USERS</th>
                    <th className="p-5 text-left text-blue-500">DATE</th>
                    <th className="p-5 text-left text-blue-500">TOTAL</th>
                    <th className="p-5 text-left text-blue-500">PAID</th>
                    <th className="p-5 text-left text-blue-500">DELIVERED</th>
                    <th className="p-5 text-left text-blue-500">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-slate-900 dark:border-zinc-500 hover:bg-slate-300/50 dark:hover:bg-zinc-700/50">
                      <td className="p-5 font-extrabold">{order._id.substring(20, 24)}</td>
                      <td className="p-5">
                        {order.user ? order.user.name : "DELETED USER"}
                      </td>
                      <td className="p-5">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5">${order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "not paid"}
                      </td>
                      <td className="p-5 italic">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "not delivered"}
                      </td>
                      <td className="p-5">
                        <Link href={`/order/${order._id}`} passHref>
                          <a className='default-button'>Details</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdminOrderScreen.auth = { adminOnly: true };

AdminOrderScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
