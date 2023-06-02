import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const useLoginData = () => {
  const { data, mutate } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  return { data, mutate };
};

export default useLoginData;