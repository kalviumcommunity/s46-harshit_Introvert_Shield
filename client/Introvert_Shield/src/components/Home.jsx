import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./Cookies";
import { Link, useNavigate } from "react-router-dom";


function Home() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("All Users")
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
  const handeSelection = (e) => {
    setSelected(e.target.value);
  };
  
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

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL_USERS, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setUsers(response.data)
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }, []);
  const Posts = data.filter((posts)=>{
    if(selected==='All Users'){
      return posts;
    }else{
      return posts.Posted_By===selected;
    }
  })
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
        <select name="users" className="select-container"  onChange={handeSelection}>
        <option value="All Users">All Users</option>
        {users &&
          users.map((user) => (
            <option value={user.username} className="options"  key={user._id}>{user.username}</option>
          ))}
      </select>
      </div>
      <div className="posts-container">
        {Posts && Posts.map((post) => <Post {...post} key={post._id} />)}
      </div>
    </div>
  );
}

export default Home;
