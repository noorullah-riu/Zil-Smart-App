import client from "./client";

const getAllCustomers = (code) =>
  client.get(`/SaleOrderApi/GetCustomer?SlpCode=${code}`);

  const getAllSAPItems = () =>
  client.get(`/SaleOrderApi/GetAllSAPItems`);

  
  const getAllSAPItemsReportRelated = () =>
  client.get(`/SaleOrderApi/GetAllSAPItemsForJumboBatchReport`);

  const GetItemsForInventoryReport = () =>
  client.get(`/SaleOrderApi/GetItemsForInventoryReport`);

  

  
export default {
  getAllCustomers,
  getAllSAPItems,
  getAllSAPItemsReportRelated,
  GetItemsForInventoryReport,
};
