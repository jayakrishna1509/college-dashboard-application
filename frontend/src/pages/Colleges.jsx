import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  BookOpen,
  IndianRupee,
  X,
} from "lucide-react";
import {
  getColleges,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../utils/api";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    course: "",
    minFee: "",
    maxFee: "",
    sortBy: "",
  });

  const locations = ["Hyderabad", "Bangalore", "Chennai"];
  const courses = ["Computer Science", "Electronics", "MBA", "MBBS"];
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "fee-asc", label: "Fee: Low to High" },
    { value: "fee-desc", label: "Fee: High to Low" },
  ];

  useEffect(() => {
    fetchColleges();
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const data = await getColleges(filters);
      setColleges(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch colleges. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  const isFavorite = (collegeId) => {
    return favorites.some((fav) => fav.collegeId?._id === collegeId);
  };

  const handleToggleFavorite = async (college) => {
    try {
      if (isFavorite(college._id)) {
        await removeFromFavorites(college._id);
      } else {
        await addToFavorites(college._id);
      }
      fetchFavorites();
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      course: "",
      minFee: "",
      maxFee: "",
      sortBy: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((val) => val !== "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Colleges
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your perfect college with our advanced search and filters
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by college names"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Filter className="h-5 w-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="select-field"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Course
                  </label>
                  <select
                    value={filters.course}
                    onChange={(e) =>
                      handleFilterChange("course", e.target.value)
                    }
                    className="select-field"
                  >
                    <option value="">All Courses</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Min Fee (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={filters.minFee}
                    onChange={(e) =>
                      handleFilterChange("minFee", e.target.value)
                    }
                    className="input-field"
                  />
                </div>

                {/* Max Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Fee (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 200000"
                    value={filters.maxFee}
                    onChange={(e) =>
                      handleFilterChange("maxFee", e.target.value)
                    }
                    className="input-field"
                  />
                </div>
              </div>

              {/* Sort and Clear */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="select-field"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No colleges found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {colleges.length}{" "}
              {colleges.length === 1 ? "college" : "colleges"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <div
                  key={college._id}
                  className="card p-6 hover:transform hover:scale-105 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
                      {college.name}
                    </h3>
                    <button
                      onClick={() => handleToggleFavorite(college)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite(college._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{college.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span className="text-sm">{college.course}</span>
                    </div>

                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      <span>{college.fee.toLocaleString("en-IN")}/year</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Colleges;
