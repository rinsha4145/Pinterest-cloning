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



      