import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FiWifi, FiHome, FiDollarSign, FiMapPin, FiPhone, FiUser, FiUsers, FiHeart, FiFilter, FiCheck, FiSearch, FiStar, FiAirplay, FiMail, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { BiDumbbell, BiCctv } from "react-icons/bi";
import { TbAirConditioning, TbParking, TbToolsKitchen } from "react-icons/tb";
import { IoMdRestaurant } from "react-icons/io";
import { FaSchool } from "react-icons/fa";
import guestHouses from "../../data/GuestHouses";
import colleges from "../../data/Colleges";

const GuestHouses = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [gender, setGender] = useState("");
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [amenityFilters, setAmenityFilters] = useState({
    wifi: false,
    ac: false,
    gym: false,
    cctv: false,
    parking: false,
    kitchen: false,
    restaurant: false,
  });
  // Sort options
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "ratingDesc", label: "Highest Rating" },
    { value: "distanceAsc", label: "Nearest First" },
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("guestHouseFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("guestHouseFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (houseId) => {
    if (favorites.includes(houseId)) {
      setFavorites(favorites.filter(id => id !== houseId));
    } else {
      setFavorites([...favorites, houseId]);
    }
  };

  const resetFilters = () => {
    setSelectedCollege(null);
    setMinBudget("");
    setMaxBudget("");
    setGender("");
    setAmenityFilters({
      wifi: false,
      ac: false,
      gym: false,
      cctv: false,
      parking: false,
      kitchen: false,
      restaurant: false,
    });
    setFilteredHouses([]);
  };

  const handleSearch = () => {
    let results = [...guestHouses];

    // Filter by college if selected
    if (selectedCollege) {
      results = results.filter((house) => house.college === selectedCollege.value);
    }

    // Filter by budget if provided
    if (minBudget && maxBudget) {
      const min = parseInt(minBudget);
      const max = parseInt(maxBudget);
      results = results.filter((house) => house.price >= min && house.price <= max);
    }

    // Filter by gender if selected
    if (gender) {
      results = results.filter((house) => house.gender === "Any" || house.gender === gender);
    }

    // Filter by amenities
    Object.entries(amenityFilters).forEach(([amenity, isSelected]) => {
      if (isSelected) {
        results = results.filter((house) => house.amenities[amenity]);
      }
    });

    // Filter by search query (name or location)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (house) =>
          house.name.toLowerCase().includes(query) ||
          house.location.toLowerCase().includes(query) ||
          house.details.toLowerCase().includes(query)
      );
    }

    // Sort results
    switch (sortOption) {
      case "priceAsc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "ratingDesc":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "distanceAsc":
        results.sort((a, b) => {
          const distanceA = parseFloat(a.distance.split(" ")[0]);
          const distanceB = parseFloat(b.distance.split(" ")[0]);
          return distanceA - distanceB;
        });
        break;
      // For recommended, we use a combination of rating and price
      default:
        results.sort((a, b) => (b.rating * 0.7) - (a.price * 0.0003) - ((a.rating * 0.7) - (b.price * 0.0003)));
    }

    setFilteredHouses(results);
    setCurrentPage(1);
  };

  const handleAmenityChange = (amenity) => {
    setAmenityFilters({
      ...amenityFilters,
      [amenity]: !amenityFilters[amenity],
    });
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHouses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Group houses by category
  const renderByCategory = () => {
    const categories = [...new Set(currentItems.map(house => house.category))];
  
    // Sort so that "Paying Guest House" comes first
    categories.sort((a, b) => {
      if (a === "PG Accomodation") return -1;
      if (b === "PG Accomodation") return 1;
      return a.localeCompare(b); // optional alphabetical sorting for other categories
    });
  
    return categories.map(category => {
      const housesInCategory = currentItems.filter(house => house.category === category);
      if (housesInCategory.length === 0) return null;
  
      return (
        <div key={category}>
          <h2 className="text-2xl font-semibold mb-4 mt-6">{category}</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {housesInCategory.map((house) => renderGridItem(house))}
            </div>
          ) : (
            <div className="space-y-6">
              {housesInCategory.map((house) => renderListItem(house))}
            </div>
          )}
        </div>
      );
    });
  };
  

  const renderGridItem = (house) => (
    <div
      key={house.id}
      className="group bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
    >
      <div className="relative">
        <img
          src={house.image}
          alt={house.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(house.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <FiHeart
            className={`${
              favorites.includes(house.id)
                ? "text-red-500 fill-red-500"
                : "text-gray-400"
            }`}
            size={20}
          />
        </button>
        <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm">
          ₹{house.price}/night
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800">{house.name}</h2>
        <div className="flex items-center">
          <FiStar className="text-yellow-400 mr-1" />
          <span>{house.rating}</span>
          <span className="text-gray-400 text-sm ml-1">({house.reviewCount})</span>
        </div>
      </div>
      <p className="text-gray-600 flex items-center"><FiMapPin className="mr-1" /> {house.location}</p>
      <p className="text-gray-600 flex items-center"><FiUser className="mr-1" /> {house.owner}</p>
      <p className="text-gray-600 flex items-center"><FiPhone className="mr-1" /> {house.number}</p>
      <p className="text-gray-600 flex items-center"><FiUsers className="mr-1" /> {house.capacity}</p>
      <p className="text-gray-600 flex items-center"><FaSchool className="mr-1" /> {house.college}</p>
      <p className="text-sm text-blue-600">{house.distance} Km from {house.college}</p>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {house.amenities.wifi && (
          <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs">
            <FiWifi className="mr-1" /> WiFi
          </span>
        )}
        {house.amenities.ac && (
          <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs">
            <TbAirConditioning className="mr-1" /> AC
          </span>
        )}
        {house.amenities.gym && (
          <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs">
            <BiDumbbell className="mr-1" /> Gym
          </span>
        )}
        {/* More amenities can be shown on hover */}
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-lg">
        <div>
          <p className="text-center mb-4">{house.details}</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(house.amenities).map(([key, value]) => {
              if (!value) return null;
              let icon;
              switch (key) {
                case "wifi": icon = <FiWifi />; break;
                case "ac": icon = <TbAirConditioning />; break;
                case "gym": icon = <BiDumbbell />; break;
                case "cctv": icon = <BiCctv />; break;
                case "parking": icon = <TbParking />; break;
                case "kitchen": icon = <TbToolsKitchen />; break;
                case "restaurant": icon = <IoMdRestaurant />; break;
                default: icon = <FiCheck />;
              }
              return (
                <div key={key} className="flex items-center text-sm">
                  {icon}
                  <span className="ml-1 capitalize">{key}</span>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full bg-gradient-to-br from-orange-600 to-indigo-700 hover:bg-gradient-to-br hover:from-orange-700 hover:to-indigo-800 text-white py-2 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderListItem = (house) => (
    <div
      key={house.id}
      className="group bg-white p-4 shadow-md rounded-lg transition-all hover:shadow-xl relative flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
        <img
          src={house.image}
          alt={house.name}
          className="w-full h-48 md:h-full object-cover rounded-lg"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(house.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <FiHeart
            className={`${
              favorites.includes(house.id)
                ? "text-red-500 fill-red-500"
                : "text-gray-400"
            }`}
            size={20}
          />
        </button>
        <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          ₹{house.price}/night
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">{house.name}</h2>
          <div className="flex items-center">
            <FiStar className="text-yellow-400 mr-1" />
            <span>{house.rating}</span>
            <span className="text-gray-400 text-sm ml-1">({house.reviewCount})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <p className="text-gray-600 flex items-center"><FiMapPin className="mr-1" /> {house.location}</p>
          <p className="text-gray-600 flex items-center"><FiUser className="mr-1" /> {house.owner}</p>
          <p className="text-gray-600 flex items-center"><FiPhone className="mr-1" /> {house.number}</p>
          <p className="text-gray-600 flex items-center"><FiUsers className="mr-1" /> {house.capacity}</p>
        </div>
        
        <p className="text-sm text-blue-600 mt-2">{house.distance}</p>
        <p className="text-gray-700 mt-2">{house.details}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(house.amenities).map(([key, value]) => {
            if (!value) return null;
            let icon;
            switch (key) {
              case "wifi": icon = <FiWifi />; break;
              case "ac": icon = <TbAirConditioning />; break;
              case "gym": icon = <BiDumbbell />; break;
              case "cctv": icon = <BiCctv />; break;
              case "parking": icon = <TbParking />; break;
              case "kitchen": icon = <TbToolsKitchen />; break;
              case "restaurant": icon = <IoMdRestaurant />; break;
              default: icon = <FiCheck />;
            }
            return (
              <span key={key} className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs">
                {icon}
                <span className="ml-1 capitalize">{key}</span>
              </span>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  // Custom hook for tracking recently viewed houses
  const useRecentlyViewed = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    
    useEffect(() => {
      const stored = localStorage.getItem('recentlyViewedHouses');
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    }, []);
    
    const addToRecentlyViewed = (house) => {
      const updated = [house, ...recentlyViewed.filter(h => h.id !== house.id)].slice(0, 4);
      setRecentlyViewed(updated);
      localStorage.setItem('recentlyViewedHouses', JSON.stringify(updated));
    };
    
    return { recentlyViewed, addToRecentlyViewed };
  };
  
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  
  // Dark mode functionality
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(storedMode);
    
    if (storedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // View house details modal
  const [selectedHouse, setSelectedHouse] = useState(null);
  
  const viewHouseDetails = (house) => {
    setSelectedHouse(house);
    addToRecentlyViewed(house);
  };
  
  const closeModal = () => {
    setSelectedHouse(null);
  };
  
  return (
    <div className={`p-4 lg:p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen transition-colors duration-300`}>
      {/* Header and Navigation */}
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Paying Guest Accomodation Near Your College
      </h1>

      {/* Hero Section */}
<div className="max-w-6xl mx-auto bg-gradient-to-br from-orange-600 to-indigo-700 p-8 rounded-lg shadow-lg mb-8 text-white">
  <div className="flex flex-col items-center md:items-start">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">Find Your Perfect Stay</h2>
    <p className="text--100 mb-6">Browse from our collection of premium guest houses near your college</p>
    <div className="flex gap-3">
      <button 
        className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
        onClick={() => {
          // Set state to show featured guest houses
          setFilteredHouses(guestHouses.filter(house => house.rating >= 4.5).slice(0, 6));
          // Scroll to results
          window.scrollTo({
            top: document.querySelector('.max-w-6xl').offsetTop + 400,
            behavior: 'smooth'
          });
        }}
      >
        View Featured
      </button>
      
    </div>
  </div>
</div>
      
      {/* Search and filter bar */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    <button
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="flex items-center justify-center md:w-auto w-full px-5 py-3 bg-orange-50 text-blue-600 rounded-lg hover:bg-orange-100 transition-all duration-200 font-medium shadow-sm"
    >
      <FiFilter className="mr-2" />
      {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
    </button>
    
    <div className="w-full md:w-48">
      <Select
        options={sortOptions}
        value={sortOptions.find(option => option.value === sortOption)}
        onChange={(option) => setSortOption(option.value)}
        placeholder="Sort by"
        className="w-full"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '0.5rem',
            padding: '0.25rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            borderColor: '#e5e7eb'
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
            color: state.isSelected ? 'white' : '#374151'
          })
        }}
      />
    </div>
    
    <div className="flex gap-3 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2.5 rounded-lg transition-all duration-200 ${
          viewMode === "grid" 
            ? "bg-orange-600 text-white shadow-md" 
            : "bg-transparent text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="Grid view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2.5 rounded-lg transition-all duration-200 ${
          viewMode === "list" 
            ? "bg-orange-600 text-white shadow-md" 
            : "bg-transparent text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="List view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
        
        {/* Advanced filter section */}
        {isFilterOpen && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                <Select
                  options={colleges}
                  value={selectedCollege}
                  onChange={setSelectedCollege}
                  placeholder="Select your college"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    placeholder="Min"
                    className="w-1/2 p-2 rounded-md border border-gray-300"
                  />
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="Max"
                    className="w-1/2 p-2 rounded-md border border-gray-300"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender Preference</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300"
                >
                  <option value="">Any Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="wifi"
                    checked={amenityFilters.wifi}
                    onChange={() => handleAmenityChange("wifi")}
                    className="mr-2"
                  />
                  <label htmlFor="wifi" className="flex items-center text-sm">
                    <FiWifi className="mr-1" /> WiFi
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ac"
                    checked={amenityFilters.ac}
                    onChange={() => handleAmenityChange("ac")}
                    className="mr-2"
                  />
                  <label htmlFor="ac" className="flex items-center text-sm">
                    <TbAirConditioning className="mr-1" /> AC
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gym"
                    checked={amenityFilters.gym}
                    onChange={() => handleAmenityChange("gym")}
                    className="mr-2"
                  />
                  <label htmlFor="gym" className="flex items-center text-sm">
                    <BiDumbbell className="mr-1" /> Gym
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cctv"
                    checked={amenityFilters.cctv}
                    onChange={() => handleAmenityChange("cctv")}
                    className="mr-2"
                  />
                  <label htmlFor="cctv" className="flex items-center text-sm">
                    <BiCctv className="mr-1" /> CCTV
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    checked={amenityFilters.parking}
                    onChange={() => handleAmenityChange("parking")}
                    className="mr-2"
                  />
                  <label htmlFor="parking" className="flex items-center text-sm">
                    <TbParking className="mr-1" /> Parking
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="kitchen"
                    checked={amenityFilters.kitchen}
                    onChange={() => handleAmenityChange("kitchen")}
                    className="mr-2"
                  />
                  <label htmlFor="kitchen" className="flex items-center text-sm">
                    <TbToolsKitchen className="mr-1" /> Kitchen
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="restaurant"
                    checked={amenityFilters.restaurant}
                    onChange={() => handleAmenityChange("restaurant")}
                    className="mr-2"
                  />
                  <label htmlFor="restaurant" className="flex items-center text-sm">
                    <IoMdRestaurant className="mr-1" /> Mess
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Reset Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {filteredHouses.length > 0 ? (
        <>
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results ({filteredHouses.length})</h2>
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredHouses.length)} of {filteredHouses.length}
              </div>
            </div>
            {renderByCategory()}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button
                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </>
      ) : selectedCollege || minBudget || maxBudget || gender || Object.values(amenityFilters).some(val => val) || searchQuery ? (
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-md">
          <img 
            src="https://example.com/no-results.svg" 
            alt="No results found" 
            className="w-32 h-32 mx-auto mb-4" 
          />
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any guest houses matching your criteria. Try adjusting your filters or search query.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Featured Guest Houses Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Paying Guests</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guestHouses.slice(0, 3).map(house => renderGridItem(house))}
            </div>
          </section>
          
          {/* Quick Filters */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Quick Filters</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colleges.map(college => (
                <button
                  key={college.value}
                  onClick={() => {
                    setSelectedCollege(college);
                    handleSearch();
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <FiHome className="text-blue-600 text-2xl mb-2" />
                  <span>Near {college.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setAmenityFilters({...amenityFilters, wifi: true});
                  handleSearch();
                }}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <FiWifi className="text-blue-600 text-2xl mb-2" />
                <span>With WiFi</span>
              </button>
            </div>
          </section>
          
          {/* Search Instructions */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Find Your Perfect Guest House</h3>
            <p className="text-gray-600 mb-4">
              Use the filters above to find guest houses that match your preferences.
            </p>
            
          </div>
        </div>
      )}
      
      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {recentlyViewed.map(house => (
              <div 
                key={house.id}
                onClick={() => viewHouseDetails(house)}
                className="bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-medium text-base truncate">{house.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{house.price}₹/night</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer */}
      
      
      {/* House Details Modal */}
      {selectedHouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`relative w-full max-w-4xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-h-90vh overflow-y-auto`}>
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4">
                <img
                  src={selectedHouse.image}
                  alt={selectedHouse.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <img src={selectedHouse.image} alt="" className="w-full h-16 object-cover rounded-lg" />
                  <img src={selectedHouse.image} alt="" className="w-full h-16 object-cover rounded-lg" />
                  <img src={selectedHouse.image} alt="" className="w-full h-16 object-cover rounded-lg" />
                  <img src={selectedHouse.image} alt="" className="w-full h-16 object-cover rounded-lg" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">{selectedHouse.name}</h2>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span>{selectedHouse.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({selectedHouse.reviewCount})</span>
                  </div>
                </div>
                
                <p className="text-lg mt-2 flex items-center">
                  <FiMapPin className="mr-2 text-blue-600" />
                  {selectedHouse.location}
                </p>
                
                <p className="mt-2 text-xl">
                  <span className="font-bold">₹{selectedHouse.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/night</span>
                </p>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedHouse.details}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedHouse.amenities).map(([key, value]) => {
                      if (!value) return null;
                      let icon;
                      switch (key) {
                        case "wifi": icon = <FiWifi />; break;
                        case "ac": icon = <TbAirConditioning />; break;
                        case "gym": icon = <BiDumbbell />; break;
                        case "cctv": icon = <BiCctv />; break;
                        case "parking": icon = <TbParking />; break;
                        case "kitchen": icon = <TbToolsKitchen />; break;
                        case "restaurant": icon = <IoMdRestaurant />; break;
                        default: icon = <FiCheck />;
                      }
                      return (
                        <div key={key} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="mr-2 text-blue-600">{icon}</span>
                          <span className="capitalize">{key}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center mb-2">
                    <FiUser className="mr-2" /> {selectedHouse.owner}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center">
                    <FiPhone className="mr-2" /> {selectedHouse.number}
                  </p>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
                    Book Now
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedHouse.id)}
                    className="p-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100dark:hover:bg-gray-700"
                  >
                    <FiHeart
                      className={`${
                        favorites.includes(selectedHouse.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestHouses;