import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TitleBar = ({ text }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "black" }}
    >
      <Grid item>
        <Typography variant="h5" sx={{ color: "white" }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TitleBar;
