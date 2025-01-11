import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen } from 'react-icons/fa';
import axiosInstance from '../Utils/AxioaInstance';
import { PieChart } from '@mui/x-charts/PieChart';
import  handleAsync  from '../Utils/HandleAsync';
import OutsideClickHandler from 'react-outside-click-handler';

function Home() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [viewEditCategory, setViewEditCategory] = useState(false);
  const [categoryData, setCategoryData] = useState({
      name: '',
      // description: '',
  });
  const [isopen, setOpen] = useState(false);
  
  // Data for PieChart
  const data = [
    { label: 'Total Users', value: users },
    { label: 'Total Products', value: products },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user and product counts
        const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
          axiosInstance.get('admin/viewusers'),
          axiosInstance.get('/all'),
          axiosInstance.get('/admin/category'),
        ]);
  
        setUsers(usersResponse.data.totalUsers);
        setProducts(productsResponse.data.totalPosts);
        setCategories(categoriesResponse.data.category);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleOpen = (id) => {
    if (id) {
      setOpenCategoryId((prevId) => (prevId === id ? null : id));
      setOpen(true);
    }
  };
  
  const handleEdit = async (id) => {
    setViewEditCategory((prev) => !prev);
    try {
      const response = await axiosInstance.get(`admin/categorybyid/${id}`);
      setCategoryData(response.data.category);
      setOpen(false)

    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async () => {
    setViewEditCategory(false);
  
    const updatedData = {};
    Object.keys(categoryData).forEach((key) => {
      if (categoryData[key] !== '' && categoryData[key] !== undefined) {
          if (key !== '_id' && key !== '__v') { 
              updatedData[key] = categoryData[key];
          }
      }
  });
  
    try {
      const response = await axiosInstance.put(`admin/updatecategory/${categoryData._id}`, updatedData);
      if (response.status >= 200 && response.status < 300) {
        setCategories((prevCate) =>
          prevCate.map((b) =>
            b._id === response.data.updatedCategory._id ? response.data.updatedCategory : b
          )
        );
      }
      setOpen(false)
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category. Please try again.');
    }
  };
  
  
  const handleDelete = handleAsync(async (id) => {
    try {
      const response = await axiosInstance.delete(`admin/deletecategory/${id}`);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.boardId);
  
  
        setCategories((prevBoards) =>
          prevBoards.filter((b) => b._id !== response.data.boardId)
        );
      }
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete board. Please try again.');
    }
  });
  
  return (
    <>
    <div className="min-h-screen lg:ml-60 sm:px-6 sm:ml-0 lg:px-8">

        <div className="flex flex-wrap justify-center mt-10 gap-6">
          <div className="flex w-full sm:w-[250px] lg:w-[250px] bg-blue-100 items-center p-6 bg-white shadow-md rounded-md">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaBoxOpen size={30} style={{ color: 'dodgerblue' }} />
            </div>
            <div>
              <p className="text-xl font-medium text-gray-800">{products}</p>
              <p className="text-sm text-gray-500">Total Posts</p>
            </div>
          </div>
          <div className="flex w-full sm:w-[250px] lg:w-[250px] bg-blue-100 items-center p-6 bg-white shadow-md rounded-md">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaUsers size={30} style={{ color: 'dodgerblue' }} />
            </div>
            <div>
              <p className="text-xl font-medium text-gray-800">{users}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 items-center justify-center">
          <div className="w-full h-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
            <PieChart
              series={[
                {
                  data,
                  innerRadius: 50,
                  outerRadius: 120,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: '50%',
                  cy: '50%',
                },
              ]}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-10">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((data) => (
            <div key={data._id} className="p-4 flex space-x-5 bg-gray-100 rounded shadow hover:shadow-md">
               {viewEditCategory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
                {/* Backdrop */}
                {/* <OutsideClickHandler onOutsideClick={() => setViewEditCategory(false)}> */}
                  {/* Modal */}
                  <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 md:p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Edit the category</h2>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => setViewEditCategory(false)}
                      >
                        &times;
                      </button>
                    </div>
            
                    {/* Content */}
                    <div className="space-y-4">
            
                      {/* Name Input */}
                      <div>
                        <label
                          htmlFor="boardName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          id="boardName"
                          type="text"
                          name="name"
                          value={categoryData.name || ""}
                          onChange={handleChange}
                          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Board name"
                        />
                      </div>
            
                    </div>
            
                    {/* Footer */}
                    <div className="mt-6 flex space-x-2 justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={()=>handleDelete(data)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={handleSubmit}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                {/* </OutsideClickHandler> */}
              </div>
            )}
              <h3 className="text-lg font-semibold text-gray-700">{data.name}</h3>
              <button
                className=" hover:bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleOpen(data._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
              </button>
             
              <div>
      {isopen && openCategoryId === data._id && (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
          <div className="absolute w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleEdit(data._id)}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleDelete(data._id)}
            >
              Delete
            </button>
          </div>
        </OutsideClickHandler>
      )}
    </div>
           
            
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
