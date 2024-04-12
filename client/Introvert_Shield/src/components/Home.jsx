import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./Cookies";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const jwtToken = getCookie("jwtToken");


  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);
  function handleLogout() {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername("");
    navigate("/");
  }
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL ,{
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  },[]);

  return (
    <div>
      <div>
        <div className="nav">
          <h1>{username}</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>

        <button className="posts">
          <Link to="/createPlace">Create PLace</Link>
        </button>
      </div>
      <div className="posts-container">
        {data && data.map((post) => <Post {...post} key={post._id} />)}
      </div>
    </div>
  );
}

export default Home;
