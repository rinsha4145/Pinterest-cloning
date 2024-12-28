import React, { createContext, useState, useContext } from 'react';

// Create the Context
const clickHandlerContext = createContext();

// Create a provider component
export const ClickHandlerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <clickHandlerContext.Provider value={{ isOpen, showSignup, setIsOpen, setShowSignup }}>
      {children}
    </clickHandlerContext.Provider>
  );
};

// Create a custom hook to use the context
export const useClickHandler = () => useContext(clickHandlerContext);
