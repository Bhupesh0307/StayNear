import express from "express";
import multer from "multer";
import path from "path";
import { authenticate } from "../middlewares/auth.js";
import House from "../models/House.js";

const router = express.Router();

// ===============================
// 💾 MULTER STORAGE (for Images)
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =======================================================
// 🏡 1. UPLOAD A NEW GUEST HOUSE  (OWNER ONLY)
// =======================================================
router.post(
  "/upload",
  authenticate, // must be logged in
  upload.array("images", 10), // max 10 images
  async (req, res) => {
    try {
      // Only owners allowed
      if (req.user.role !== "owner") {
        return res
          .status(403)
          .json({ message: "Only owners can upload houses" });
      }

      const images = req.files.map((file) => file.filename);

      const {
        title,
        address,
        ownerName,
        phone,
        price,
        rooms,
        guests,
        college,
        distance,
        amenities,
      } = req.body;

      const newHouse = await House.create({
        title,
        address,
        ownerName,
        phone,
        price,
        rooms,
        guests,
        college,
        distance,
        amenities: typeof amenities === "string" ? [amenities] : amenities,
        images,
        owner: req.user.id,
      });

      res.status(201).json({
        message: "Guest House Uploaded Successfully",
        house: newHouse,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ message: "Upload Failed", error: err.message });
    }
  }
);

// =======================================================
// 🏡 2. GET ALL HOUSES (PUBLIC)
// =======================================================
router.get("/", async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch houses" });
  }
});

// =======================================================
// 🏡 3. GET SPECIFIC OWNER'S HOUSES (OWNER DASHBOARD)
// =======================================================
router.get("/owner", authenticate, async (req, res) => {
  try {
    const houses = await House.find({ owner: req.user.id });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's houses" });
  }
});

// =======================================================
// 🗑️ 4. DELETE HOUSE (OWNER ONLY)
// =======================================================
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) return res.status(404).json({ message: "House not found" });

    // Ensure only owner can delete
    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await house.deleteOne();

    res.json({ message: "House deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete house" });
  }
});

export default router;
