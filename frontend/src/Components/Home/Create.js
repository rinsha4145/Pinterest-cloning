import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handleAsync from "../Utils/HandleAsync";
import axiosInstance from "../Utils/AxioaInstance";

const Create = () => {
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

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };
  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg">
            {filePrev && <img src={filePrev} alt="" />}
            <div
              className="flex flex-col items-center justify-center h-full cursor-pointer"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPlus />
              </div>
              <p className="text-gray-500">Choose a file</p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              we recomment using high quality .jpg files but less than 10mb
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form
              className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
              onSubmit={addPinHandler}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="common-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pin
                </label>
                <input
                  type="text"
                  id="pin"
                  className="common-input"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <button className="common-btn">Add+</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;