import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "./Cookies";
import "./Form.css";

function UpdatePlace() {
  const { id } = useParams();

  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [density, setDensity] = useState("");
  const [wifi, setWifi] = useState("");
  const [comfort, setComfort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const jwtToken = getCookie("jwtToken");
  const postedby = getCookie("username");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + id, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((data) => {
        setComfort(data.data.Seating_Comfort);
        setDensity(data.data.Crowd_Density);
        setImage(data.data.Image_Link);
        setPlace(data.data.Place_Type);
        setWifi(data.data.WiFi_Availability);
      });
  }, [id, jwtToken]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.patch(
        import.meta.env.VITE_API_URL + id,
        {
          Place_Type: place,
          Image_Link: image,
          Crowd_Density: density,
          Seating_Comfort: comfort,
          WiFi_Availability: wifi,
          Posted_By: postedby,
        },
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      );
      nav("/home");
    } catch (err) {
      console.error(err.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h1 className="form-title">Update Place</h1>
          <p className="form-subtitle">Edit the details of this location</p>
        </div>

        {/* Form */}
        <form className="form-body" onSubmit={handleUpdate}>
          {/* Place Name */}
          <div className="form-group">
            <label className="form-label">Place Name</label>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Quiet Coffee Shop"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>

          {/* Image Link */}
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="form-hint">Paste an image URL from the web</p>
          </div>

          {/* Crowd Density */}
          <div className="form-group">
            <label className="form-label">Crowd Density</label>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Low, Medium, High"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          {/* Seating Comfort */}
          <div className="form-group">
            <label className="form-label">Seating Comfort</label>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Comfortable, Moderate"
                value={comfort}
                onChange={(e) => setComfort(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
          </div>

          {/* WiFi */}
          <div className="form-group">
            <label className="form-label">WiFi Availability</label>
            <div className="form-input-wrapper">
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Available, Not Available"
                value={wifi}
                onChange={(e) => setWifi(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="form-footer">
            <Link to="/home" className="form-btn secondary">
              Cancel
            </Link>
            <button type="submit" className="form-btn primary" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Place"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePlace;
