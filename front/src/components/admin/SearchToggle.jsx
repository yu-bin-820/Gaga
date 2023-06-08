import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
// Import the SearchBox component here if necessary.

function SearchToggle() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userList, setUserList] = useState([]);
  // Add setBlackList state here if necessary.

  const handleSearchIconClick = () => {
    setSearchOpen(true);
  };

  const handleSearch = async (searchType) => {
    let url;
    if (searchType === 'user') {
      url = `${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchUser`;
      if (searchKeyword.length > 0) {
        try {
          const response = await axios.get(url, {
            params: {
              searchKeyword: searchKeyword,
            },
          });
          setUserList(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    } else if (searchType === 'blackList') {
      url = `${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchBlackList`;
      if (searchKeyword.length > 0) {
        try {
          const response = await axios.get(url, {
            params: {
              searchKeyword: searchKeyword,
            },
          });
          // Handle the response for black list if necessary.
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <ToggleButton
        value="search"
        selected={isSearchOpen}
        onChange={handleSearchIconClick}
      >
        <SearchIcon />
      </ToggleButton>
      {/* Render the SearchBox component here if necessary. */}
    </div>
  );
}

export default SearchToggle;