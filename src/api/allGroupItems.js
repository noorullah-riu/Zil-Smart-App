import client from "./client";

const getGroupItems = (code) =>
  client.get(`/SaleOrderApi/GetAllSAPItemsAgainstMainCategories?category=${code}`);

export default {
  getGroupItems,
};
