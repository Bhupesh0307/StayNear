import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, message: "StayNear API" }));


app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
console.error(err.stack);
res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});


mongoose
.connect(process.env.MONGO_URI, { })
.then(() => {
console.log("MongoDB connected");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error("Failed to connect to MongoDB:", err.message);
process.exit(1);
});