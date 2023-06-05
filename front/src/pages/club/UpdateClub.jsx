import useInput from "@hooks/common/useInput";
import { Avatar, Button, ImageListItem, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateClub = () => {
  const { clubNo } = useParams();
  const [club, onChangeClub, setClub] = useInput({
    clubName: "",
    clubIntro: "",
    clubImg: "",
    clubRegion: "",
    filterGender: "",
    filterMinAge: "",
    filterMaxAge: "",
    clubState: "",
    clubMaxMemberNo: "",
    filterTag: "",
    clubNo: "",
  });

  const [selectedImage, setSelectedImage] = useState(
    club?.clubImg
      ? `${import.meta.env.VITE_SPRING_HOST}/upload_images/club/${
          club?.clubImg
        }`
      : null
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeImg = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setClub(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("clubName", club.clubName);
      formData.append("clubIntro", club.clubIntro);
      formData.append("clubRegion", club.clubRegion);
      formData.append("filterGender", club.filterGender);
      formData.append("filterMinAge", club.filterMinAge);
      formData.append("filterMaxAge", club.filterMaxAge);
      formData.append("clubMaxMemberNo", club.clubMaxMemberNo);
      formData.append("filterTag", club.filterTag);
      formData.append("clubState", club.clubState);
      formData.append("clubNo", clubNo);

      console.log(clubNo.clubRegion);

      console.log(formData);

      const response = axios.patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club`,
        formData
      );

      navigate(`/club/no/${clubNo}`);
    } catch (error) {
      console.error(error);
    }
  }, [club, selectedFile, clubNo, navigate]);

  return (
    <Box sx={{ marginTop: "64px" }}>
      <TextField
        fulWidth
        label="clubName"
        name="clubName"
        onChange={onChangeClub}
        required
        value={club.clubName}
      />
      <TextField
        fulWidth
        label="clubIntro"
        name="clubIntro"
        onChange={onChangeClub}
        required
        value={club.clubIntro}
      />
      <TextField
        fulWidth
        label="clubRegion"
        name="clubRegion"
        onChange={onChangeClub}
        required
        value={club.clubRegion}
      />
      <TextField
        fulWidth
        label="clubImg"
        name="clubImg"
        onChange={onChangeClub}
        required
        value={club.clubImg}
      />
      <TextField
        fulWidth
        label="filterGender"
        name="filterGender"
        onChange={onChangeClub}
        required
        value={club.filterGender}
      />
      <TextField
        fulWidth
        label="filterMinAge"
        name="filterMinAge"
        onChange={onChangeClub}
        required
        value={club.filterMinAge}
      />
      <TextField
        fulWidth
        label="filterMaxAge"
        name="filterMaxAge"
        onChange={onChangeClub}
        required
        value={club.filterMaxAge}
      />
      <TextField
        fulWidth
        label="clubMaxMemberNo"
        name="clubMaxMemberNo"
        onChange={onChangeClub}
        required
        value={club.clubMaxMemberNo}
      />
      <TextField
        fulWidth
        label="clubState"
        name="clubState"
        onChange={onChangeClub}
        required
        value={club.clubState}
      />

      <TextField
        fulWidth
        label="clubNo"
        name="clubNo"
        onChange={onChangeClub}
        required
        value={club.clubNo}
      />
      <Stack direction="row" spacing={2} alignItems={"center"} marginLeft="5px">
        <Button
          variant="outlined"
          startIcon={
            <Avatar>
              <AddPhotoAlternateIcon />
            </Avatar>
          }
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "grey",
            width: "150px",
            height: "150px",
          }}
          size="large"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            id="file"
            name="file"
            onChange={onChangeImg}
          />
        </Button>
        <ImageListItem>
          {selectedImage && <img src={selectedImage} />}
        </ImageListItem>
      </Stack>
      <Button onClick={handleSubmit}>수정하기</Button>
    </Box>
  );
};

export default UpdateClub;
