import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";

const UpdatePost = () => {
  const { postId } = useParams(); // Retrieve post ID from route params
  const [categories, setCategories] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [post, setPost] = useState({
    title: '',
    description: '',
    link: '',
    category: '',
    tag: '',
    image: '',
  });
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch post details and categories on mount
  useEffect(() => {
    const fetchPostAndCategories = handleAsync(async () => {
      const [categoriesResponse, postResponse] = await Promise.all([
        axiosInstance.get('/admin/category'),
        axiosInstance.get(`/posts/${postId}`) // Replace with your endpoint
      ]);
      setCategories(categoriesResponse.data.category);
      const fetchedPost = postResponse.data.post;
      setPost({
        title: fetchedPost.title || '',
        description: fetchedPost.description || '',
        link: fetchedPost.link || '',
        category: fetchedPost.category || '',
        tag: fetchedPost.tag || '',
        image: fetchedPost.image || '',
      });
      if (fetchedPost.image) {
        setImagePreview(fetchedPost.image); // Preview existing image
        setIsImageUploaded(true);
      }
    });

    fetchPostAndCategories();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsImageUploaded(file);
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (isImageUploaded && typeof isImageUploaded !== 'boolean') {
      formData.append('image', isImageUploaded);
    }
    Object.keys(post).forEach((key) => {
      if (post[key]) {
        formData.append(key, post[key]);
      }
    });

    try {
      const response = await axiosInstance.put(`/posts/${postId}`, formData); // Replace with your update endpoint
      if (response.status >= 200 && response.status < 300) {
        alert('Post updated successfully');
        navigate('/posts'); // Navigate to posts list or another page
      } else {
        throw new Error(response.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
      alert('Failed to update post. Please check the data and try again.');
    }
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
    if (imagePreview) {
      setImagePreview(null);
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full border-b border-gray-300 px-4 py-2">
        <h1 className="text-lg font-semibold">Update Post</h1>
        <button
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300"
        //   onClick={handleSubmit}
        >
          Update
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-full h-screen p-6">
        <div className="lg:w-1/3 flex flex-col items-center p-4 bg-white" >
          <div
            className={`flex flex-col justify-center items-center w-[400px] h-[400px] border-2 ${
              isImageUploaded ? '' : 'border-gray-300 bg-gray-100'
            } rounded-lg`}
            style={{
              backgroundImage: isImageUploaded ? `url(${imagePreview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="h-[100px] object-cover rounded-lg"
                />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-center">
                    Choose a file or drag and drop it here
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              id="file-input"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="lg:w-2/3 flex flex-col p-4 bg-white lg:ml-8">
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Update the title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Additional fields for description, link, category, and tag */}
            {/* Add the same structure for all input fields */}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
