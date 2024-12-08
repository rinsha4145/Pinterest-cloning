// Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/PostSlice';
import './Home.css'
const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
//post fetching
  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        dispatch(setPosts(data));
      })
      
  }, []);
  return (
    <>
    <div className="container">
    {posts.map((post) => (
        <div className='box' key={post._id}><img src={post.image} alt={post.title}></img></div>
    ))}
    </div>
    </>
  );
};

export default Home;
