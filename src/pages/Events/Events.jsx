import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Event from "../../components/Event/Event";
import TitleBar from "../../shared/TitleBar/TitleBar";
import { useTheme } from "@mui/material";
import { hideLoader, showLoader, showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";
import eventService from "../../services/events";

const Events = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { venues } = useSelector((s) => s.venues);
  const { isLoading } = useSelector((s) => s.layout);
  const [selectDirty, setSelectDirty] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState({ _id: "", name: "" });
  const [events, setEvents] = useState([]);

  const fetchEvents = async (venue) => {
    try {
      dispatch(showLoader());
      const results = await eventService.getEventsByVenue(venue);
      setEvents(results?.events);
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
    const venue = venues?.[0];
    if (venue) {
      setSelectedVenue(venue);
      fetchEvents(venue?._id);
    }
  }, [venues]);

  const handleVenueChange = (evt) => {
    setSelectDirty(true);
    const found = venues.find((venue) => venue?.name === evt?.target?.value);
    setSelectedVenue(found);
    fetchEvents(found?._id);
  };

  return (
    <>
      <TitleBar text="events" />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <FormControl
            variant="outlined"
            sx={{
              margin: theme.spacing(1),
              minWidth: 120,
              borderColor: theme.palette.secondary.main,
            }}
          >
            <InputLabel id="select">Venue</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={selectedVenue?.name ?? ""}
              onChange={(venue) => handleVenueChange(venue)}
              label="Venue"
              sx={{ textTransform: "uppercase" }}
            >
              {venues?.map((venue, idx) => (
                <MenuItem
                  key={idx}
                  value={venue?.name}
                  sx={{ textTransform: "uppercase" }}
                >
                  {venue?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item id="events-body">
          {!events?.length && !isLoading ? (
            <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
              {selectDirty && "no events found"}
            </Typography>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              columns={{ xs: 1 }}
              wrap="wrap"
            >
              {events.map((event, idx) => (
                <Grid item key={idx}>
                  <Event event={event} key={idx} venue={event?.venue?.name} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Events;
