import React from 'react'
import "./Post.css";

function Post() {
  return (
  <>
  <div className="post">
    <h1 className="post-title">Place Type: Nightclub</h1>
    <img className="post-image" src="https://th.bing.com/th/id/R.7cacea38b0a5dda9b541ba24d3df04d5?rik=JUgTM…" alt="" />
    <h2 className="post-subtitle">Crowd Density: Very High</h2>
    <p className="post-detail">Seating Comfort: Uncomfortable</p>
    <p className="post-detail">Wi-Fi Availability: Limited</p>
    <p className="post-meta">Posted by Qwerty</p>
</div>
    </>

  )
}

export default Post
