import Post from "./Post";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./Cookies";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("All Users");
  const jwtToken = getCookie("jwtToken");

  const handleSelection = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }, [jwtToken]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL_USERS, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err.response?.data?.message);
      });
  }, [jwtToken]);

  const Posts = data.filter((posts) => {
    if (selected === "All Users") {
      return posts;
    } else {
      return posts.Posted_By === selected;
    }
  });

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-main">
        {/* Header Section */}
        <div className="home-header">
          <div className="home-header-content">
            <h1 className="home-title">Discover Quiet Places</h1>
            <p className="home-subtitle">
              Explore peaceful spots shared by fellow introverts
            </p>
          </div>

          <div className="home-actions">
            <Link to="/createPlace" className="home-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Place
            </Link>

            <div className="home-filter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <select
                className="home-select"
                value={selected}
                onChange={handleSelection}
              >
                <option value="All Users">All Users</option>
                {users &&
                  users.map((user) => (
                    <option value={user.username} key={user._id}>
                      {user.username}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {Posts && Posts.length > 0 ? (
            Posts.map((post) => <Post {...post} key={post._id} />)
          ) : (
            <div className="home-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p>No places found. Be the first to share a quiet spot!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
