import client from "./client";

const getGroupOfItems = () => client.get("/SaleOrderApi/GetAllSAPItemGroup");

export default {
  getGroupOfItems,
};
