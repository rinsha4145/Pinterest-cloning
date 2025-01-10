import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/AxioaInstance";
import handleAsync from "../Utils/HandleAsync";
import {updatePost,deletePost} from '../Redux/PostSlice'
import {useDispatch} from 'react-redux'
const ReportedPosts = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [Open, setOpen] = useState(false); //view edit and delete of a comment
const [openReportId, setOpenReportId] = useState(null); //view edit and delete of a comment
const [filteredData, setFilteredData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1');
const dispatch = useDispatch();
  const fetchReportedPosts = async () => {
    try {
      const response = await axiosInstance.get("/admin/viewreports");
      console.log(response.data.reports);
      setReportedPosts(response.data.reports);
      setFilteredData(response.data.reports);
    } catch (error) {
      console.error("Error fetching reported posts:", error);
    }
  };
  useEffect(() => {
    const fetchDataWrapper = handleAsync(fetchReportedPosts);


    fetchDataWrapper();
  }, []);
  const handleOpen = (id) => {
    if(id){
    setOpenReportId((prevId) => (prevId === id ? null : id));
    setOpen((prev) => !prev); 
    fetchReportedPosts()
    
    }
  };
   //delete a comment
   const deletePost = async (id) => {
    const response = await axiosInstance.delete(`admin/deletepost/${id}`);
    console.log(response.data.deletedPost);
    setOpen(false);
    fetchReportedPosts()
    dispatch(deletePost(response.data.deletedPost));
};

const handleDismissReport = async (postId) => {
    console.log(postId)
   
      const response = await axiosInstance.post(`/admin/dismissreports/${postId}`);
      console.log('Reports dismissed successfully:', response.data.post);
    fetchReportedPosts()
    dispatch(updatePost(response.data.post));

    
    
  };

  const handleTimeFrameChange = (event) => {
    const timeFrame = event.target.value;
    setSelectedTimeFrame(timeFrame);

    let filteredReports;

    const now = new Date();

    switch (timeFrame) {
      case '1': // All Reports
      setFilteredData(reportedPosts);
        break;
      case '2': // Today
        filteredReports =reportedPosts.filter(report => {
          const reportedAt = new Date(report.reportedAt);
          return (
            reportedAt.getFullYear() === now.getFullYear() &&
            reportedAt.getMonth() === now.getMonth() &&
            reportedAt.getDate() === now.getDate()
          );
        });
        break;
      case '3': // A Week
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        filteredReports =reportedPosts.filter(report => {
          const reportedAt = new Date(report.reports.reportedAt);
          return reportedAt >= oneWeekAgo;
        });
        break;
      case '4': // A Month
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredReports =reportedPosts.filter(report => {
          const reportedAt = new Date(report.reportedAt).toLocaleDateString()
          return reportedAt >= oneMonthAgo;
        });
        break;
      default:
        filteredReports =reportedPosts;
    }

    setFilteredData(filteredReports);
  };

  if (reportedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">No reported posts found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-3 lg:ml-60 sm:px-6 sm:ml-0 lg:px-8">
    <style>
    {`
      select {
        text-indent: 1px;
        text-overflow: '';
        width: 50px;
        height: 50px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: transparent url(https://pagedone.io/asset/uploads/1716542745.png) no-repeat 94% center;
      }
    `}
  </style>                                   

<section className="py-24 relative">
    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-14 gap-10 inline-flex">
            <div className="w-full justify-between items-center gap-8 flex lg:flex-row flex-col">
                <h2 className="w-full text-gray-900 text-3xl font-bold font-manrope leading-normal">My Refunds</h2>
                <div className="w-full justify-end items-center gap-5 flex sm:flex-row flex-col">
                    <div className="relative lg:w-64 w-full ">
                        <select id="countries" className="focus:outline-none px-4 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] placeholder-gray-400 text-gray-900 text-base font-normal leading-relaxed border border-gray-300 justify-start items-center gap-2 inline-flex
                        h-12 lg:w-64 w-full " value={selectedTimeFrame}
                        onChange={handleTimeFrameChange}>
                            <option value="1" selected>All Reports</option>
                            <option value="2">Today</option>
                            <option value="3">A Week</option>
                            <option value="4">A Month</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full rounded-lg mb-5">
                {filteredData.map((post) => (
                    <tbody className="">
                        <tr className="bg-white">
                            <td className="pb-5 pr-8 flex items-center lg:gap-8 gap-3.5">
                                <img className="rounded-xl max-h-32 object-cover" src={post.image}
                                    alt="Long Lasting Perfume image"/>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-gray-500 text-lg font-medium leading-relaxed">{post._id}</h5>
                                    <h5 className="text-gray-900 text-lg font-semibold leading-relaxed">{post.title}</h5>
                                </div>
                                <td className="py-10 px-2.5">
                                <button
          onClick={() => handleOpen(post._id)}
          className="p-2 hover:bg-gray-100 transition-all duration-700 ease-in-out group flex item-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none">
                                        <path d="M12 16.9896V17.0396M12 11.976V12.026M12 6.96228V7.01228"
                                            stroke="black" stroke-width="2.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                {Open && openReportId === post._id && (
    <div className="absolute w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="border-t border-gray-200">
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleDismissReport(post._id)}
        >
          Dissmiss Report
        </button>
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => deletePost( post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  )}
                            </td>
                            </td>
                            {post.reports.map((report) => (
    <tr>
        <td className="p-8 whitespace-nowrap text-gray-500 text-base font-medium leading-relaxed">
            <span>{new Date(report.reportedAt).toLocaleDateString()}</span> <br />
            <span className="text-gray-900">{new Date(report.reportedAt).toLocaleTimeString()}</span>
        </td>
        <td className="p-8 whitespace-nowrap text-gray-900 text-base font-semibold leading-relaxed">
            Reason:
            <span className="text-gray-500 font-medium">{report.reason}</span>
           
        </td>
    </tr>
))}

                            {/* <td className="p-8">
                                <div
                                    className="w-fit mx-auto pl-2 pr-2.5 py-0.5 bg-indigo-50 rounded-full justify-center items-center gap-1 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12"
                                        viewBox="0 0 13 12" fill="none">
                                        <path
                                            d="M6.12428 5.49991V7.49991M3.46751 1.7063L3.38331 1.73815C2.93176 1.90893 2.70599 1.99432 2.50861 2.12922C2.31124 2.26411 2.14967 2.44345 1.82654 2.80212L1.76562 2.86973M8.62382 1.7063L8.70802 1.73815C9.15957 1.90893 9.38534 1.99432 9.58271 2.12922C9.78009 2.26411 9.94166 2.44345 10.2648 2.80212L10.3257 2.86973M6.12428 10.4999C5.65986 10.4999 5.42765 10.4999 5.2327 10.4742C3.8865 10.297 2.82717 9.23769 2.64994 7.89149C2.62428 7.69655 2.62428 7.46433 2.62428 6.99991V6.49991C2.62428 6.03549 2.62428 5.80328 2.64994 5.60834C2.82717 4.26214 3.8865 3.20281 5.2327 3.02558C5.42765 2.99991 5.65986 2.99991 6.12428 2.99991C6.5887 2.99991 6.82091 2.99991 7.01586 3.02558C8.36206 3.20281 9.42138 4.26214 9.59861 5.60834C9.62428 5.80328 9.62428 6.03549 9.62428 6.49991V6.99991C9.62428 7.46433 9.62428 7.69655 9.59861 7.89149C9.42138 9.23769 8.36206 10.297 7.01586 10.4742C6.82091 10.4999 6.5887 10.4999 6.12428 10.4999Z"
                                            stroke="#4F46E5" stroke-linecap="round" />
                                    </svg>
                                    <span
                                        className="text-center text-indigo-600 text-xs font-medium leading-normal">Ongoing</span>
                                </div>
                            </td> */}
                            
                        </tr>
                        

                    </tbody>
                ))}
                </table>
            </div>
            

        </div>
    </div>
</section>
</div>
  );
};

// Placeholder functions for actions
const handleViewPost = (postId) => {
  alert(`Viewing post ${postId}`);
};

const handleDismissReport = (postId) => {
  alert(`Report for post ${postId} dismissed.`);
};

const handleDeletePost = (postId) => {
  alert(`Post ${postId} deleted.`);
};

export default ReportedPosts;
