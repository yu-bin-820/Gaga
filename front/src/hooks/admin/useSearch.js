import { useState } from 'react';
import axios from 'axios';

export const useSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const handleSearch = async (url, setResults) => {
    try {
      const response = await axios.get(url, {
        params: {
          searchKeyword,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { searchKeyword, setSearchKeyword, handleSearch };
};
