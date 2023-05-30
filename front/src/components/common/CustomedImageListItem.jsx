import { ImageListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const CustomedImageListItem = ({ src }) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  return (
    <ImageListItem>
      {!imageLoadingError ? (
        <img src={src} alt="noImg" loading="lazy" onError={handleImageError} />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.2rem',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            No Img
          </Typography>
        </Box>
      )}
    </ImageListItem>
  );
};

CustomedImageListItem.propTypes = {
  src: PropTypes.string,
};

export default CustomedImageListItem;
