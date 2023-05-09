import client from "./client";

const getGroupItems = (code) =>
  client.get(`/SaleOrderApi/GetAllSAPItems`);

export default {
  getGroupItems,
};
