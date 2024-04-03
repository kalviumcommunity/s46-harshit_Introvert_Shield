import Post from './Post'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/introverts")

    .then((response) => {
      console.log(response.data)
      setData(response.data);
    })
    .catch((err) => {
      console.log(err)
    });

  },[])

  return (
    <div>
      <div className="posts-container">
        {data &&
          data.map((post) => (
            <Post
              {...post}
              key={post._id}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
