import moment from "moment";

export const baseUrl = "http://localhost:5000/api";

export const dateFormat = () => moment().format("DD-MM-YYYY");

export const timeFormat = () => moment(moment().hour(21)).startOf("H").format("H:mm")
