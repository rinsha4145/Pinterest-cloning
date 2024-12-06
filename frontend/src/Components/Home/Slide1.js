import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slide1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate-fadeInDown");
  const [nextSlide, setNextSlide] = useState(currentSlide);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    autoplay: true, 
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
        setCurrentSlide(oldIndex)
      setAnimationClass("animate-fadeOutUp");
      setTimeout(() => {
        setNextSlide(newIndex);
        setCurrentSlide(newIndex);
        setAnimationClass("animate-fadeInDown");
      }, 4000); // Match the animation duration
    },
  };
    
      const slides = [
        { id: 1, content: 'Slide 1', style: {  color: 'white' },heading:"chai time snacks idea",image1:"",image2:"",image3:"",image4:"",image5:"",image6:"",image7:"",image8:""},
        { id: 2, content: 'Slide 2', style: {  color: 'yellow'},heading:"home decor idea",image1:"",image2:"",image3:"",image4:"",image5:"",image6:"",image7:"",image8:""  },
        { id: 3, content: 'Slide 3', style: {  color: 'black'},heading:"outfit idea",image1:"",image2:"",image3:"",image4:"",image5:"",image6:"",image7:"",image8:"" } ,
        { id: 3, content: 'Slide 4', style: {  color: 'black'},heading:"DIY idea",image1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAuT-iMUvDiCHuRpcbSMjUZ2fx1Q8xIVX44Q&s" ,image2:"https://paperit.in/cdn/shop/products/IMG_1007copy.jpg?v=1678967592&width=3333",image3:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fnestasia.in%2Fcollections%2Fdiy&psig=AOvVaw1-bepyOxaCHgZbnHhwJLvz&ust=1733466578329000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjLkdyAkIoDFQAAAAAdAAAAABAJ",image4:"https://diycandy.b-cdn.net/wp-content/uploads/2021/04/DIY-Bookmark-With-Book-List-Pocket.jpeg.webp",image5:"",image6:"",image7:"",image8:"" } ,

      ];
  return (
    <>
    <section id="home" className="h-[100vh] w-[1500px]">
    <div className="relative bg-white">
      {/* Hero Text */}
      <div className="text-center mt-[100px] ">
        <h1 className="text-6xl md:text-5xl font-bold text-black">
          Get your next
        </h1>
       
      </div>
      {/* Indicator Section */}
      <div className="relative bg-white">

      {/* Indicator Section */}
      <div style={{ margin: '50px auto', width: '80%' }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                ...slide.style,
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
              }}
            >
              <h2
                className={`text-center text-3xl md:text-5xl font-bold text-green-700 ${
                  index === currentSlide ? animationClass : ""
                }`}
              >
                {slide.heading}
              </h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>

      {/* Carousel Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
  <div className="relative overflow-hidden rounded-lg">
    <img src="image1.jpg" alt="image1" className="w-full h-auto object-cover"/>
  </div>
  <div className="relative overflow-hidden rounded-lg">
    <img src="image2.jpg" alt="image2" className="w-full h-auto object-cover"/>
  </div>
  <div className="relative overflow-hidden rounded-lg">
    <img src="image3.jpg" alt="image3" className="w-full h-auto object-cover"/>
  </div>
  <div className="relative overflow-hidden rounded-lg">
    <img src="image4.jpg" alt="image4" className="w-full h-auto object-cover"/>
  </div>
</div>



      

      {/* Scroll Down Button */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center space-x-2 text-green-700 text-lg font-semibold">
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

      {/* Highlight Section */}
      <div className="absolute bottom-0 w-full bg-custom-yellow py-4" id="search">
        <p className="text-center font-semibold text-black">
          Here's how it works
        </p>
      </div>
    </div>
    </section>
    <section id="about" className="h-[100vh] w-[1500px]">
    <div className="flex justify-center items-center h-screen bg-custom-yellow font-sans">
  <div className="rounded-lg  w-full flex flex-col md:flex-row items-center">
    <div className="ml-[0px] mt-3">
      <img src="https://media.assettype.com/cdomagazine%2F2024-07%2Fc28cd648-625d-41df-b67d-01bc0f47eb54%2FPinterest.png?w=1024&auto=format%2Ccompress&fit=max" alt="Easy Chicken Dinner" className="rounded-lg  w-[2000px] h-[600px] h-auto object-cover" />
    </div>
    <div className="md:w-3/4 md:ml-1 -4 mr-[100px] pb-[100px] md:mt-0  ">
      <h2 className="text-3xl font-bold text-pink-700 pt-[100px]  pb-10 text-[55px]">Search for an idea</h2>
      <p className="text-pink-700 text-2xl text-center">
        What do you want to try next? Think<br/> of something you're into—like "easy<br/> chicken dinner"—and see what you<br/> find.
      </p>
      <button className="bg-red-600 ml-[200px] hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-6">
        Explore
      </button>
    </div>
  </div>
</div>
</section>
<section id="about" className="h-[600px] w-[1500px]">
</section>
    </>
  );
};

export default Slide1;
