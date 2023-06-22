import CommonTop from '@layouts/common/CommonTop';
import { Box } from '@mui/system';
import { useCallback, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/fetcher';
import useSearchClubFormStore from '@hooks/club/useSearchClubFormStore';
import ClubThumbnail from '@components/club/ClubThumbnail';
import useClubFormStore from '@hooks/club/useClubFormStore';
import useClubStore from '@stores/club/useClubStore';

const ListSearchClub = () => {
  const boxRef = useRef(null);

  const { searchKeyword } = useSearchClubFormStore();

  const getKey = (index, prevPageData) => {
    if (prevPageData && !prevPageData.length) {
      return null;
    }

    return `${import.meta.env.VITE_SPRING_HOST}/rest/club/search?page=${
      index + 1
    }&searchKeyword=${searchKeyword}`;
  };

  const { data: clubListData, setSize } = useSWRInfinite(getKey, fetcher);

  const onScroll = useCallback(
    (e) => {
      if (
        e.currentTarget.scrollTop + e.currentTarget.clientHeight ==
        e.currentTarget.scrollHeight
      ) {
        setSize((prevSize) => prevSize + 1).then(() => {
          console.log(setSize);
          const current = boxRef?.current;
          if (current && e.currentTarget) {
            const scrollTopOffset =
              e.currentTarget.scrollHeight -
              e.currentTarget.clientHeight -
              current.scrollHeight;
            current.scrollTo({ top: current.scrollTop + scrollTopOffset });
          }
        });
      }
    },
    [boxRef, setSize]
  );

  const clubList = clubListData?.flat();

  if (!clubList) {
    return <>로딩중</>;
  }

  console.log(clubList);

  return (
    <Box
      ref={boxRef}
      onScroll={onScroll}
      style={{
        maxHeight: '100vh',
        overflow: 'scroll',
      }}
    >
      <CommonTop prevPath="/club/searchclub" />
      <Box></Box>
      <Box sx={{ bgcolor: '#ededed' }}>
        <Box
          sx={{ paddingTop: '60px', paddingBottom: '5px', bgcolor: '#ededed' }}
        >
          {clubList?.map((club, i) => (
            <Box
              key={i}
              sx={{
                margin: 1,
                borderRadius: 3,
                minWidth: 300,
                backgroundColor: '#ffffff',
              }}
            >
              <ClubThumbnail club={club} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ListSearchClub;
