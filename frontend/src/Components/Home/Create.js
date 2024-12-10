import React, { useRef, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";

const Create = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [show, setShow] = useState(false);

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setIsImageUploaded(true);        // Set the image upload flag
        setImagePreview(reader.result);  // Set the image preview URL
      };
  
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };
  const handleToggle= (e)=>{
    e.preventDefault()
    setShow((prev) => !prev);
  }
  

    const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    title:'',productName: '',
    price: '',actualPrice:'',
    productDescription: '',category: '',
  });

  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({...prevProduct,[name]: value,}));
  };

  //submit the form
  const handleSubmit = handleAsync(async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    Object.keys(product).forEach((key) => {formData.append(key, product[key]);});
    const response = await axiosInstance.post('admin/addproduct', formData)
    if (response.status === 200 && response.status < 300) {
      alert('Product added successfully', response.data);
      setProduct(null);
      setImage(null);
      navigate('/products');
    }else {
      throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
    }
  });
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    // addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };
  return <>
  <div className="flex items-center justify-between w-full border-b border-gray-300 px-4 py-2">
      <h1 className="text-lg font-semibold">Create Pin</h1>
      {/* <p className="hidden md:block text-gray-500 text-sm">Changes stored!</p> */}
      <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300">
        Publish
      </button>
    </div>
  <div className="flex flex-col lg:flex-row w-full h-screen p-6">
    {/* Left Section: Upload Image */}
    <div className="lg:w-1/3 flex flex-col items-center p-4 bg-white" onClick={() => document.getElementById('file-input').click()}>
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
              className="h-full object-cover rounded-lg"
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
          onChange={handleFileUpload}
          className="hidden"
        />
            </>
          )}
        </div>

        {/* File input trigger button */}
        
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
              placeholder="Add a title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Add a detailed description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              placeholder="Add a link"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Board</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Choose a board</option>
              <option>Board 1</option>
              <option>Board 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tagged topics</label>
            <input
              type="text"
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

      {/* Conditionally render this section based on isOpen state */}
      {show && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-gray-800 font-medium">Allow people to comment</label>
            <input type="checkbox" className="toggle-switch" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-800 font-medium">Show similar products</label>
              <input type="checkbox" className="toggle-switch" />
            </div>
            <p className="text-sm text-gray-500">
              People can shop for products similar to what's shown in this Pin using visual search.
              Shopping recommendations aren't available for Idea ads and Pins with tagged products or paid partnership labels.
            </p>
          </div>
        </div>
      )}
    </div>
    </form>
      </div>
      
    </div>
  </div>
</>

};

export default Create;