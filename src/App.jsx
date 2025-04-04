import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CuisinePage from './pages/CuisinePage';
import "react-toastify/dist/ReactToastify.css";
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import { useAuthStore } from './store/useAuthStore';
import Favorites from './pages/Favourites';
import CompleteProfile from './pages/completeProfile';
import Profile from './pages/Profile';
import Footer from './components/Footer';

const App = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={ <Signin /> }/>
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/recipe/:idMeal" element={<RecipeDetail />} />
        <Route path="/favorites" element={ <Favorites />}/>
        <Route path="/cuisine/:cuisine" element={<CuisinePage />} />

        <Route path="/completeprofile" element={<CompleteProfile /> } />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Signin /> } />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
