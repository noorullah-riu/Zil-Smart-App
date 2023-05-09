import client from "./client";

const getAllCustomers = (code) =>
  client.get(`/SaleOrderApi/GetCustomer?SlpCode=${code}`);

  const getAllSAPItems = () =>
  client.get(`/SaleOrderApi/GetAllSAPItems`);

  
export default {
  getAllCustomers,
  getAllSAPItems,
};
