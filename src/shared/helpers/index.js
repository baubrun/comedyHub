import moment from "moment";

export const dateFormat = (date) => {
  if (!date) return "";
  return moment(date).format("LL");
};
