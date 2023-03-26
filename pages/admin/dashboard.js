import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useReducer } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getError } from "../../utils/error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/summary");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <div title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 md:px-5">
        <div className="md:col-span-3">
          <h1 className="mb-4 text-lg ml-5 text-blue-500 font-extrabold">
            Admin Dashboard
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* <div className="card m-5 p-5">
                  <p className="text-3xl">${summary.revenue}</p>
                  <p>Revenue</p>
                  <Link href="/admin/orders">View sales</Link>
                </div> */}
                <div className="card m-5 p-5 bg-[#f8333c]/90 hover:bg-[#f8333c] text-white">
                  <p className="text-3xl">${summary.ordersPrice}</p>
                  <p className="text-xl text-gray-200">Sales</p>
                  <Link href="/admin/orders">
                    <a className="font-bold italic text-gray-300 hover:text-gray-200">
                      View sales
                    </a>
                  </Link>
                </div>
                <div className="card m-5 p-5 bg-[#3772ff]/90 hover:bg-[#3772ff] text-white">
                  <p className="text-3xl">{summary.ordersCount}</p>
                  <p className="text-xl text-gray-200">Orders</p>
                  <Link href="/admin/orders">
                    <a className="font-bold italic text-gray-300 hover:text-gray-200">
                      View orders
                    </a>
                  </Link>
                </div>
                <div className="card m-5 p-5 . bg-[#2a1e5c]/90 hover:bg-[#2a1e5c] text-white">
                  <p className="text-3xl">{summary.productsCount}</p>
                  <p className="text-xl text-gray-200">Products</p>
                  <Link href="/admin/products">
                    <a className="font-bold italic text-gray-300 hover:text-gray-200">
                      View products
                    </a>
                  </Link>
                </div>
                <div className="card m-5 p-5 bg-[#5c8001]/90 hover:bg-[#5c8001] text-white">
                  <p className="text-3xl">{summary.usersCount}</p>
                  <p className="text-xl text-gray-200">Customers</p>
                  <Link href="/admin/user">
                    <a className="font-bold italic text-gray-300 hover:text-gray-200">
                      View users
                    </a>
                  </Link>
                </div>
              </div>
              <h2 className="text-2xl px-10 text-center">
                Sales Report
              </h2>
              <Bar
                options={{ legend: { display: true, position: "right" } }}
                data={data}
                className="px-10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;

AdminDashboardScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
