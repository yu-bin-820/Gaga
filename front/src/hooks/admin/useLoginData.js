import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const useLoginData = () => {
  const { data, mutate } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return { data, mutate };
};

export default useLoginData;