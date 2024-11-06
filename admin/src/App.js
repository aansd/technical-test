import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Product from "./pages/Product/Product";
import Order from "./pages/Order/Order";
import Category from "./pages/Category/Category";
import Login from "./pages/Login/Login";
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile/Profile";

// Wrapper to protect routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <ToastContainer />
      
      
      {token && <AppNavbar />}

      <div className="container-fluid">
        <div className="row">
          
          {!location.pathname.startsWith("/login") && token && (
            <div className="col-2 px-0">
              <Sidebar />
            </div>
          )}
          
          <div className={location.pathname === "/login" ? "col-12 my-5" : "col-10 my-3"}>
            <Routes>
             
              <Route path="/" element={<PrivateRoute element={<Product />} />} />
              <Route path="/orders" element={<PrivateRoute element={<Order />} />} />
              <Route path="/categories" element={<PrivateRoute element={<Category />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile/>} />} />
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Login />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
