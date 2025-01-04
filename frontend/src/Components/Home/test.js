// const axios = require('axios');
// const fs = require('fs');

// const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your API key
// const endpoint = 'https://api.pexels.com/v1/curated';

// async function fetchPexelsData() {
//   try {
//     const response = await axios.get(endpoint, {
//       headers: {
//         Authorization: API_KEY,
//       },
//       params: {
//         per_page: 50, // Number of results per request
//         page: 1,      // Adjust page number as needed
//       },
//     });

//     // Save data to a file for later upload
//     fs.writeFileSync('pexels_data.json', JSON.stringify(response.data.photos, null, 2));
//     console.log('Data saved to pexels_data.json');
//   } catch (error) {
//     console.error('Error fetching data from Pexels:', error.message);
//   }
// }

// fetchPexelsData();




 
//     {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="relative  p-4 rounded-lg">
//         {saved.map((post) => (
//   <div className="relative group box rounded-lg ">
//     <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-3xl" />
//     <div className="absolute inset-0 bg-black border-radiusfull rounded-3xl bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
   
//     <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
//     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
//             </svg>
// </button>
// </div>
//   </div>
// ))}        
//         </div>
//       </div> */}



//       // {folders.map((folder) => (
//       //   <div
//       //     key={folder._id}
//       //     onClick={() => navigate('/pin')}
//       //     className="cursor-pointer bg-white w-[300px] rounded-lg p-4 hover:bg-gray-100 transition"
//       //   >
//       //     {/* Image Previews */}
//       //     <div className="flex -space-x-2 mb-4">
//       //       {folder.images.slice(0, 3).map((img, index) => ( // Display up to 3 images for uniformity
//       //         <img
//       //           key={index}
//       //           src={img}
//       //           alt={`Preview ${index + 1}`}
//       //           className="w-[100px] h-[150px] rounded-md object-cover border border-gray-300"
//       //         />
//       //       ))}
//       //     </div>
//       //     {/* Folder Title and Info */}
//       //     <h2 className="text-lg font-semibold truncate">{folder.title}</h2>
//       //     <p className="text-gray-500">
//       //       {folder.pins} Pins · {new Date(folder.time).toLocaleDateString()}
//       //     </p>
//       //   </div>
          
//       // ))}




      

//       <div className="p-6 max-w-screen-lg mx-auto">
//       {/* Title and Subtitle */}
//       <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold">{data?.name}</h1>
//           <p className="text-gray-500 mt-2 md:mt-0">{data?.posts.length}</p>
//         </div>

//         {/* Avatar and Collaborators */}
//         <div className="flex items-center space-x-2 mt-4 md:mt-0">
//           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//             <span className="text-sm font-medium">+</span>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       {/* <div className="flex space-x-4 mt-6">
//         <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
//           <span className="text-sm font-medium">More ideas</span>
//         </button>
//         <button className="flex items-center justify-center w-28 h-12 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
//           <span className="text-sm font-medium">Organise</span>
//         </button>
//       </div> */}
//     </div>
 
//     <div className="container">
   
//   {data?.posts?.map((post) => (
//     <div
//       className="relative group box" 
//       key={post._id}
//     >
//       {/* Image */}
//       <img
//         src={post.image}
//         alt={post.title}
//         className="w-full h-auto object-cover"
//       />

//     <p>{post.title}</p>
//     </div>
//   ))}
//      <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"  >
//   <div className="text-center relative w-full h-full">
//     <div className='absolute top-2 left-2 hover:bg-black bg-transparent border-white  rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300' >

//   <button className="text-base font-semibold text-white  flex items-center space-x-2">
//       Quick saves
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
//         <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//       </svg>
//     </button>
//     </div>
    
//   <button
//     className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
//   >
//     Save
//   </button>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//       />
//     </svg>
//     <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
// </svg>
// </button>

//   </div>
// </div>
// </div>
   
//    </>  


//    <div className="container overflow-hidden" onClick={handleUserInteraction} >
//   {posts?.map((post,index) => (
//     <div
//       className="relative group box" 
//       key={post?._id}
      
//     >
//       {post?.image.endsWith(".mp4") || post.image.endsWith(".mov") || post?.image.endsWith(".avi") ? (
//     <video
//     onClick={()=>navigate(`/viewpost/${post._id}`)}    
//     src={post?.image}
//     ref={(el) => (videoRefs.current[index] = el)} // Set ref for each video dynamically
//     alt={post.title}
//     className="w-full h-auto object-cover rounded-2xl "
//     onMouseEnter={() => handleMouseEnter(videoRefs.current[index])} // Play video on hover
//     onMouseLeave={() => handleMouseLeave(videoRefs.current[index])} // Pause and reset video on mouse leave
//     muted={true} // Initially muted to comply with autoplay policy
//     loop={true} // Optional: Loop the video if desired
//     playsInline // Ensure video plays inline on mobile
//   />
//   ) : (
//     <img
   
//       src={post.image}
//       alt={post.title}
//       className="w-full h-auto object-cover "
//     />
//   )}

//       {/* Hover Content */}
//       <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"  >
//   <div className="text-center relative w-full h-full">
//     {boards?.some(board => board.posts?.some(p => p._id === post?._id)) ? (
//   // Case 1: Post is saved in a board, show the board name
//   <p className="absolute top-2 left-3 text-center items-center hover:underline text-lg" onClick={() => navigate(`/viewboard/${boards.find(board => board.posts?.some(p => p._id === post?._id))?._id}`
//   )}>
//       {boards.find(board => board.posts?.some(p => p._id === post?._id))?.name}
//     </p>
//   ) : saved?.some(item => item._id === post?._id) ? (
//     // Case 2: Post is saved in the saved list (profile), show "Profile"
//     <p className="absolute top-2 left-3 items-center hover:underline flex justify-center text-lg" onClick={()=>navigate('/pin')}>
//       Profile
//     </p>
//   ) : (
//     // Case 3: Post is not saved anywhere, show "Quick saves"
//     <div
//       className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
//       onClick={() => handleBoardClick(post?._id)}
//     >
//       <button className="text-base font-semibold text-white flex items-center space-x-2">
//         Quick saves
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={4}
//           stroke="currentColor"
//           className="w-4 h-4"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m19.5 8.25-7.5 7.5-7.5-7.5"
//           />
//         </svg>
//       </button>
//     </div>
//   )}

    
  
//     {saved?.some(item => item._id === post?._id) ? (
//   <button
//     className="absolute top-2 right-2 bg-black text-white px-4 py-3 rounded-full shadow"
//     onClick={() => removesave(post?._id)}
//   >
//     Saved
//   </button>
// ) : (
//   <button
//     className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
//     onClick={() => handleSave(post?._id)}
//   >
//     Save
//   </button>
//   )} 
//   {isBoardMenuVisible===post._id && (
//                 <BoardPopup  postid={post._id} isBoardMenuVisible={isBoardMenuVisible} setBoardMenuVisible={setBoardMenuVisible}/>
//               )} 


//     <div className='mt-[60px]  h-[240px]' onClick={()=>navigate(`/viewpost/${post._id}/${post.category.name}`)}></div>
//     <button
//     className=" absolute p-2 bottom-2 right-12 bg-gray-100 rounded-full hover:bg-gray-200 text-black"
//     onClick={() => handleShareClick(post._id)}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//       />
//     </svg>
//   </button>
//   {isShareMenuVisible===post._id && (
//             <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
//             <div className="absolute top-1 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
//             <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible}/>
                
//                 </div> 
//                 </OutsideClickHandler>
                
//               )}
//     <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
// </svg>
// </button>

//   </div>
// </div>
//     </div>
//   ))}
// </div><div className="container overflow-hidden" onClick={handleUserInteraction} >
//   {posts?.map((post,index) => (
//     <div
//       className="relative group box" 
//       key={post?._id}
      
//     >
//       {post?.image.endsWith(".mp4") || post.image.endsWith(".mov") || post?.image.endsWith(".avi") ? (
//     <video
//     onClick={()=>navigate(`/viewpost/${post._id}`)}    
//     src={post?.image}
//     ref={(el) => (videoRefs.current[index] = el)} // Set ref for each video dynamically
//     alt={post.title}
//     className="w-full h-auto object-cover rounded-2xl "
//     onMouseEnter={() => handleMouseEnter(videoRefs.current[index])} // Play video on hover
//     onMouseLeave={() => handleMouseLeave(videoRefs.current[index])} // Pause and reset video on mouse leave
//     muted={true} // Initially muted to comply with autoplay policy
//     loop={true} // Optional: Loop the video if desired
//     playsInline // Ensure video plays inline on mobile
//   />
//   ) : (
//     <img
   
//       src={post.image}
//       alt={post.title}
//       className="w-full h-auto object-cover "
//     />
//   )}

//       {/* Hover Content */}
//       <div className="absolute inset-0 bg-black border-radiusfull rounded-2xl hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"  >
//   <div className="text-center relative w-full h-full">
//   {boards?.some(board => board.posts?.some(p => p._id === post?._id)) ? (
//   // Case 1: Post is saved in a board, show the board name
//   <p className="absolute top-2 left-3 text-center items-center hover:underline text-lg" onClick={() => navigate(`/viewboard/${boards.find(board => board.posts?.some(p => p._id === post?._id))?._id}`
//   )}>
//     {boards.find(board => board.posts?.some(p => p._id === post?._id))?.name}
//   </p>
// ) : saved?.some(item => item._id === post?._id) ? (
//   // Case 2: Post is saved in the saved list (profile), show "Profile"
//   <p className="absolute top-2 left-3 items-center hover:underline flex justify-center text-lg" onClick={()=>navigate('/pin')}>
//     Profile
//   </p>
// ) : (
//   // Case 3: Post is not saved anywhere, show "Quick saves"
//   <div
//     className="absolute top-2 left-2 hover:bg-black bg-transparent border-white rounded-full px-2 py-3 group-hover:bg-opacity-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
//     onClick={() => handleBoardClick(post?._id)}
//   >
//     <button className="text-base font-semibold text-white flex items-center space-x-2">
//       Quick saves
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={4}
//         stroke="currentColor"
//         className="w-4 h-4"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="m19.5 8.25-7.5 7.5-7.5-7.5"
//         />
//       </svg>
//     </button>
//   </div>
// )}

    
  
//     {saved?.some(item => item._id === post?._id) ? (
//   <button
//     className="absolute top-2 right-2 bg-black text-white px-4 py-3 rounded-full shadow"
//     onClick={() => removesave(post?._id)}
//   >
//     Saved
//   </button>
// ) : (
//   <button
//     className="absolute top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
//     onClick={() => handleSave(post?._id)}
//   >
//     Save
//   </button>
//   )} 
//   {isBoardMenuVisible===post._id && (
//                 <BoardPopup  postid={post._id} isBoardMenuVisible={isBoardMenuVisible} setBoardMenuVisible={setBoardMenuVisible}/>
//               )} 


//     <div className='mt-[60px]  h-[240px]' onClick={()=>navigate(`/viewpost/${post._id}/${post.category.name}`)}></div>
//     <button
//     className=" absolute p-2 bottom-2 right-12 bg-gray-100 rounded-full hover:bg-gray-200 text-black"
//     onClick={() => handleShareClick(post._id)}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//       stroke="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//       />
//     </svg>
//   </button>
//   {isShareMenuVisible===post._id && (
//             <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
//             <div className="absolute top-1 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
//             <ShareMenu url={post.image} isShareMenuVisible={isShareMenuVisible}/>
                
//                 </div> 
//                 </OutsideClickHandler>
                
//               )}
//     <button className="absolute bottom-2 right-2 bg-white hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
// </svg>
// </button>

//   </div>
// </div>
//     </div>
//   ))}
// </div>


import React from 'react'

function test() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
    <div className="max-w-screen-lg h-[600px] w-[1500px] mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Content Container */}
      <div className="flex flex-col md:flex-row">
        {/* Left Image Section */}
        
        <div className="w-full md:w-1/2">
          <img
            src={data?.image} 
            alt="Pin"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Details Section */}
        <div className="w-full md:w-1/2 p-6">
          {/* Icons Section */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
            <div className={`flex space-x-2 right-[430px] cursor-pointer ${data?.likedBy.some(item => item=== user._id) ? 'text-red-500' : 'text-black-400'}`}

>
<div onClick={() => data && handleLikeToggle(data?._id,user?._id)}>
{data?.likedBy.some(item => item === user._id) ? (
<FaHeart className="w-5 h-5 text-red-500 top-[150px]" />
) : (
<FaRegHeart className="w-5 h-5 text-black-400 top-[150px]" />
)}

 </div>
{data?.likedBy.length > 0 && (
  <span className="text-black ">{data?.likedBy.length}</span>
)}


<button
  className=" p-2 top-[-8px] rounded-full hover:bg-gray-200 text-black"
  onClick={()=>setShareMenuVisible((prev) => !prev)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
</button>

</div>


            </div>
            {saved?.some(item => item._id === data?._id) ? (
<button
  className=" top-2 right-12 bg-black text-white px-4 py-3 rounded-full shadow"
  onClick={() => removesave(data?._id)}
>
  Saved
</button>
) : (
<button
  className=" top-2 right-2 bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700"
  onClick={() => handleSave(data?._id)}
>
  Save
</button>
)} 
          </div>
          {isShareMenuVisible && (
          <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
          <div className="absolute top-[200px] bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
          <ShareMenu url={data.image} isShareMenuVisible={isShareMenuVisible}/>
              
              </div> 
              </OutsideClickHandler>
              
            )}
          {/* Details Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
            <p className="text-gray-500 text-sm">{data?.description}</p>
          </div>
          

        {/* User Info Section */}
          <div className="flex items-center mt-6" >
          {data?.owner?.profileimage ? (
          <img src={data?.owner?.profileimage} alt="Profile"  className="h-10" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            <div className="ml-4" onClick={()=>navigate(`/userpage/${data.owner._id}`)}>
              <h3 className="font-bold">{data?.owner?.firstname}</h3>
              <p className="text-gray-500">{data?.owner?.followers?.length || 0} followers</p>

            </div>
            {data?.owner._id!==user._id ?(
              <>
            {data?.owner?.followers?.some(follow=>follow===user._id )?(
            <button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-100" onClick={()=>handleFollowUnfollow(data?.owner?._id)}>
              Following
            </button>
            ):(<button className="ml-auto px-4 py-2 border rounded-lg hover:bg-gray-100" onClick={()=>handleFollowUnfollow(data?.owner?._id)}>
            Follow
          </button>)}
          </>
            ):""}
          </div>

          {/* Comments Section */}
          <div className="p-4 md:p-6 lg:p-8 bg-white">
<div className="mb-4">
  <button
    className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none"
    onClick={handleToggle}
  >
    {data?.comments?.length} comments
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  </button>
</div>


{show && (
  <>
  {data?.comments?.length===0 ?(
    <>
    <h4 className="font-bold">No comments yet</h4>
    <p className="text-gray-500 mt-2">Add one to start the conversation.</p>
    </>
  ):(
      <>
<div className="relative h-[200px] overflow-y-auto">
  {/* Comments Section with scrolling */}
  
  {data?.comments?.slice().reverse().map((comment) => (
    <div
      key={comment._id}
      className="p-4 flex items-start space-x-4 "
    >
      {/* First Column: Image */}
      <div className="flex-shrink-0">
        {comment?.user?.profileimage ? (
          <img
            src={comment?.user?.profileimage}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-10 w-10 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>

      {/* Second Column: Text and SVG */}
      <div className="flex-grow">
      {edit && editingCommentId === comment._id ? (
        // Edit Mode
        <div >
          <div className="relative flex border rounded-lg px-4 py-2">
          <input
      type="text"
      name="comment"
      value={commentData || ""}
      onChange={handleChange }
      className="w-full border-none focus:outline-none"
    />
    <button
        type="button"
        className="p-2  rounded-full"
        onClick={() => setShowPicker((prev) => !prev)}
      >
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
</svg>

      </button>
    </div>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-1 rounded-md"
              onClick={() =>  handleSaveEdit(comment.comment)}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-1 rounded-md"
              onClick={() =>{setEdit(false) ; setEditingCommentId(null)}}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Normal Mode
        <div className="text-sm">
          <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => navigate(`/userpage/${comment.user._id}`)}
          >
            {comment?.user?.username}
          </span>{" "}
          {comment.comment}
        </div>
      )}

        {/* Second Row: SVG Button */}
        {comment?.user?._id===user._id &&(
        <div className="relative"> 
    <div className="flex" > {/* Use `onClick` instead of `onclick` */}
      <button className="bg-white hover:bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      onClick={()=>handleOpen(comment._id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>
    </div>
    

    {Open && openCommentId === comment._id && (

      <div className="absolute w-38 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="border-t border-gray-200">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => editComment(comment._id) }
          >
            Edit
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() =>deleteComment(data._id,comment._id)}
          >
            Delete
          </button>
        </div>
      </div>
    )}
  </div>
        )}
      </div>
    </div>
  ))}
</div>
</>
    )}
    
</>
)}



{/* Comment Input Section */}
<div className="mt-4 z-50">
  <div className="relative flex border rounded-lg px-4 py-2">
    <input
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Add a comment"
      className="w-full border-none focus:outline-none"
    />
    <button
        type="button"
        className="p-2  rounded-full"
        onClick={() => setShowPicker((prev) => !prev)}
      >
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
</svg>

      </button>
      
    {comment.trim() && (
      <button
        className="bg-red-500 p-1 ml-1 rounded-full"
        onClick={() => addComment(data?._id, comment)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    )}
  </div>
</div>
</div>

{showPicker && (
        <div className="absolute z-10">
          <OutsideClickHandler onOutsideClick={() => setShowPicker(false)}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </OutsideClickHandler>
        </div>
      )}

        </div>
        
      </div>
      
    </div>
   

    {/* More to Explore Section */}
    <div className="mt-8">
      <h3 className="flex justify-center text-lg font-bold mb-4">More to explore</h3>
    <Category category={data?.category?.name}/>
    </div>
    
              
  </div>
  )
}

export default test