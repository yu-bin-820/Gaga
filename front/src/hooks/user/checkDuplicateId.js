import { useState } from 'react';
import axios from 'axios';

export default function useCheckDuplicateId() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [error, setError] = useState(null);

  const checkDuplicateId = async (userId) => {
    setIsLoading(true);
    setIsDuplicate(null);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/checkDuplicateId`,
        { userId },
        { withCredentials: true }
      );
      setIsDuplicate(response.data.isDuplicate);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { checkDuplicateId, isLoading, isDuplicate, error };
}
