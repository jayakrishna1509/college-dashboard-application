import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import Reviews from './pages/Reviews';
import Favorites from './pages/Favorites';
import Logout from './pages/Logout';

function App() {
  return (
    <ThemeProvider>
      <Router future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges/*" element={<Colleges />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;