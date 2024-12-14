import React, { createContext, useState, useContext } from 'react';

// Create the Context
const clickHandlerContext = createContext();

// Create a provider component
export const ClickHandlerProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <clickHandlerContext.Provider value={{ showLogin, showSignup, setShowLogin, setShowSignup }}>
      {children}
    </clickHandlerContext.Provider>
  );
};

// Create a custom hook to use the context
export const useClickHandler = () => useContext(clickHandlerContext);
