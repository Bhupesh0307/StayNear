import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  title: String,
  address: String,
  ownerName: String,
  phone: String,
  price: Number,
  rooms: Number,
  guests: Number,
  college: String,
  distance: String,
  amenities: [String],
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("House", houseSchema);
