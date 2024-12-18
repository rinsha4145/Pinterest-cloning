import React, { useState } from "react";
import link from '../../Assets/link.png';
import OutsideClickHandler from 'react-outside-click-handler';
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

const ShareMenu = ({ url,isShareMenuVisible }) => {
  const shareUrl = url; // Replace with your website URL
  const title = "Check out this awesome image!";
  const [isOpen, setIsOpen] = useState(isShareMenuVisible);

  const handleCopyLink = (value) => {
    // Copy the URL to the clipboard

    navigator.clipboard.writeText(value).then(() => {
      alert("Image URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err); 
    });
  
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      
      
        {/* Share Menu */}
        {isOpen && (
          <div className="absolute bottom-12 mr-[100px] top-6 left-0 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[300px] z-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Share</h3>
            <div className="flex flex-wrap gap-3">
              {/* Share options */}
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full">
                  <img
                    src={link}
                    alt="Copy Link"
                    onClick={() => handleCopyLink(url) }
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
    </OutsideClickHandler>
  );
};

export default ShareMenu;
