import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        {/* <img sx={classes.homeImg} src="/images/club-2.jpg" alt="" /> */}
        {/* <LazyLoadImage
          alt=""
          effect="blur"
          src="/images/club-2.jpg"
          style={{ objectFit: "cover" }}
        /> */}
      </Grid>
    </>
  );
};

export default Home;
