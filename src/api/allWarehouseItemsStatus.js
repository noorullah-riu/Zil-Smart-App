import client from "./client3";

const getAllWarehouseItemsStatus = (code) =>
  client.get(`/GetItemDetailsAgainstViewStock?ItemCode=${code}`);

export default {
  getAllWarehouseItemsStatus,
};
