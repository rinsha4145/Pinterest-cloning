import React, { useEffect, useRef, useState } from "react";
import link from '../../Assets/link.png'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookMessengerShareButton,
  FacebookMessengerIcon,
  } from "react-share";

  


const ShareMenu = ({url}) => {
  const shareUrl = url // Replace with your website URL
  const title = "Check out this awesome image!"
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCopyLink = (url) => {
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert("Image URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="absolute bottom-2 right-12">
      {/* SVG Button */}
      <button
        onClick={toggleMenu}
        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </button>

      {/* Share Menu */}
      {isOpen && (
  <div className="absolute bottom-12 left-12 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Share</h3>
    <div className="flex flex-wrap gap-3">
      {/* Share options */}
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full">
          <img
            src={link}
            alt="Copy Link"
            onClick={() => handleCopyLink(url)}
        className="rounded-full hover:bg-gray-200 text-black w-9 h-9"
          />
        </div>
        <span className="text-gray-700 text-sm">Copy Link</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <span className="text-gray-700 text-sm">WhatsApp</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FacebookMessengerShareButton url={shareUrl} title={title}>
          <FacebookMessengerIcon size={32} round={true} />
        </FacebookMessengerShareButton>
        <span className="text-gray-700 text-sm">Messenger</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <span className="text-gray-700 text-sm">Facebook</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <span className="text-gray-700 text-sm">X</span>
      </div>
    </div>

    {/* Search Input */}
    <div className="mt-4 relative">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <i className="fas fa-search text-gray-500"></i>
      </div>
      <input
        type="text"
        placeholder="Search for someone"
        className="w-[360px] border border-gray-300 rounded-md p-2 mr-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
)}

    </div>
  );
};

export default ShareMenu;
