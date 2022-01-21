import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import homeImg from "../../shared/images/club-2.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";

const titleStyle = {
  fontWeight: "bolder",
  paddingX: 1,
  textTransform: "uppercase",
};

const Home = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid>
          <Typography component="h2" sx={titleStyle}>
            le fou fou
          </Typography>
        </Grid>
        <Grid>
          <Typography sx={titleStyle}>jokes blagues</Typography>
        </Grid>
        <Grid>
          <Typography sx={titleStyle}>rire now</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <LazyLoadImage
          alt=""
          effect="blur"
          src={homeImg}
          style={{ objectFit: "contain", width: "100%" }}
        />
      </Grid>
    </>
  );
};

export default Home;
