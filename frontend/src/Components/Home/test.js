const axios = require('axios');
const fs = require('fs');

const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your API key
const endpoint = 'https://api.pexels.com/v1/curated';

async function fetchPexelsData() {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        per_page: 50, // Number of results per request
        page: 1,      // Adjust page number as needed
      },
    });

    // Save data to a file for later upload
    fs.writeFileSync('pexels_data.json', JSON.stringify(response.data.photos, null, 2));
    console.log('Data saved to pexels_data.json');
  } catch (error) {
    console.error('Error fetching data from Pexels:', error.message);
  }
}

fetchPexelsData();




 
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative  p-4 rounded-lg">
        {saved.map((post) => (
  <div className="relative group box rounded-lg ">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-3xl" />
    <div className="absolute inset-0 bg-black border-radiusfull rounded-3xl bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
   
    <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
</button>
</div>
  </div>
))}        
        </div>
      </div> */}



      // {folders.map((folder) => (
      //   <div
      //     key={folder._id}
      //     onClick={() => navigate('/pin')}
      //     className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
      //   >
      //     {/* Image Previews */}
      //     <div className="flex -space-x-2 mb-4">
      //       {folder.images.slice(0, 3).map((img, index) => ( // Display up to 3 images for uniformity
      //         <img
      //           key={index}
      //           src={img}
      //           alt={`Preview ${index + 1}`}
      //           className="w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
      //         />
      //       ))}
      //     </div>
      //     {/* Folder Title and Info */}
      //     <h2 className="text-lg font-semibold truncate">{folder.title}</h2>
      //     <p className="text-gray-500">
      //       {folder.pins} Pins · {new Date(folder.time).toLocaleDateString()}
      //     </p>
      //   </div>
          
      // ))}




      

      <div className="p-6 max-w-screen-lg mx-auto">
      {/* Title and Subtitle */}
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{data?.name}</h1>
          <p className="text-gray-500 mt-2 md:mt-0">{data?.posts.length}</p>
        </div>

        {/* Avatar and Collaborators */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">+</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex space-x-4 mt-6">
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">More ideas</span>
        </button>
        <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
          <span className="text-sm font-medium">Organise</span>
        </button>
      </div> */}
    </div>
 
    <div className="container">
   
  {data?.posts?.map((post) => (
    <div
      className="relative group box" 
      key={post._id}
    >
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto object-cover"
      />

    <p>{post.title}</p>
    </div>
  ))}
     <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"  >
  <div className="text-center relative w-full h-full">
    <div className='absolute top-2 left-2 hover:bg-black bg-transparent border-white  rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300' >

  <button className="text-base font-semibold text-white  flex items-center space-x-2">
      Quick saves
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    </div>
    
  <button
    className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
  >
    Save
  </button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
    <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
</button>

  </div>
</div>
</div>
   
   </>  