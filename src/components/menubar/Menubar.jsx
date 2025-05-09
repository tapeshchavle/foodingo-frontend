import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import './menubar.css';

const Menubar = () => {
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const count = Object.values(quantities).filter(qty => qty > 0).length;

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setQuantities(0);
    navigate('/');
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-2 pb-2">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <i className="bi bi-box me-2 text-primary"></i> Foodingo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={isActive("/home") ? "nav-link fw-bold active" : "nav-link"}
                  to={"/home"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isActive("/explore-foods") ? "nav-link fw-bold active" : "nav-link"}
                  to={"/explore-foods"}
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isActive("/contact") ? "nav-link fw-bold active" : "nav-link"}
                  to={"/contact"}
                >
                  Contact Us
                </Link>
              </li>
              {
                localStorage.getItem('token') &&
                <li className="nav-item">
                  <Link
                    className={location.pathname.startsWith("/myorders") ? "nav-link fw-bold active" : "nav-link"}
                    to={"/myorders"}
                  >
                    Orders
                  </Link>
                </li>
              }
            </ul>
            <div className="d-flex align-items-center gap-3 me-4">
              <Link to={"/cart"} type="button" className="btn p-0 position-relative">
                <i className="bi bi-cart3 fs-4 text-dark"></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.65rem",
                    padding: "4px 6px",
                    lineHeight: "1",
                  }}
                >
                  {count}
                </span>
              </Link>

              {
                (!localStorage.getItem('token')) ? (
                  <>
                    <button onClick={() => navigate('/login')} className="btn btn-outline-primary btn-sm">Login</button>
                    <button onClick={() => navigate('/register')} className="btn btn-primary btn-sm">Register</button>
                  </>
                ) : (
                  <button onClick={logout} className="btn btn-outline-primary btn-sm">Logout</button>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menubar;
