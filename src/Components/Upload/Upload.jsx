import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadGuestHouse = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    address: "",
    ownerName: user?.name || "",
    phone: "",
    price: "",
    rooms: "",
    guests: "",
    distance: "",
    college: "",
    amenities: [],
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenity = (amenity) => {
    const exists = form.amenities.includes(amenity);
    setForm({
      ...form,
      amenities: exists
        ? form.amenities.filter((a) => a !== amenity)
        : [...form.amenities, amenity],
    });
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("address", form.address);
    formData.append("ownerName", form.ownerName);
    formData.append("phone", form.phone);
    formData.append("price", form.price);
    formData.append("rooms", form.rooms);
    formData.append("guests", form.guests);
    formData.append("distance", form.distance);
    formData.append("college", form.college);
    form.amenities.forEach((a) => formData.append("amenities[]", a));

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch("http://localhost:5000/api/houses/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Guest House Uploaded Successfully!");
      navigate("/guest-house");

    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">
        Upload Guest House
      </h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Guest House Name"
          value={form.title} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="text" name="address" placeholder="Address in Jaipur"
          value={form.address} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="text" name="ownerName" placeholder="Owner Name"
          value={form.ownerName} onChange={handleChange}
          className="border p-2 rounded" />

        <input type="text" name="phone" placeholder="Phone Number"
          value={form.phone} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="number" name="price" placeholder="₹ Price per night"
          value={form.price} onChange={handleChange} required
          className="border p-2 rounded" />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="rooms" placeholder="Total Rooms"
            value={form.rooms} onChange={handleChange} className="border p-2 rounded" />

          <input type="number" name="guests" placeholder="Guests Capacity"
            value={form.guests} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <input type="text" name="college" placeholder="Near College (LNM, JECRC, MNIT...)"
          value={form.college} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="distance" placeholder="Distance from college (e.g. 1.2 km)"
          value={form.distance} onChange={handleChange} className="border p-2 rounded" />

        <label className="font-medium">Amenities</label>
        <div className="flex gap-3">
          {["WiFi", "AC", "Gym", "Parking", "Food"].map((a) => (
            <label key={a} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={form.amenities.includes(a)}
                onChange={() => handleAmenity(a)}
              />
              {a}
            </label>
          ))}
        </div>

        <label className="font-medium">Upload Images</label>
        <input type="file" multiple onChange={handleImageUpload}
          className="border p-2 rounded" />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadGuestHouse;
