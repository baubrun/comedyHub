import moment from "moment";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "add heroku here"
    : "http://localhost:5000/api";

export const compareDates = (a, b) => {
  let dateA = new Date(a.startDate);
  let dateB = new Date(b.startDate);
  return dateA - dateB;
};

export const dateFormat = (date) => {
  if (!date) return "";
  return moment(date).format("DD-MM-YYYY");
};
