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

function AdminProductEditPage() {
  const { query } = useRouter();
  const productId = query.id;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
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
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("countInStock", data.countInStock);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary");
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);
      toast.success("File uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
    }
  };

  return (
    <div title={`Edit Product: ${productId}`}>
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
                Edit Product:{" "}
                <span className="text-slate-400 text-sm font-light">{`${productId}`}</span>
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
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  {...register("slug", {
                    required: "Please enter slug",
                  })}
                />
                {errors.slug && <div>{errors.slug.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register("price", {
                    required: "Please enter price",
                  })}
                />
                {errors.price && <div>{errors.price.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register("image", {
                    required: "Please enter image",
                  })}
                />
                {errors.image && <div>{errors.image.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="imageFile">Upload Image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading...</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  {...register("category", {
                    required: "Please enter category",
                  })}
                />
                {errors.category && <div>{errors.category.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="w-full"
                  id="brand"
                  {...register("brand", {
                    required: "Please enter brand",
                  })}
                />
                {errors.brand && <div>{errors.brand.message}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="countInStock">In Stock</label>
                <input
                  type="text"
                  className="w-full"
                  id="countInStock"
                  {...register("countInStock", {
                    required: "Please enter countInStock",
                  })}
                />
                {errors.countInStock && (
                  <div>{errors.countInStock.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="w-full"
                  id="description"
                  {...register("description", {
                    required: "Please enter description",
                  })}
                />
                {errors.description && <div>{errors.description.message}</div>}
              </div>
              <div className="mb-4 flex justify-between">
                <div className="default-button">
                  <Link href={`/admin/products`}>Back</Link>
                </div>
                <button
                  disabled={loadingUpdate}
                  className="create-button"
                >
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

AdminProductEditPage.auth = { adminOnly: true };
export default AdminProductEditPage;

AdminProductEditPage.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
