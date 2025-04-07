import React, { useState } from "react";
import Select from "react-select";

const GuestHouses = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [gender, setGender] = useState("");
  const [filteredHouses, setFilteredHouses] = useState([]);

  const guestHouses = [
    {
      name: "Sunrise Villa",
      owner: "Mr. Rajesh Sharma",
      location: "Sector 5, Jaipur",
      capacity: "10 rooms, 20 guests",
      image: "https://example.com/sunrise-villa.jpg",
      college: "LNMIIT",
      details: "A luxurious villa with modern amenities and a serene environment.",
      number: "6237946983",
      price: 1500,
      category: "Paid Guest House",
      gender: "Male",
    },
    {
      name: "Greenwood Residency",
      owner: "Ms. Priya Mehta",
      location: "Bani Park, Jaipur",
      capacity: "15 rooms, 30 guests",
      image: "https://example.com/greenwood-residency.jpg",
      college: "JECRC",
      details: "Comfortable and budget-friendly residency near the city center.",
      number: "8812347613",
      price: 1000,
      category: "Paid Guest House",
      gender: "Female",
    },
    {
      name: "Lakeview Retreat",
      owner: "Mr. Anil Kapoor",
      location: "Amer Road, Jaipur",
      capacity: "8 rooms, 16 guests",
      image: "https://example.com/lakeview-retreat.jpg",
      college: "MNIT",
      details: "Scenic guest house with a mesmerizing lake view and cozy rooms.",
      number: "9678683689",
      price: 1200,
      category: "Hotel",
      gender: "Any",
    },
    {
      name: "Heritage Inn",
      owner: "Mrs. Sunita Verma",
      location: "C-Scheme, Jaipur",
      capacity: "12 rooms, 24 guests",
      image: "https://example.com/heritage-inn.jpg",
      college: "LNMIIT",
      details: "A historical guest house with traditional decor and premium services.",
      number: "9231784698",
      price: 2000,
      category: "Hotel",
      gender: "Female",
    },
    {
      name: "Budget Stay",
      owner: "Mr. Ravi Saini",
      location: "Malviya Nagar, Jaipur",
      capacity: "6 rooms, 12 guests",
      image: "https://example.com/budget-stay.jpg",
      college: "MNIT",
      details: "Affordable accommodation with basic amenities.",
      number: "7003445234",
      price: 800,
      category: "Paid Guest House",
      gender: "Male",
    },
    {
      name: "Elite Comfort Hotel",
      owner: "Mrs. Naina Arora",
      location: "Vaishali Nagar, Jaipur",
      capacity: "20 rooms, 40 guests",
      image: "https://example.com/elite-comfort-hotel.jpg",
      college: "JECRC",
      details: "Top-rated hotel with executive service and facilities.",
      number: "9982378123",
      price: 2500,
      category: "Hotel",
      gender: "Any",
    },
    {
      name: "Royal Heritage Haveli",
      owner: "Mr. Vikram Rathore",
      location: "Khatipura, Jaipur",
      capacity: "15 rooms, 30 guests",
      image: "https://example.com/royal-heritage-haveli.jpg",
      college: "LNMIIT",
      details: "Experience royal heritage with modern comforts.",
      number: "9829012345",
      price: 3000,
      category: "Hotel",
      gender: "Any",
    },
    {
      name: "The Grand Palace",
      owner: "Ms. Anjali Desai",
      location: "MI Road, Jaipur",
      capacity: "25 rooms, 50 guests",
      image: "https://example.com/the-grand-palace.jpg",
      college: "JECRC",
      details: "A grand hotel offering luxurious stays in the heart of the city.",
      number: "9812345678",
      price: 3500,
      category: "Hotel",
      gender: "Any",
    },
    {
      name: "City Center Inn",
      owner: "Mr. Suresh Gupta",
      location: "Sindhi Camp, Jaipur",
      capacity: "10 rooms, 20 guests",
      image: "https://example.com/city-center-inn.jpg",
      college: "MNIT",
      details: "Conveniently located inn with easy access to transportation hubs.",
      number: "9876543210",
      price: 900,
      category: "Paid Guest House",
      gender: "Any",
    },
    {
      name: "Tranquil Gardens",
      owner: "Mrs. Kavita Joshi",
      location: "Civil Lines, Jaipur",
      capacity: "12 rooms, 24 guests",
      image: "https://example.com/tranquil-gardens.jpg",
      college: "LNMIIT",
      details: "Peaceful guest house surrounded by lush gardens.",
      number: "9765432109",
      price: 1800,
      category: "Paid Guest House",
      gender: "Female",
    },
    {
      name: "Amber Palace Hotel",
      owner: "Mr. Rohan Mehta",
      location: "Amer, Jaipur",
      capacity: "18 rooms, 36 guests",
      image: "https://example.com/amber-palace-hotel.jpg",
      college: "JECRC",
      details: "Luxury hotel near the historic Amber Fort.",
      number: "9654321098",
      price: 2800,
      category: "Hotel",
      gender: "Any",
    },
    {
      name: "Pink City Hostel",
      owner: "Ms. Sneha Kapoor",
      location: "Raja Park, Jaipur",
      capacity: "8 rooms, 16 guests",
      image: "https://example.com/pink-city-hostel.jpg",
      college: "MNIT",
      details: "A vibrant hostel for backpackers and solo travelers.",
      number: "9543210987",
      price: 700,
      category: "Paid Guest House",  // <-- Added
      gender: "Female"               // <-- Added
    }
  ]

 


  const colleges = [
    { value: "LNMIIT", label: "LNMIIT" },
    { value: "JECRC", label: "JECRC" },
    { value: "MNIT", label: "MNIT" },
  ];

  const handleSearch = () => {
    if (selectedCollege && minBudget && maxBudget && gender) {
      const min = parseInt(minBudget);
      const max = parseInt(maxBudget);

      const results = guestHouses.filter((house) => {
        const matchesCollege = house.college === selectedCollege.value;
        const matchesBudget = house.price >= min && house.price <= max;
        const matchesGender =
          house.gender === "Any" || house.gender === gender;
        return matchesCollege && matchesBudget && matchesGender;
      });

      setFilteredHouses(results);
    } else {
      setFilteredHouses([]);
    }
  };

  const renderCategory = (category) => {
    const housesInCategory = filteredHouses.filter(
      (house) => house.category === category
    );
    if (housesInCategory.length === 0) return null;

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 mt-6">{category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {housesInCategory.map((house, index) => (
            <div
              key={index}
              className="group bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
            >
              <img
                src={house.image}
                alt={house.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{house.name}</h2>
              <p className="text-gray-600"><strong>Owner:</strong> {house.owner}</p>
              <p className="text-gray-600"><strong>Location:</strong> {house.location}</p>
              <p className="text-gray-600"><strong>Capacity:</strong> {house.capacity}</p>
              <p className="text-gray-600"><strong>Price:</strong> ₹{house.price}</p>
              <p className="text-gray-600"><strong>Contact Number:</strong> {house.number}</p>
              <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-lg">
                <p className="text-center">{house.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Guest Houses Near Your College
      </h1>
      <div className="max-w-3xl mx-auto space-y-4 text-center mb-6">
        <Select
          options={colleges}
          value={selectedCollege}
          onChange={setSelectedCollege}
          placeholder="Select your college"
          className="w-full"
        />
        <div className="flex justify-between gap-4">
          <input
            type="number"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            placeholder="Min Budget (₹)"
            className="w-1/2 p-2 rounded-md border border-gray-300"
          />
          <input
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            placeholder="Max Budget (₹)"
            className="w-1/2 p-2 rounded-md border border-gray-300"
          />
        </div>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300"
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-600 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {filteredHouses.length > 0 ? (
        <>
          {renderCategory("Paid Guest House")}
          {renderCategory("Hotel")}
        </>
      ) : (
        <p className="text-center text-gray-600">
          Please fill all filters to see guest houses.
        </p>
      )}
    </div>
  );
};

export default GuestHouses;
