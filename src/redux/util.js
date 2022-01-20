export let baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api";

export default baseUrl;
