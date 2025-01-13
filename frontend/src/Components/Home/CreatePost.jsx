import React, { useEffect, useRef, useState } from "react";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addPost } from "../Redux/PostSlice";
const Create = () => {
  const [categories,setCategories]=useState([]) //category
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Image upload state
  const [imagePreview, setImagePreview] = useState(null); // Image preview URL
  const [show, setShow] = useState(false);  // Show/hide more options
  const [post, setPost] = useState({
    title:'',description: '',
    link: '',category:'',
    tags:[],image:''});  // Post data

  const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  //fetch category
  useEffect(() => {
    const fetchData = handleAsync(async () => {
        const response = await axiosInstance.get('/admin/category');
        setCategories(response.data.category); 
    });
  
    fetchData();
  }, [categories.name]);

  //handle change
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  //handle file upload
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsImageUploaded(event.target.files[0]);   
        setImagePreview(reader.result);  // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  //toggle more options
  const handleToggle= (e)=>{
    e.preventDefault()
    setShow((prev) => !prev);
  }

  //submit the form
  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', isImageUploaded);
    formData.append('tags', JSON.stringify(post.tags)); // Send tags as JSON string
    Object.keys(post).forEach((key) => {
      if (post[key] && key !== 'tags') { // Exclude 'tags' since it's handled separately
        formData.append(key, post[key]);
      }
    });
  
    try {
      const response = await axiosInstance.post('/addpost', formData);
      if (response.status === 200 && response.status < 300) {
        alert('Post added successfully');
        dispatch(addPost(response.data.newPost))
        setImagePreview(null);
        setPost({
          title: '',description: '',
          link: '',category: '',
          tags: [],image: '',
        });
        setIsImageUploaded(false);
      } else {
        throw new Error(`Error: ${response.data.message || 'An unknown error occurred'}`);
      }
    } catch (error) {
      console.error('API error:', error.response ? error.response.data : error.message);
      toast.error('Failed to create post. Please check the data and try again.');
    }
  });

  //handle click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
    if (imagePreview) {
      setImagePreview(null)
    }
  };
 
  return( 
  <>
  <div className="flex items-center justify-between w-full border-b border-gray-300 px-4 py-2">
      <h1 className="text-lg font-semibold">Create Pin</h1>
      {/* <p className="hidden md:block text-gray-500 text-sm">Changes stored!</p> */}
      <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  <div className="flex flex-col lg:flex-row w-full h-screen p-6">
    {/* Left Section: Upload Image */}
    <div className="lg:w-1/3 flex flex-col items-center p-4 bg-white"  onClick={handleClick}>
      <div
        className={`flex flex-col justify-center items-center w-[400px] h-[400px] border-2  ${isImageUploaded ? "" : "border-gray-300 bg-gray-100"} rounded-lg`}
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
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
              </svg>
              <p className="mt-2  text-sm font-medium text-center">Choose a file or drag and drop<br/> it here</p>
              <p className=" text-xs text-center ">
                We recommend using high-quality .jpg files less<br/> than 20MB or .mp4 files less than 200MB.
              </p>
        <input
          type="file"
          id="file-input"
          ref={fileInputRef}
          onChange={handleFileUpload}
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
        <form className={`flex flex-col space-y-4 ${isImageUploaded ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
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
  value={post.category}
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
       

        {/* More Options */}
        <div className="p-4 md:p-6 lg:p-8 bg-white">
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleToggle}
        >More options
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>

      
    </div>
    </form>
      </div>
      
    </div>
  </div>
</>
  )

};

export default Create;