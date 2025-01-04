import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Explore() {
  const [date, setDate] = useState("");

  const navigate= useNavigate()

  const data= [
      {
        image: "https://i.pinimg.com/736x/1c/06/d2/1c06d22554dc9648b48a0d7d668b8e37.jpg",
        title: "The Future of Travel",
        category:"Travel"
      },
      {
        image: "https://i.pinimg.com/236x/e5/fc/59/e5fc59c732ae0e62ba9ef1cc6e3786e7.jpg",
        title: "Delicious bites and foodie delights to satisfy your cravings.",
      category:"Food"
      },
      {
        image: "https://i.pinimg.com/236x/07/ca/52/07ca52bcbe9f7555a5cbebfe405013bd.jpg",
        title: "Creative DIY projects to bring your ideas to life",
          category:"DIY"
      },
      {
        image: "https://i.pinimg.com/736x/8d/37/99/8d3799e24be55bdfddb7a4fd8e4100d0.jpg",
        title: "Latest tech trends and gadgets to fuel your innovation.", 
        category:"Tech"
      },
      {
        image: "https://i.pinimg.com/736x/78/fe/99/78fe99befa1e094824455e37c380cc38.jpg",
        title: "Cozy vibes and inspiration for your home sweet home.",
          category:"Home"
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjA1uz5gFDN2L_XHFMDwU40y_Qp6DpNIGyA&s",
        title: "Trendy styles and fashion inspo to elevate your wardrobe.",
          category:"Fashion"
      },
    ]
     
  // Get the current date
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setDate(formattedDate);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-10 font-sans min-h-screen">
        <h1 className="text-xl font-semibold mb-4">{date}</h1>
        <h1 className="text-4xl font-semibold mb-6">Stay inspired</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {data.map((item, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden w-full h-64 sm:h-72 md:h-80" onClick={() => navigate(`/category/${item.category}`)}>
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <h1 className="text-sm mb-4">That's all for today!</h1>
          <h1 className="text-base font-semibold mb-4">Come back tomorrow for more inspiration</h1>
          <button className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200' onClick={() => navigate('/')}>Go to home feed</button>
        </div>
      </div>
    </>
  )
}

export default Explore