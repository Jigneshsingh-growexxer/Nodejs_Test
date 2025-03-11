import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, min: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
