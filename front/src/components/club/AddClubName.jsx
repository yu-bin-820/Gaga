import useClubFormStore from "@hooks/club/useClubFormStore";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddClubName = () => {
  const { clubName, onChangeField } = useClubFormStore();

  return (
    <Box>
      <h5>클럽의 제목을 정해주세요!</h5>
      <TextField
        fulWidth
        label="clubName"
        name="clubName"
        onChange={(e) => onChangeField("clubName", e)}
        placeholder="Please enter text"
        required
        value={clubName}
      />
    </Box>
  );
};

export default AddClubName;
