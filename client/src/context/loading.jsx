import { createContext, useState } from "react";
import LoadingSpinner from "../components/spinner";

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <LoadingSpinner asOverlay />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
