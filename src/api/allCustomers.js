import client from "./client";

const getAllCustomers = (code) =>
  client.get(`/SaleOrderApi/GetCustomer?SlpCode=${code}`);

  const getAllSAPItems = () =>
  client.get(`/SaleOrderApi/GetAllSAPItems`);

  
  const getAllSAPItemsReportRelated = () =>
  client.get(`/SaleOrderApi/GetAllSAPItemsForJumboBatchReport`);

  
export default {
  getAllCustomers,
  getAllSAPItems,
  getAllSAPItemsReportRelated,
};
