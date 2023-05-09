import client from "./client3";

const getCustomerDetails = (cardCode) =>
  client.get(`/GetCustomerBasedOnCardCode?CardCode=${cardCode}`);

export default {
  getCustomerDetails,
};
