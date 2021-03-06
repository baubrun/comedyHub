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
  const [values, setValues] = useState({
    calendarViewShow: false,
    listViewShow: true,
    venue: "",
    startDate: "",
    events: [],
  });

  const fetchEvents = async (venue) => {
    try {
      dispatch(showLoader());
      const result = await eventService.getEventsByVenue(venue);
      setValues((prev) => ({ ...prev, events: result?.events }));
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
    if (venues.length > 0) setValues({ venue: venues?.[0]?._id });
  }, [venues]);

  useEffect(() => {
    if (values?.venue) fetchEvents(values?.venue);
  }, [values?.venue]);

  const handleVenueChange = (event) => {
    setSelectDirty(true);
    setValues((prev) => ({ ...prev, venue: event.target.value }));
  };

  const showEvents = () => {
    if (values?.events?.length < 1 && !isLoading) {
      return (
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          {selectDirty && "no events found"}
        </Typography>
      );
    }

    if (values?.events?.length > 0) {
      return (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={2}
          rowSpacing={2}
          columns={{ xs: 1 }}
          wrap="wrap"
        >
          {values?.events
            ?.filter((event) =>
              event?.venue?.toLowerCase().includes(values?.venue?.toLowerCase())
            )
            .map((event, idx) => (
              <Grid item key={idx}>
                <Event event={event} key={idx} venue={values?.venue} />
              </Grid>
            ))}
        </Grid>
      );
    }
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
              value={values?.venue || ""}
              onChange={handleVenueChange}
              label="Venue"
              sx={{ textTransform: "uppercase" }}
            >
              {venues?.map((v, idx) => (
                <MenuItem
                  key={idx}
                  value={v?._id}
                  sx={{ textTransform: "uppercase" }}
                >
                  {v?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item id="events-body">
          {showEvents()}
        </Grid>
      </Grid>
    </>
  );
};

export default Events;
