import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Star, Heart, Search } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary-600" />,
      title: 'Smart Search',
      description: 'Find colleges with advanced filters and search capabilities',
    },
    {
      icon: <Star className="h-8 w-8 text-primary-600" />,
      title: 'Reviews & Ratings',
      description: 'Read authentic reviews from students and share your experience',
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: 'Save Favorites',
      description: 'Create your wishlist and compare colleges side by side',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream College
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Discover top colleges across India with comprehensive information, reviews, and comparisons. Make informed decisions for your future.
            </p>
            <button
              onClick={() => navigate('/colleges')}
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to make the right college choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Colleges Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10k+</div>
              <div className="text-gray-600 dark:text-gray-400">Student Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect College?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start exploring our comprehensive college database today
          </p>
          <button
            onClick={() => navigate('/colleges')}
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Browse Colleges
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
