import CommonTop from "@layouts/common/CommonTop";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import useSearchClubFormStore from "@hooks/club/useSearchClubFormStore";

const SearchClub = () => {
  const navigate = useNavigate();

  const { searchKeyword, setField } = useSearchClubFormStore();

  const onClickSearch = useCallback(() => {
    navigate(`/club/clublist`);
    console.log(searchKeyword);
  }, [navigate, searchKeyword]);

  return (
    <div>
      <CommonTop />
      <Box sx={{ marginTop: "64px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="지역 및 키워드로 클럽을 검색해주세요"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
              value={searchKeyword}
              onChange={(e) => setField("searchKeyword", e.target.value)}
            />
          </Grid>
          <Grid item>
            <Tooltip title="Reload">
              <IconButton onClick={onClickSearch}>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchClub;
