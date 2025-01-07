import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the CSS file
import { FaUsers, FaBoxOpen, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import axiosInstance from '../../AxiosIntance';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

function AdminPage() {
  const navigate = useNavigate();
  const [revenew, setRevenew] = useState(0);
  const [purchased, setPurchased] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  
  // Data for PieChart
  const data = [
    { label: 'Total Revenue', value: revenew },
    { label: 'Total Products Sold', value: purchased },
    { label: 'Total Users', value: users },
    { label: 'Total Products', value: products },
  ];

  const x1Labels = dailyRevenue?.map((item) => item.day) || [];
  const dailyData = dailyRevenue?.map((item) => item.revenew) || [];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total revenue and products purchased
        const revenueResponse = await axiosInstance.get('admin/totalrevenew');
        setRevenew(revenueResponse.data.revenew);

        const purchasedResponse = await axiosInstance.get('admin/totalpurchased');
        setPurchased(purchasedResponse.data.totalProductsPurchased);

        const usersResponse = await axiosInstance.get('admin/viewusers');
        setUsers(usersResponse.data.totalUsers);

        const productsResponse = await axiosInstance.get('admin/viewproducts');
        setProducts(productsResponse.data.totalProducts);

        // Fetch weekly data for revenue and product count
        const weeklyRevenueResponse = await axiosInstance.get('admin/getdailyandtotalrevenue');
        setDailyRevenue(weeklyRevenueResponse.data.dailyRevenue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap ml-[190px] mt-10 gap-[20px] lg:gap-[100px]">
        {/* Stats cards */}
        <div className="flex w-full sm:w-[250px] lg:w-[250px] h-[150px] bg-blue-100 items-center p-6 bg-white shadow-md rounded-md">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaClipboardList size={30} style={{ color: 'dodgerblue' }} />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-800">{purchased}</p>
            <p className="text-sm text-gray-500">Total Products Sold</p>
          </div>
        </div>
        <div className="flex w-full sm:w-[250px] lg:w-[250px] bg-blue-100 items-center p-6 bg-white shadow-md rounded-md">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaDollarSign size={29} style={{ color: 'dodgerblue' }} />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-800">₹{revenew}</p>
            <p className="text-sm text-gray-500">Total Profit</p>
          </div>
        </div>
        <div className="flex w-full sm:w-[250px] lg:w-[250px] bg-blue-100 items-center p-6 bg-white shadow-md rounded-md">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaBoxOpen size={30} style={{ color: 'dodgerblue' }} />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-800">{products}</p>
            <p className="text-sm text-gray-500">Total Product</p>
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

      {/* PieChart and LineChart */}
      <div className="mt-10 ml-[200px] flex flex-wrap gap-10 items-center justify-center lg:justify-start">
        {/* PieChart */}
        <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[500px] h-[400px]">
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
                cx: 150,
                cy: 150,
              },
            ]}
          />
        </div>

        {/* LineChart */}
        <div className="w-full sm:w-[400px] md:w-[500px] lg:w-[400px] h-[300px]">
          {dailyData.length > 0 ? (
            <LineChart
              width={400}
              height={300}
              series={[{ data: dailyData, label: 'Daily Revenue' }]}
              xAxis={[{ scaleType: 'point', data: x1Labels }]}
            />
          ) : (
            <p className="text-gray-500">No data available for the chart</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
