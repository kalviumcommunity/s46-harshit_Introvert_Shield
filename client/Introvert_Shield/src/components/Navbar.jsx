import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./Cookies";
import "./Navbar.css";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left spacer for centering */}
        <div className="navbar-left"></div>

        {/* Center - Project Name */}
        <div className="navbar-center">
          <span className="navbar-brand">Introvert Shield</span>
        </div>

        {/* Right - User dropdown */}
        <div className="navbar-right" ref={dropdownRef}>
          <button
            className="navbar-user-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="navbar-avatar">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="navbar-username">{username || "User"}</span>
            <svg
              className={`navbar-chevron ${isDropdownOpen ? "open" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-item" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
