import React, { useState } from 'react';
import { TextField, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const AnimatedTextField = styled(TextField)`
  transition: all 300ms ease-in-out;
`;

const SearchTransition = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchIconClick = () => {
    setSearchOpen(true);
  };

  const handleSearch = () => {
    console.log('검색 키워드:', searchKeyword);
    // 검색 로직을 수행합니다.
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <IconButton variant="contained" onClick={handleSearchIconClick}>
        <SearchIcon />
      </IconButton>
      <Collapse in={isSearchOpen}>
        <AnimatedTextField
          type="text"
          size="small"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="standard"
          style={{ width: '100px', marginRight: '0.1rem' }}
          InputProps={{
            endAdornment: (
              <IconButton variant="contained" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Collapse>
    </>
  );
};

export default SearchTransition;
