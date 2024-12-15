import React, { useContext, useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import Signup from './Signup'
import './Home.css'
import { useSelector } from "react-redux";
import Login from "./Login";
import {useClickHandler} from '../Context/ClickHandlerContext'
const Slides = () => {
  const navigate=useNavigate()
  const { posts } = useSelector((state) => state.posts);
  const { showLogin, showSignup, } = useClickHandler()
  
  const foodPosts = posts.filter((post) => post.category === 'Food').slice(0, 10).map((post) => post.image); 
  const DIYPosts = posts.filter((post) => post.category === 'DIY').slice(0, 10).map((post) => post.image);     
  const homePosts = posts.filter((post) => post.category === 'Home').slice(0, 10).map((post) => post.image);     
  const fashionPosts = posts.filter((post) => post.category === 'Fashion').slice(0, 10).map((post) => post.image);     

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate-fadeInDown");
  const [nextSlide, setNextSlide] = useState(currentSlide);
  
  useEffect(() => {
    if (showLogin || showSignup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Reset scrolling when the form is hidden
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup to reset when the component is unmounted
    };
  }, [showLogin, showSignup]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    autoplay: true, 
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
    setCurrentSlide(oldIndex)
      setAnimationClass("animate-fadeOutUp");
      setTimeout(() => {
        setNextSlide(newIndex);
        setCurrentSlide(newIndex);
        setAnimationClass("animate-fadeInDown");
      }, 3000); // Match the animation duration
    },
  
  appendDots: dots => (
    <div style={{ marginBottom: "400px", textAlign: "center",}}>
      <ul>{dots}</ul>
    </div>
  ),
  customPaging: i => (
    <button className={`${currentSlide === i ? 'active' : ''}`} >{i + 1}</button>
  ),
};

    
  const slides = [
    { id: 1, content: 'Slide 1', color: '#c28b00' ,heading:"food snacks idea",images:foodPosts},
    { id: 2, content: 'Slide 2', color: '#0076d3',heading:"home decor idea",images:homePosts },
    { id: 3, content: 'Slide 3', color: '#518c7b',heading:"outfit idea",images:fashionPosts} ,
    { id: 3, content: 'Slide 4', color: '#507a57',heading:"DIY idea",images:DIYPosts} ,
  ];
  return (
    <div className="overflow-hidden">
    <section id="home" className="relative font-sans z-10">
    {showSignup && (
    <div className="absolute inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <Signup/>
      </div>
    </div>
  )}
    {showLogin && (
    <div className="absolute inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <Login/>
      </div>
    </div>
  )}
    
    <div className={`mt-[72px] ${ showLogin || showSignup ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Hero Text */}
      <div className="flex justify-center text-center">
        <h1 className=" text-7xl md:text-6xl font-medium text-black ">
          Get your next
        </h1>
        
      
      </div>
      
      {/* Indicator Section */}
      <div className="relative bg-white">

      {/* Indicator Section */}
      <div >
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                ...slide.style,
                  width: '80%',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '300px',
                zIndex:"50px"
              }}
            >
              <h2
              style={{color:slide.color}}
                className={`text-center text-4xl md:text-5xl 
                   ${index === currentSlide ? animationClass : ""}`}

              >
                {slide.heading}
              </h2>
              
              
  <div className={`${index === currentSlide ? animationClass : ""}`}>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 md:grid-row-2 gap-4  bg-gradient-to-t from-red to-transparent ml-0 h-[450px] mt-[50px] ">
  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-50"></div>
  <div className="flex flex-col space-y-4 mt-2 ">
    <div className="relative rounded-lg overflow-hidden  h-[300px]">
      <img src={slide.images[9]} alt="Image 0" className="w-full h-full object-cover" />
    </div>
    <div className="relative rounded-lg overflow-hidden">
      <img src={slide.images[1]} alt="Image 1" className="w-full h-full object-cover" />
    </div>
  </div>
  <div className="flex flex-col space-y-4 mt-[100px]">
    <div className="relative rounded-lg overflow-hidden  h-[350px]">
      <img src={slide.images[2]} alt="Image 2" className="w-full h-full object-cover" />
    </div>
    
  </div><div className="flex flex-col space-y-4 mt-[200px]">
    <div className="relative rounded-lg overflow-hidden  h-[250px]">
      <img src={slide.images[3]} alt="Image 3" className="w-full h-full object-cover" />
    </div>
    
  </div>
  
  <div className="flex flex-col space-y-4 mt-[300px]">
  <div className=" flex justify-center items-center z-50 ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="animate-bounce w-12 h-12 text-white border rounded-full cursor-pointer"
    style={{backgroundColor:slide.color}}
    onClick={() => {
      const element = document.getElementById("food");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2} // Adjust only the SVG
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
</div>
    <div className="relative rounded-lg overflow-hidden  h-[250px]">
      <img src={slide.images[4]} alt="Image 4" className="w-full h-full object-cover" />
    </div>
  </div>
  
  <div className="flex flex-col space-y-4 mt-[200px]">
    
    <div className="relative rounded-lg overflow-hidden  h-[250px]">
      <img src={slide.images[5]} alt="Image 5" className="w-full h-full object-cover" />
    </div>
    
  </div>
  <div className="flex flex-col space-y-4 mt-[100px]">
    <div className="relative rounded-lg overflow-hidden  h-[350px]">
      <img src={slide.images[6]} alt="Image 6" className="w-full h-full object-cover" />
    </div>
  </div>
  <div className="flex flex-col space-y-4 mt-2">
    <div className="relative rounded-lg overflow-hidden  h-[350px]">
      <img src={slide.images[7]} alt="Image 7" className="w-full h-full object-cover" />
    </div>
    <div className="relative rounded-lg overflow-hidden ">
      <img src={slide.images[8]} alt="Image 8" className="w-full h-full object-cover" />
    </div>
    
  </div>

  
  
</div>
</div>
</div>
))}
</Slider>
</div>
</div>
</div>




      

 

      {/* Scroll Down Button */}
      <div className=" flex justify-center items-center absolute bottom-0 w-full py-4 mt-8 w-[100%] bg-custom-yellow h-4" id="search">
      
        <button className="flex items-center space-x-2 text-base  " 
        onClick={() => {
              const element = document.getElementById("food");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}>
          <span>Here's how it works</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      
    </section>
    <section id="food" className="h-[100vh] w-[100%]">
    <div className="flex justify-center items-center h-screen bg-custom-yellow font-sans" >
  <div className="rounded-lg  w-full flex flex-col md:flex-row items-center">
    <div className="ml-[0px] mt-3">
      <img src="https://media.assettype.com/cdomagazine%2F2024-07%2Fc28cd648-625d-41df-b67d-01bc0f47eb54%2FPinterest.png?w=1024&auto=format%2Ccompress&fit=max" alt="Easy Chicken Dinner" className="rounded-lg  w-[2100px] h-[610px] h-auto object-cover" />
    </div>
    <div className="md:w-3/4 md:ml-1 -4 mr-[100px] pb-[100px] md:mt-0  ">
      <h2 className="text-3xl font-bold text-pink-700 pt-[100px]  pb-10 text-[55px]">Search for an idea</h2>
      <p className="text-pink-700 text-2xl text-center">
        What do you want to try next? Think<br/> of something you're into—like "easy<br/> chicken dinner"—and see what you<br/> find.
      </p>
      <button className="bg-red-600 ml-[200px] hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-6" onClick={()=>navigate('/category/Food')}>
        Explore
      </button>
    </div>
  </div>
</div>
</section>
<section id="fur" className="h-[100vh] w-[100%]" style={{backgroundColor:"#dafff6"}}>
<div className="flex  h-screen">
  <div className="grid grid-cols-2 ">
    <div className="  overflow-hidden w-[800px] h-[100vh]">
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D" alt="Lip shade" className="w-full h-full object-cover" />
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
        <h3 className="text-lg  font-bold">How to find the perfect lip shade for any occasion</h3>
      </div> */}
    </div>
    <div className="flex justify-center items-center text-red text-white p-8 rounded-lg flex flex-col items-start">
      <h2 className=" text-center text-red-700 text-6xl font-bold mb-4">See it, make it,<br/> try it, do it</h2>
      <p className=" text-center text-2xl text-red-700 mb-6">The best part of Pinterest is discovering<br/> new things and ideas from people<br/> around the world.</p>
      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full" onClick={()=>navigate('/category/Home')}>
        Explore
      </button>
    </div>
  </div>
</div>
</section>
<section 
  id="shop"
  className="h-[100vh] w-[100%]">
  <div
  style={{
    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEz5uN2EK6OxVGJoUqrNWwS2KU7xOvrXyhGvph5oBvbGnM51LfHmU5YxalHXw5JliJjRw&usqp=CAU')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Ensures the image covers the entire section
    backgroundPosition: "center center", // Centers the image
    width: "100%",
    height: "100vh",
    
    opacity:0.5
  }}>
    <div className="flex justify-center pt-10 pl-[400px] w-full max-w-[600px] z:1">
    
    <Signup />
  </div>
  </div>
</section>

    </div>
  );
};

export default Slides;
