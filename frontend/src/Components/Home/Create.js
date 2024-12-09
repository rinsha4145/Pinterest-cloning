import React, { useRef, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";

const Create = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsImageUploaded(true);
    }
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
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen p-6">
      <div  className="flex flex-col ">
        <div class="flex items-center justify-between w-full border-b border-gray-300 px-4 py-2">
  <h1 class="text-lg font-semibold">Create Pin</h1>

  <p class="hidden md:block text-gray-500 text-sm">Changes stored!</p>

  <button class="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 focus:ring focus:ring-red-300">
    Publish
  </button>
</div>
      {/* Left Section: Upload Image */}
      <div className="lg:w-1/3 flex flex-col items-center p-4 bg-white">
        
        <div
          className={`flex flex-col justify-center items-center w-full h-80 border-2 border-dashed ${
            isImageUploaded ? "border-green-500 bg-green-100" : "border-gray-300 bg-gray-100"
          } rounded-lg`}
        >
          <input
            type="file"
            onChange={handleFileUpload}
            className="opacity-0 absolute w-full h-full cursor-pointer"
          />
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4-4m0 0l4-4m-4 4v12M20 16l-4-4m0 0l-4-4m4 4v12"
              />
            </svg>
            <p className="mt-2 text-gray-600 text-sm font-medium">
              Choose a file or drag and drop it here
            </p>
            <p className="text-gray-400 text-xs mt-1">
              We recommend using high-quality .jpg files less than 20MB or .mp4 files less than 200MB.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="lg:w-2/3 flex h-full flex-col mt-6 lg:mt-0 lg:ml-8 p-4 bg-white">
        <form
          className={`flex flex-col space-y-4 ${
            isImageUploaded ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
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
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
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
        </form>

        {/* More Options */}
        <div className="p-4 md:p-6 lg:p-8 bg-white">
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span>More options</span>
              <span className="transform rotate-180">▲</span>
            </button>
          </div>
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
        </div>
      </div>
</div>

    </div>
  );
};

export default Create;