// Sidebar.js
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../Api/API';

const Sidebar = () => {
    const {token} = useContext(ApiContext);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() =>{
        if(token){
            setShowSidebar(true);
        }else{
            setShowSidebar(false);
        }
    }, [token]);

    if(!showSidebar){
        return null;
    }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto col-md-3 col-xl-11 px-sm-2 px-0 bg-light">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <a href="/" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/categories" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-tags"></i> <span className="ms-1 d-none d-sm-inline">Categories</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/orders" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
                </a>
              </li>
            </ul>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
