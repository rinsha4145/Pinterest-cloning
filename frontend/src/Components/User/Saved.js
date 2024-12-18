import React, { useEffect, useState } from 'react'
import handleAsync from '../Utils/HandleAsync';
import axiosInstance from '../Utils/AxioaInstance';

function Saved() {
    const [saved,setsaved] = useState([])
    const [selectedFolder, setSelectedFolder] = useState(null);
    const folders = [
      {
        id: 1,
        title: "Wallpaper decor",
        pins: 2,
        time: "10m",
        images: [
          "https://via.placeholder.com/100", // Replace with your folder images
          "https://via.placeholder.com/100",
        ],
        posts: [
          { id: 1, image: "https://via.placeholder.com/300", title: "Wallpaper 1" },
          { id: 2, image: "https://via.placeholder.com/300", title: "Wallpaper 2" },
        ],
      },
      {
        id: 2,
        title: "Positive quotes",
        pins: 3,
        time: "1y",
        images: [
          "https://via.placeholder.com/100",
          "https://via.placeholder.com/100",
        ],
        posts: [
          { id: 1, image: "https://via.placeholder.com/300", title: "Quote 1" },
          { id: 2, image: "https://via.placeholder.com/300", title: "Quote 2" },
        ],
      },
    ];
    useEffect(() => {
        const fetchData = handleAsync(async () => {
            const response = await axiosInstance.get('/saves');
            setsaved(response.data.getsaved.posts); 
           
        });
        fetchData();
      }, []);
      console.log("saved",saved)
      
  return (
   
      <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-3 gap-6 p-8">
  {saved && saved.length > 0 ? (
    saved.map((folder) => (
      <div
        key={folder._id}
        onClick={() => setSelectedFolder(folder)}
        className="cursor-pointer bg-white rounded-lg p-4 hover:bg-gray-200 transition"
      >
        {/* Image Previews */}
        <div className="flex -space-x-2 overflow-hidden mb-4">
          {folder.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Folder"
              className="w-16 h-16 rounded-md object-cover border border-gray-300"
            />
          ))}
        </div>
        {/* Folder Title and Info */}
        <h2 className="text-lg font-semibold">{folder.title}</h2>
        <p className="text-gray-500">{folder.pins} Pins · {folder.time}</p>
      </div>
    ))
  ) : (
    // Display when no folders are saved
    <p className="text-gray-500 col-span-full text-center">
      No folders found. Start saving your favorite posts!
    </p>
  )}
</div>

      

      
  )
}

export default Saved