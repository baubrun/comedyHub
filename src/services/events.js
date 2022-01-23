import axios from "axios";
import { baseUrl } from "../shared/helpers";

const getEvent = async (id) => {
  const { data } = await axios.get(`${baseUrl}/events/event/${id}`);
  return data;
};

const getEvents = async () => {
  const { data } = await axios.get(`${baseUrl}/events/`);
  return data;
};

const getEventsByVenue = async (venueId) => {
  const { data } = await axios.get(`${baseUrl}/events/venue/${venueId}`);
  return data;
};

const eventService = {
  getEvent,
  getEvents,
  getEventsByVenue,
};

export default eventService;
