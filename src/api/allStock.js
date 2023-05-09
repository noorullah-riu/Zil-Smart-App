import client from "./client3";

const getAllStock = () => client.get(`/ViewStockPosition`);
// const getAllStock= (pageSize,offSet) => client.get(`/ViewStockPosition?pageSize=${pageSize}&offSet=${offSet}`);

export default {
  getAllStock,
};
