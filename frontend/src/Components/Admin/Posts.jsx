import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utils/AxioaInstance';
import handleAsync from '../Utils/HandleAsync';
import { toast } from 'react-toastify';
import OutsideClickHandler from 'react-outside-click-handler';

function Posts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of posts per page
  const [view, setView] = useState(false);
  const [category, setCategory] = useState({ name: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = handleAsync(async () => {
      try {
        const response = await axiosInstance.get('/all');
        setData(response.data.posts);

        const categoryResponse = await axiosInstance.get('/admin/category');
        setCategories([{ _id: 'all', name: 'All' }, ...categoryResponse.data.category]);

        // Set initial filteredData to show all posts
        setFilteredData(response.data.posts);
      } catch (error) {
        console.error('API error: ', error);
      }
    });
    fetchData();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === 'All') {
      setFilteredData(data);
    } else {
      try {
        const response = await axiosInstance.get(`/posts/${selectedCategory}`);
        setFilteredData(response.data.posts);
      
        setCurrentPage(1); // Reset to the first page when category changes
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    }
  };
  

  const handleDelete = handleAsync(async (id) => {
    if (window.confirm(`Are you sure you want to delete the product with ID ${id}?`)) {
      try {
        await axiosInstance.delete(`admin/deleteproduct/${id}`);
        setData((prevData) => prevData.filter((product) => product._id !== id));
        toast.success('Product deleted successfully');
        navigate('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('An error occurred while deleting the product');
      }
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await axiosInstance.post('/admin/addcategory', category);
      const newCategory = response.data.newCategory;
      setCategories((prev) => [...prev, newCategory]);
      setView(false);
      setCategory({ name: '' });
      toast.success('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  });

  return (
    <div className="min-h-screen lg:ml-60 sm:px-6 sm:ml-0 lg:px-8">
      <div className="flex flex-wrap items-center mb-6 space-x-4">
        <label htmlFor="category-filter" className="text-sm font-medium">
          Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
         className="focus:outline-none px-4 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] placeholder-gray-400 text-gray-900 text-base font-normal leading-relaxed border border-gray-300 justify-start items-center gap-2 inline-flex
          h-12 lg:w-64 w-full ">
        
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          onClick={() => setView(!view)}
        >
          Add Category
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Go Back
        </button>
        {view && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <OutsideClickHandler onOutsideClick={() => setView(false)}>
              <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add Category</h2>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setView(false)}
                  >
                    &times;
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="category-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={category.name}
                      name="name"
                      onChange={handleChange}
                      id="category-name"
                      className="mt-1 w-full h-10 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </OutsideClickHandler>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>There are no posts in this category.</p>
          </div>
        ) : (
          <table className="w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 border">
            <thead className="bg-gray-900">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-4 py-2">ID</th>
                <th className="font-semibold text-sm uppercase px-4 py-2">Image</th>
                <th className="font-semibold text-sm uppercase px-4 py-2">Category</th>
                <th className="font-semibold text-sm uppercase px-4 py-2">Title</th>
                <th className="font-semibold text-sm uppercase px-4 py-2">View</th>
                <th className="font-semibold text-sm uppercase px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((post) => (
                <tr key={post._id}>
                  <td className="px-4 py-2">{post._id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{post.category.name}</td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                      onClick={() => navigate(`/ViewProductDetails/${post._id}`)}
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Posts;
