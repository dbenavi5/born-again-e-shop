import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Array, required: true },
    color: { type: Array, required: true },
    size: { type: Array, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String },
    featureCategory: {
      type: String,
      enum: ["newArrivals", "bestSellers", "topRated"],
      default: "newArrivals",
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
