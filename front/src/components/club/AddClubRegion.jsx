import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useClubFormStore from "@hooks/club/useClubFormStore";

const AddClubRegionTest = () => {
  const [sidoOptions, setSidoOptions] = useState([]);
  const [sigoonOptions, setSigoonOptions] = useState([]);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedSigoon, setSelectedSigoon] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const { clubRegion, onChangeField, setClubRegion } = useClubFormStore();

  const hasValuesBeenSet = useRef(false);

  useEffect(() => {
    if (
      !hasValuesBeenSet.current ||
      (typeof finalValue !== "undefined" && finalValue !== clubRegion)
    ) {
      setClubRegion(finalValue);
      hasValuesBeenSet.current = true;
    }
  }, [finalValue, clubRegion, setClubRegion]);

  useEffect(() => {
    if (typeof finalValue !== "undefined" && finalValue !== clubRegion) {
      setClubRegion(finalValue);
    }
  }, [finalValue, clubRegion, setClubRegion]);

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/club/region/sigu`)
      .then((response) => {
        let options = [{ value: "", label: "시도선택" }];
        response.data.response.result.featureCollection.features.forEach(
          (f) => {
            console.log("f:", f);
            let 행정구역코드 = f.properties.ctprvn_cd;
            let 행정구역명 = f.properties.ctp_kor_nm;
            options.push({
              value: 행정구역코드,
              label: 행정구역명,
            });
          }
        );
        setSidoOptions(options);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedSido) return;

    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/region/sigungu/${selectedSido}`
      )
      .then((response) => {
        let options = [{ value: "", label: "시군구선택" }];
        response.data.response.result.featureCollection.features.forEach(
          (f) => {
            let 행정구역코드 = f.properties.sig_cd;
            let 행정구역명 = f.properties.sig_kor_nm;
            options.push({
              value: 행정구역코드,
              label: 행정구역명,
            });
          }
        );
        setSigoonOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedSido]);

  const handleSidoChange = (event) => {
    let thisVal = event.target.value;
    setSelectedSido(thisVal);
  };

  const handleSigoonChange = (event) => {
    let thisVal = event.target.value;
    setSelectedSigoon(thisVal);
  };

  const handleChooseClick = () => {
    let selectedTextOne = "";
    let selectedTextTwo = "";

    if (selectedSido) {
      selectedTextOne =
        sidoOptions.find((option) => option.value === selectedSido)?.label ||
        "";
    }

    if (selectedSigoon) {
      selectedTextTwo =
        sigoonOptions.find((option) => option.value === selectedSigoon)
          ?.label || "";
    }

    let finalValue = `${selectedTextOne} ${selectedTextTwo}`;
    console.log(finalValue);
    setFinalValue(finalValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="sido-select-label">시도 선택</InputLabel>
            <Select
              labelId="sido-select-label"
              value={selectedSido}
              onChange={handleSidoChange}
              label="시도 선택"
            >
              {sidoOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="sigoon-select-label">
              시군구 선택(미선택시 시도전체)
            </InputLabel>
            <Select
              labelId="sigoon-select-label"
              value={selectedSigoon}
              onChange={handleSigoonChange}
              label="시군구 선택(미선택시 시도전체)"
            >
              {sigoonOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleChooseClick} variant="contained">
            선택
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="clubRegion"
            name="clubRegion"
            onChange={(e) => onChangeField("clubRegion", e)}
            placeholder="Please enter text"
            required
            value={finalValue}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddClubRegionTest;
