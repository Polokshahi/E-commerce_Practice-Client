import { useState, useEffect } from "react";
import axios from "axios";

const useAllProductLength = () => {
  const [length, setLength] = useState(0);

  const fetchLength = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allProducts");
      setLength(res.data.total || res.data.length || 0);
    } catch (err) {
      console.error("Failed to fetch product length:", err);
    }
  };

  useEffect(() => {
    fetchLength();
  }, []);

  return { length, refetch: fetchLength };
};

export default useAllProductLength;
