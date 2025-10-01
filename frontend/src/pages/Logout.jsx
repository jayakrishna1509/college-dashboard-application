import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="card p-12 text-center max-w-md w-full">
        <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <LogOut className="h-10 w-10 text-primary-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          You Have Been Logged Out
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for using College Dashboard. Come back soon!
        </p>

        <button
          onClick={() => navigate('/')}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Home className="h-5 w-5" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Logout;
