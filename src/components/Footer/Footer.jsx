import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={trigger}>
      {children}
    </Slide>
  );
};

const Footer = () => {
  return (
    <>
      <HideOnScroll>
        <AppBar
          color="secondary"
          position="fixed"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                  comedy hub &copy; 2022
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Footer;
