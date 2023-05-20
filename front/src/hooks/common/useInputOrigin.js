import { useCallback, useState } from 'react';

const useInputOrigin = (initialData) => {
  const [value, setValue] = useState(initialData);

  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInputOrigin;
