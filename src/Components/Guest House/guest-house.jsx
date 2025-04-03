import React from "react";

import { useState } from "react";
import Select from "react-select";

const GuestHouses = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filteredHouses, setFilteredHouses] = useState([]);

  const guestHouses = [
    {
      name: "Sunrise Villa",
      owner: "Mr. Rajesh Sharma",
      location: "Sector 5, Jaipur",
      capacity: "10 rooms, 20 guests",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mZUW2IMy3zUms73WfkjK8fEOoQ4t21oExA&s",
      college: "LNMIIT",
      details: "A luxurious villa with modern amenities and a serene environment.",
      number:"6237946983"
    },
    {
      name: "Greenwood Residency",
      owner: "Ms. Priya Mehta",
      location: "Bani Park, Jaipur",
      capacity: "15 rooms, 30 guests",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb2CdADqfiR4e4SQ2dcJfxRVxkmdGq-Ukbgg&s",
      college: "JECRC",
      details: "Comfortable and budget-friendly residency near the city center.",
      number:"8812347613"
    },
    {
      name: "Lakeview Retreat",
      owner: "Mr. Anil Kapoor",
      location: "Amer Road, Jaipur",
      capacity: "8 rooms, 16 guests",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5i1f457EzTvB9dsi04VJsDww89g5is0ItqA&s",
      college: "MNIT",
      details: "Scenic guest house with a mesmerizing lake view and cozy rooms.",
      number: "9678683689"
    },
    {
      name: "Heritage Inn",
      owner: "Mrs. Sunita Verma",
      location: "C-Scheme, Jaipur",
      capacity: "12 rooms, 24 guests",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsJq-LTWeWSe-uw7L-uezTQ3PP_q9RGYEQQ&s",
      college: "LNMIIT",
      details: "A historical guest house with traditional decor and premium services.",
      number: "9231784698"
    },
  ];

  const colleges = [
    { value: "LNMIIT", label: "LNMIIT" },
    { value: "JECRC", label: "JECRC" },
    { value: "MNIT", label: "MNIT" },
    // Add more colleges as needed
  ];

  const handleSearch = () => {
    if (selectedCollege) {
      const results = guestHouses.filter(
        (house) => house.college === selectedCollege.value
      );
      setFilteredHouses(results);
    } else {
      setFilteredHouses([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Guest Houses Near Your College
      </h1>
      <div className="text-center mb-6">
        <Select
          options={colleges}
          value={selectedCollege}
          onChange={setSelectedCollege}
          placeholder="Select your college"
          className="inline-block w-1/3 text-left"
        />
        <button
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house, index) => (
            <div
              key={index}
              className="group bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
            >
              <img
                src={house.image}
                alt={house.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {house.name}
              </h2>
              <p className="text-gray-600">
                <strong>Owner:</strong> {house.owner}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {house.location}
              </p>
              <p className="text-gray-600">
                <strong>Capacity:</strong> {house.capacity}
              </p>
              <p className="text-gray-600">
                <strong>Contact Number:</strong> {house.number}
              </p>
              <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-lg">
                <p className="text-center">{house.details}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            Select a college to see available guest houses.
          </p>
        )}
      </div>
    </div>
  );
};

export default GuestHouses;
