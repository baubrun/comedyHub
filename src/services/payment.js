import axios from "axios";
import { baseUrl } from "../shared/helpers";

const createPayment = async (payment) => {
  const { data } = await axios.post(`${baseUrl}/payment`, payment);
  return data;
};

const paymentService = {
  createPayment,
};

export default paymentService;
