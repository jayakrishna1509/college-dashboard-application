import { useState, useEffect } from 'react';
import { Heart, MapPin, BookOpen, IndianRupee, X } from 'lucide-react';
import { getFavorites, removeFromFavorites } from '../utils/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (collegeId) => {
    try {
      await removeFromFavorites(collegeId);
      setFavorites(favorites.filter(fav => fav.collegeId._id !== collegeId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      setError('Failed to remove from favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-500 fill-red-500" />
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Colleges you've saved for later
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="card p-12 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Favorites Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start exploring colleges and add them to your favorites!
            </p>
            <a
              href="/colleges"
              className="btn-primary inline-flex items-center"
            >
              Browse Colleges
            </a>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'college' : 'colleges'} in your favorites
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => {
                const college = favorite.collegeId;
                if (!college) return null;
                
                return (
                  <div key={favorite._id} className="card p-6 hover:transform hover:scale-105 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1 pr-2">
                        {college.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveFavorite(college._id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors group"
                        title="Remove from favorites"
                      >
                        <X className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{college.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{college.course}</span>
                      </div>

                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold">
                        <IndianRupee className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{college.fee.toLocaleString('en-IN')}/year</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleRemoveFavorite(college._id)}
                        className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
