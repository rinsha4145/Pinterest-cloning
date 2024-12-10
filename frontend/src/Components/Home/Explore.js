import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Explore() {
    const navigate= useNavigate()

    const [date, setDate] = useState("");

   const data= [
        {
          image: "https://i.pinimg.com/736x/1c/06/d2/1c06d22554dc9648b48a0d7d668b8e37.jpg",
          title: "The Future of Travel",
          category:"Travel"
        },
        {
          image: "...",
          title: "Christmas gift ideas for fashion lovers",
        category:"Food"
        },
        {
          image: "...",
          title: "Shine through the festivities",
           category:"DIY"
        },
        {
          image: "...",
          title: "Relatable memes that are so you", 
          category:"Tech"
        },
        {
          image: "...",
          title: "Fitness update photos",
           category:"Travel"
        },
        {
          image: "...",
          title: "Travel to South Korea",
           category:"Travel"
        },
      ]
     

  useEffect(() => {
    const today = new Date();
    // Format the date as '10 December 2024'
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Set the formatted date in the state
    setDate(formattedDate);
  }, []);
  return (
   <>
    <div className="flex flex-col items-center pt-10 font-sans">
      <h1 className="text-xl font-semibold mb-4">{date}</h1>
      <h1 className="text-4xl font-semibold">Stay inspired</h1>
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
  {data.map((item, index) => (
    <div key={index} className="relative rounded-lg overflow-hidden w-[380px] h-[280px]" onClick={() => navigate(`/category/${item.category}`)}>
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
</div>
   </>
  )
}

export default Explore