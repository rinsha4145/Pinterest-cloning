// src/hooks/useAxiosFetch.js
import { useState, useEffect } from 'react';
import axiosInstance from './AxioaInstance';

const useAxiosFetch = (url) => {
  const [data, setData] = useState(null);   // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);   // State to store error if occurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);  // Set the fetched data to the state
      } catch (err) {
        setError(err.message);  // Set the error state if the fetch fails
      } finally {
        setLoading(false);  // Stop the loading state
      }
    };

    fetchData();
  }, [url]);  // Refetch data if the URL changes

  return { data, loading, error };
};

export default useAxiosFetch;
