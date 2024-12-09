// Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../Redux/PostSlice';
import './Home.css'
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
//post fetching
useEffect(() => {
  const fetchData = handleAsync(async () => {
      const response = await axiosInstance.get('/allposts');
      dispatch(setPosts(response.data)); // Use response.data to access the posts
  });

  fetchData();
}, [dispatch]);
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
