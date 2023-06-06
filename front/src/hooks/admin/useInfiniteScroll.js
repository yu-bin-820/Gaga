import { useState, useEffect } from 'react';
import axios from 'axios';

export const useInfiniteScroll = (initialData, url) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);

  useEffect(() => {
    const fetchMoreData = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const params = {
          noticePostCategoryNo: 0,
          lastPostId: lastPostId === null ? undefined : String(lastPostId),
        };
        const response = await axios.get(url, { params });
        const newItems = response.data;

        setData((prevData) => {
          const uniquePosts = [...prevData, ...newItems];
          return Array.from(new Set(uniquePosts.map((post) => post.noticePostNo))).map((noticePostNo) =>
            uniquePosts.find((post) => post.noticePostNo === noticePostNo)
          );
        });
        
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setLastPostId(newItems[newItems.length - 1].noticePostNo);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.9 && hasMore && !isLoading) {
        fetchMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, lastPostId, url]);

  return { data, setData, isLoading, hasMore };
};
