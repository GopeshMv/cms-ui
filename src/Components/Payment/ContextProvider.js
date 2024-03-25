import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const ContextProvider = ({ children }) => {
  const [ paymentId, setPaymentId] = useState(null);

  return (
    <MyContext.Provider value={{ paymentId, setPaymentId }}>
      {children}
    </MyContext.Provider>
  );
};