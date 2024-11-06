import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../Api/API'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const AppNavbar = () => {
  const { token, logout, user, showUser } = useContext(ApiContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setShowNavbar(true); 
      showUser();
    } else {
      setShowNavbar(false); 
    }
  }, [token]);

  if (!showNavbar) {
    return null; 
  }

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token'); 
    navigate('/login'); 
    setShowNavbar(false);
      toast.success('berhasil logout');
  };
  return (
    <div>
      <nav class="navbar bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Admin Panel</a>
    <div class="dropdown ">
                    <a href="#" class="d-flex text-black align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="d-none d-sm-inline mx-1">Hi - {user?.us_name}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="/profile">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" onClick={handleLogout}>Sign out</a></li>
                    </ul>
                </div>
  </div>
</nav>
    </div>
  )
}

export default AppNavbar
