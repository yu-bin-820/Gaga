import AddClub1 from "@components/club/AddClub1";
import AddClubName from "@components/club/AddClubName";
import AddClubRegion from "@components/club/AddClubRegion";
import AddClubImg from "@components/club/AddClubImg";
import ListCategory from "@components/meeting/ListCategory";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";

const AddClub = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        //return <SelectClubType />;
        return <ListCategory />;
      case 1:
        return <AddClubName />;
      case 2:
        return <AddClubImg />;
      case 3:
        return <AddClubRegion />;
      case 4:
        return <AddClub1 />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Box sx={{ marginTop: "64px" }}>
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <React.Fragment>
        {getStepContent(activeStep)}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
      </React.Fragment>
    </Box>
  );
};

export default AddClub;
