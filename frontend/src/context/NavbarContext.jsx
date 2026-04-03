import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <NavbarContext.Provider value={{ isBlurred, setIsBlurred }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);