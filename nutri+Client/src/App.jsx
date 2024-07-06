// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import HomePage from './Pages/HomePage/HomePage';
import CustomDrawer from './Components/CustomDrawer/CustomDrawer';
import NutriCalc from './Pages/NutriCalc/NutriCalc';
import Recipe from './Pages/Recipe/Recipe';
import Shopping from './Pages/Shopping/Shopping';
import Meal from './Pages/Meal/Meal';
import Footer from './Components/Footer/Footer';
import { useSelector } from 'react-redux';
import CustomRoute from './Components/CustomRoute/CustomRoute';

function App() {
  const location = useLocation();
  const noDrawer = ['/', '/register'];
  const auth = useSelector((state) => state.auth);

  const shouldRenderDrawer = !noDrawer.includes(location.pathname);

  console.log('Current Path:', location.pathname);
  console.log('User Logged In:', auth.loggedIn);
  console.log('Should Render Drawer:', shouldRenderDrawer);

  return (
    <div className="app-container">
      {shouldRenderDrawer && auth.loggedIn && (
        <CustomDrawer list={['Share a Recipe', 'Plan a Meal', 'Shopping List', 'Nutritional Calculator', 'Logout']} links={["/recipe","/meal","/shopping","/nutrition","/"]} />
      )}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <CustomRoute
                element={<HomePage />}
              />
            }
          />
          <Route
            path="/nutrition"
            element={
              <CustomRoute
                element={<NutriCalc />}
              />
            }
          />
          <Route
            path="/recipe"
            element={
              <CustomRoute
                element={<Recipe />}
              />
            }
          />
          <Route
            path="/shopping"
            element={
              <CustomRoute
                element={<Shopping />}
              />
            }
          />
          <Route
            path="/meal"
            element={
              <CustomRoute
                element={<Meal />}
              />
            }
          />
          {/* Default route for unmatched paths */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
