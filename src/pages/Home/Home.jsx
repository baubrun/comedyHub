import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import homeImg from "../../shared/images/club-2.jpg";

const Home = () => {
  const { venues } = useSelector((s) => s.venues);

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ zIndex: 100 }}
      >
        {
          venues?.map((v, idx) => (
            <Grid item key={idx}>
              <Typography
                component="h2"
                sx={{
                  fontWeight: "bolder",
                  paddingX: 1,
                  textTransform: "uppercase",
                }}
              >
                {v?.name}
              </Typography>
            </Grid>
          ))}
      </Grid>

      <LazyLoadImage
        alt=""
        effect="blur"
        src={homeImg}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default Home;
