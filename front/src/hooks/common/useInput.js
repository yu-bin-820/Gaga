import { useCallback, useState } from 'react';

const useInput = (initialData) => {
  const [value, setValue] = useState(initialData);

  const handler = useCallback((e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return [value, handler, setValue];
};

export default useInput;
