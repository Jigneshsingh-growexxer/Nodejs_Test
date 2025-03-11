import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
