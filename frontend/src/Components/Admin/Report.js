import React, { useEffect, useState } from "react";

const ReportedPosts = () => {
  const [reportedPosts, setReportedPosts] = useState([]);

  // Fetch reported posts from an API
  useEffect(() => {
    const fetchReportedPosts = async () => {
      try {
        const response = await fetch("/api/reported-posts");
        const data = await response.json();
        setReportedPosts(data);
      } catch (error) {
        console.error("Error fetching reported posts:", error);
      }
    };

    fetchReportedPosts();
  }, []);

  if (reportedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">No reported posts found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Reported Posts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Post ID</th>
              <th className="py-3 px-4 text-left">Reported By</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedPosts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-100">
                <td className="py-3 px-4">{post.id}</td>
                <td className="py-3 px-4">{post.reportedBy}</td>
                <td className="py-3 px-4">{post.reason}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPost(post.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDismissReport(post.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
