import { useEffect, useReducer } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "../../components/AdminLayout";
import { toast } from "react-hot-toast";
import { getError } from "../../utils/error";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <div title="Users">
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-lg ml-5 text-blue-500 font-extrabold">Users</h1>
          {loadingDelete && <div>Deleting...</div>}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left text-blue-600 font-extrabold">ID</th>
                    <th className="p-5 text-left text-blue-500">NAME</th>
                    <th className="p-5 text-left text-blue-500">EMAIL</th>
                    <th className="p-5 text-left text-blue-500">ADMIN</th>
                    <th className="p-5 text-left text-blue-500">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className=" p-5 font-extrabold">{user._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{user.name}</td>
                      <td className=" p-5 ">{user.email}</td>
                      <td className=" p-5 font-extrabold">{user.isAdmin ? "YES" : "NO"}</td>
                      <td className=" p-5 ">
                        <div className="flex flex-row md:flex-col">
                          <Link href={`/admin/user/${user._id}`} passHref>
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
                            type="button"
                            className="delete-button flex justify-center items-center"
                            onClick={() => deleteHandler(user._id)}
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
AdminUsersScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
