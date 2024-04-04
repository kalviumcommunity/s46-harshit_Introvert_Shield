import "./Post.css";

function Post({
  Crowd_Density,
  Image_Link,
  Place_Type,
  Seating_Comfort,
  WiFi_Availability,
}) {
  return (
    <>
      <div className="post">
        <h1 className="post-title">Place Type: {Place_Type}</h1>
        <img className="post-image" src={Image_Link} alt="" />
        <h2 className="post-subtitle">Crowd Density: {Crowd_Density}</h2>
        <p className="post-detail">Seating Comfort: {Seating_Comfort}</p>
        <p className="post-detail">Wi-Fi Availability: {WiFi_Availability}</p>
        <p className="post-meta">Posted by Qwerty</p>
      </div>
    </>
  );
}

export default Post;
