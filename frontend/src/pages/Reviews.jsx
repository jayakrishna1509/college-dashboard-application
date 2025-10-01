import { useState, useEffect } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
import { getReviews, addReview } from "../utils/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    collegeName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.collegeName || !formData.comment) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await addReview(formData);

      setSuccess("Review submitted successfully!");
      setFormData({
        collegeName: "",
        rating: 5,
        comment: "",
      });

      fetchReviews();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience and read what others have to say
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Review Form */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Send className="h-6 w-6 mr-2 text-primary-600" />
              Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div>
                <label
                  htmlFor="collegeName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  College Name *
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="Enter College Name"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Rating *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    {renderStars(formData.rating)}
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      {formData.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Share your experience"
                  rows="4"
                  className="input-field resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-primary-600" />
              Recent Reviews
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="card p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div key={review._id} className="card p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {review.collegeName}
                      </h3>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {review.comment}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
