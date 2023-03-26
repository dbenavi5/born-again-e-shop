import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { BsPlusSquare } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETEE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}
export default function AdminProductsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure you want to delete")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success(`Successfully deleted`);
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <div title="Admin Products">
      <div className="grid md:grid-cols-3 md:gap-5 md:px-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-lg ml-5 text-blue-500 font-extrabold">
              Admin Products
            </h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="create-button mx-4 md:mx-12 flex justify-center items-center space-x-2"
            >
              <BsPlusSquare />
              <span className="hidden md:inline-block">
                {loadingCreate ? "Loading" : "Create"}
              </span>
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left text-blue-600 font-extrabold">
                      ID
                    </th>
                    <th className="p-5 text-left text-blue-500">NAME</th>
                    <th className="p-5 text-left text-blue-500">PRICE</th>
                    <th className="p-5 text-left text-blue-500">CATEGORY</th>
                    <th className="p-5 text-left text-blue-500">COUNT</th>
                    <th className="p-5 text-left text-blue-500">RATING</th>
                    <th className="p-5 text-left text-blue-500">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-5 font-extrabold">
                        {product._id.substring(20, 24)}
                      </td>
                      <td className="p-5">{product.name}</td>
                      <td className="p-5">${product.price}</td>
                      <td className="p-5">{product.category}</td>
                      <td className="p-5">{product.countInStock}</td>
                      <td className="p-5">{product.rating}</td>
                      <td className="p-5">
                        <div className="flex flex-row md:flex-col">
                          <Link href={`/admin/product/${product._id}`}>
                            <a
                              type="button"
                              className="edit-button text-center flex justify-center items-center"
                            >
                              <AiOutlineEdit />
                              <span className="hidden md:contents">Edit</span>
                            </a>
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className="delete-button flex justify-center items-center"
                            type="button"
                          >
                            <AiOutlineDelete />
                            <span className="hidden md:contents">Delete</span>
                          </button>
                        </div>
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

AdminProductsScreen.auth = { adminOnly: true };

AdminProductsScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
