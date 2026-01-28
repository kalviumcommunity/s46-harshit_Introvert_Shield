/* eslint-disable react/prop-types */
import axios from "axios";
import "./Post.css";
import { Link } from "react-router-dom";
import { getCookie } from "./Cookies";

function Post({
  Crowd_Density,
  Image_Link,
  Place_Type,
  Seating_Comfort,
  WiFi_Availability,
  Posted_By,
  _id,
}) {
  const jwtToken = getCookie("jwtToken");
  const currentUser = getCookie("username");
  
  // Check if the current user is the owner of this post
  const isOwner = currentUser === Posted_By;

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this place?")) {
      return;
    }
    
    axios
      .delete(import.meta.env.VITE_API_URL + id, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then(() => window.location.reload())
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete");
      });
  };

  return (
    <div className="post-card">
      {Image_Link && (
        <img className="post-image" src={Image_Link} alt={Place_Type} />
      )}

      <div className="post-content">
        <h2 className="post-title">{Place_Type}</h2>

        <div className="post-details">
          <div className="post-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Crowd: {Crowd_Density}</span>   
          </div>

          <div className="post-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>Seating: {Seating_Comfort}</span>
          </div>

          <div className="post-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <span>WiFi: {WiFi_Availability}</span>
          </div>
        </div>

        <div className="post-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Posted by {Posted_By}</span>
          {isOwner && <span className="post-owner-badge">You</span>}
        </div>
      </div>

      {/* Only show Edit/Delete buttons if the current user is the owner */}
      {isOwner && (
        <div className="post-actions">
          <Link to={`/UpdatePlace/${_id}`} className="post-btn edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </Link>
          <button className="post-btn delete" onClick={() => handleDelete(_id)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
