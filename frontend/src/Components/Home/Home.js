// Home.js
import React from 'react';

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{post.category}</p>
              <p className="text-sm text-gray-700 mt-2 truncate">{post.description}</p>
            </div>
            <div className="p-4 flex justify-between items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Like</button>
              <span className="text-gray-500 text-sm">{post.likesCount} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
