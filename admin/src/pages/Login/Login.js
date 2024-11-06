import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../Api/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const { login, register } = useContext(ApiContext);
  const [loginData, setLoginData] = useState({ us_email: "", us_password: "" });
  const [registerData, setRegisterData] = useState({
    us_name: "",
    us_phone_number: "",
    us_email: "",
    us_password: "",
    us_address: ""
  });
  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Redirect to home if token exists
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData);
    if (result.success) {
      setMessage("Login successful!");
      navigate("/"); 
      toast.success('berhasil login');
    } else {
      setMessage(result.message || "Login failed, please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(registerData);
    if (result.success) {
      setMessage("Registration successful!");
      setActiveTab("login"); // Optionally switch to login tab after registration
    } else {
      setMessage(result.message || "Registration failed, please try again.");
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
    setMessage(""); // Clear message when switching tabs
  };

  return (
    <div className="container-sm p-5 border" style={{ maxWidth: "700px" }}>
      <ul className="nav nav-pills nav-justified mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => toggleTab("login")}
            role="tab"
            aria-selected={activeTab === "login"}
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => toggleTab("register")}
            role="tab"
            aria-selected={activeTab === "register"}
          >
            Register
          </button>
        </li>
      </ul>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="tab-content">
        {activeTab === "login" && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  id="loginEmail"
                  name="us_email"
                  className="form-control"
                  value={loginData.us_email}
                  onChange={handleLoginInputChange}
                />
                <label htmlFor="loginEmail">Email</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  name="us_password"
                  className="form-control"
                  value={loginData.us_password}
                  onChange={handleLoginInputChange}
                />
                <label htmlFor="loginPassword">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </form>
          </div>
        )}

        {activeTab === "register" && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleRegister}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  id="registerName"
                  name="us_name"
                  className="form-control"
                  value={registerData.us_name}
                  onChange={handleRegisterInputChange}
                />
                <label htmlFor="registerName">Name</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="number"
                  id="registerPhoneNumber"
                  name="us_phone_number"
                  className="form-control"
                  value={registerData.us_phone_number}
                  onChange={handleRegisterInputChange}
                />
                <label htmlFor="registerPhoneNumber">Phone Number</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  name="us_email"
                  className="form-control"
                  value={registerData.us_email}
                  onChange={handleRegisterInputChange}
                />
                <label htmlFor="registerEmail">Email</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  name="us_password"
                  className="form-control"
                  value={registerData.us_password}
                  onChange={handleRegisterInputChange}
                />
                <label htmlFor="registerPassword">Password</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  id="address"
                  name="us_address"
                  className="form-control"
                  value={registerData.us_address}
                  onChange={handleRegisterInputChange}
                />
                <label htmlFor="address">Address</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-3">
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
