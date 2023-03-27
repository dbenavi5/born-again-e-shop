import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AdminLayout from "../../../components/AdminLayout";
import { getError } from "../../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      state;
  }
}

function AdminUserEditPage() {
  const { query } = useRouter();
  const userId = query.id;

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("isAdmin", data.isAdmin);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [userId, setValue]);

  const router = useRouter();

  const submitHandler = async ({ name, isAdmin }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        isAdmin,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
    }
  };

  return (
    <div title={`Edit User: ${userId}`}>
      <div className="grid md:grid-cols-3 md:gap-5 px-5">
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-lg md:text-xl p-5 text-blue-500 font-bold">
                Edit User:{" "}
                <span className="text-slate-400 text-sm font-light">{`${userId}`}</span>
              </h1>
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && <div>{errors.name.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="isAdmin">Is Admin</label>
                <input
                  type="checkbox"
                  className="w-full"
                  id="isAdmin"
                  {...register("isAdmin")}
                />
                {errors.isAdmin && <div>{errors.isAdmin.message}</div>}
              </div>
              <div className="mb-4 flex justify-between">
                <div className="default-button">
                  <Link href={`/admin/users`}>Back</Link>
                </div>
                <button disabled={loadingUpdate} className="create-button">
                  {loadingUpdate ? "Loading" : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

AdminUserEditPage.auth = { adminOnly: true };
export default AdminUserEditPage;

AdminUserEditPage.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
