import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { addToCart } from "../../redux/cartSlice";
import { dateFormat } from "../../shared/helpers";
import { hideLoader, showLoader, showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";
import eventService from "../../services/events";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CART_PAGE } from "../../shared/constants/navigation";

const useStyles = makeStyles((theme) => ({
  btn: {
    fontWeight: "bolder",
    letterSpacing: "2px",
  },
  grid: {
    backgroundColor: "black",
    color: "white",
    margin: "5% 0",
  },
  large: {
    width: 450,
    height: 450,
  },
  listItem: {
    fontFamily: "Courier Prime",
  },
}));

const EventDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [event, setEvent] = useState(undefined);

  const fetchEvent = async () => {
    try {
      dispatch(showLoader());
      const result = await eventService.getEvent(id);
      setEvent(result?.event);
    } catch (err) {
      dispatch(
        showToaster({
          message: err?.response ? err?.response.data : err?.message,
          status: STATUS_ERROR,
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleReserve = () => {
    dispatch(addToCart(event));
    history.push(CART_PAGE.path);
  };

  if (!event) return null;

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Avatar
          className={classes.large}
          alt={event?.title}
          src={require(`../../shared/uploads/${event?.image}`)}
        />
      </Grid>
      <Grid item>
        <List>
          <ListItem>
            <Button
              className={classes.btn}
              color="secondary"
              onClick={() => handleReserve()}
              size="large"
              variant="contained"
            >
              <Typography sx={{ textTransform: "uppercase" }}>
                reserve
              </Typography>
            </Button>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography
                className={classes.listItem}
                variant="h5"
              >{`Title: ${event?.title}`}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                {`Date: ${dateFormat(event?.startDate)}`}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                {`Time: ${event?.startTime}`}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography
                variant="h5"
                className={classes.listItem}
                sx={{ textTransform: "capitalize" }}
              >
                {`Venue: ${event?.venue?.name}`}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography className={classes.listItem} variant="h5">
                {`Performer: ${event?.performer}`}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h5" className={classes.listItem}>
                {`Price: ${event?.price} $`}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Box sx={{ display: "flex" }}>
              {event?.socialMedia?.facebook && (
                <Box sx={{ mr: 4 }}>
                  <FacebookIcon />
                </Box>
              )}
              {event?.socialMedia?.instagram && (
                <Box sx={{ mr: 4 }}>
                  <InstagramIcon />
                </Box>
              )}
              {event?.socialMedia?.twitter && (
                <Box sx={{ mr: 4 }}>
                  <TwitterIcon />
                </Box>
              )}
            </Box>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default EventDetail;
