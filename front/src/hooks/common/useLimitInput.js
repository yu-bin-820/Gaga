import getByteLength from '@utils/getByteLength';
import { useCallback, useState } from 'react';

const useLimitInput = (initialData, length) => {
  const [value, setValue] = useState(initialData);

  const handler = useCallback(
    (event) => {
      let inputValue = event.target.value;

      let byteCount = getByteLength(inputValue);
      if (byteCount <= 3 * length) {
        setValue(inputValue);
      }
    },
    [length]
  );

  return [value, handler, setValue, getByteLength(value)];
};

export default useLimitInput;
