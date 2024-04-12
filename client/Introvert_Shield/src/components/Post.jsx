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
  _id
})
{
  const jwtToken = getCookie("jwtToken");

  const handleDelete = (id) => {
    axios.delete(import.meta.env.VITE_API_URL + id, {
      headers: { authorization: `Bearer ${jwtToken}` },
    })
    .then(() => window.location.reload())
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="post">
        <h1 className="post-title">Place Type: {Place_Type}</h1>
        <img className="post-image" src={Image_Link} alt="" />
        <h2 className="post-subtitle">Crowd Density: {Crowd_Density}</h2>
        <p className="post-detail">Seating Comfort: {Seating_Comfort}</p>
        <p className="post-detail">Wi-Fi Availability: {WiFi_Availability}</p>
        <p className="post-meta">Posted by: {Posted_By}</p>
        <div>
          <Link to={`/UpdatePlace/${_id}`}><button>Update</button></Link>
          <button onClick={()=>handleDelete(_id)}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default Post;
