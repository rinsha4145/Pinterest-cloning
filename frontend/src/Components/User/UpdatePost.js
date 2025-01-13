import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/AxioaInstance"; // Replace with your actual axios instance
import { useNavigate } from "react-router-dom";

const UpdatePost = ({id, setShowEdit }) => {
  console.log(id)
  const navigate = useNavigate();
 const [post, setPost] = useState({
     title:'',description: '',
     link: '',category:'',
     tags:[],image:''});
  const [categories, setCategories] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/post/${id}`);
        setPost(response.data.onepost);
        console.log(post)
        setImagePreview(post.image); // Assuming the response contains an image URL
      } catch (error) {
        console.error("Failed to fetch post:", error);
        alert("Error fetching post data");
      }
    };

    fetchPost();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/admin/category"); // Replace with your API endpoint
        setCategories(response.data.category || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageUploaded(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (isImageUploaded && typeof isImageUploaded !== "boolean") {
        formData.append("image", isImageUploaded);
      }

      Object.entries(post).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axiosInstance.put(`/posts/${id}`, formData);
      if (response.status === 200) {
        alert("Post updated successfully!");
        navigate("/posts");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Error updating post");
    }
  };

  return (
      <>
<div className="p-6 bg-white rounded-lg w-full shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-300 px-4 ">
      <h1 className="text-lg font-semibold">Edit Pin</h1>
      {/* <p className="hidden md:block text-gray-500 text-sm">Changes stored!</p> */}
      <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300" onClick={handleSubmit}>
        Update
      </button>
    </div>
  <div className="flex text-black flex-col lg:flex-row w-full h-screen p-6">
    {/* Left Section: Upload Image */}
    <div className="lg:w-1/3 flex flex-col items-center p-4 bg-white" >
      <div
        className={`flex flex-col justify-center items-center w-[400px] h-[400px] border-2  ${isImageUploaded ? "" : "border-gray-300 bg-gray-100"} rounded-lg`}
        style={{
          backgroundImage:{imagePreview},
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          
        }}
        
      >
        <div className="flex flex-col items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className=" object-cover rounded-lg"
             
            />
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
              </svg>
              <p className="mt-2  text-sm font-medium text-center">Choose a file or drag and drop<br/> it here</p>
              <p className=" text-xs text-center ">
                We recommend using high-quality .jpg files less<br/> than 20MB or .mp4 files less than 200MB.
              </p>
        <input
          type="file"
          id="file-input"
          // ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
            </>
          )}
        </div>

        
      </div>
    </div>

    {/* Right Section: Form */}
    <div className="lg:w-2/3 flex flex-col p-4 bg-white lg:ml-8">
      <div className="w-full flex flex-col">
        <form className='flex flex-col space-y-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Add a title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Add a detailed description"
              value={post.description}
              name="description"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              value={post.link}
              name="link"
              onChange={handleChange}
              placeholder="Add a link"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
  name="category"
  required
  value={post.category.name}
  onChange={handleChange} // Updates the post state correctly
  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
>
  <option value="">Choose a category</option> {/* Default placeholder option */}
  {categories.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
</select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tagged topics</label>
            <input
              type="text"
              name="tags"
              value={post.tags}
              onChange={handleChange}
              placeholder="Search for a tag"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
       

     
    </form>
      </div>
      
    </div>
  </div>
  </div>
</>
  );
};

export default UpdatePost;
