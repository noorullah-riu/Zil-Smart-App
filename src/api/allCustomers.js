import client from "./client";

const getAllCustomers = (code) =>
  client.get(`/SaleOrderApi/GetCustomer?SlpCode=${code}`);

  const getAllEmploess = (code) =>
  client.get(`/SaleOrderApi/GetAllSalesPerson`);

  const getRegionsAll = (code) =>
  client.get(`/BusinessPartner/GetAllRegions`);

  const getAllSAPItems = () =>
  client.get(`/SaleOrderApi/GetAllSAPItems`);

  
  const getAllSAPItemsReportRelated = () =>
  client.get(`/SaleOrderApi/GetAllSAPItemsForJumboBatchReport`);

  const GetItemsForInventoryReport = () =>
  client.get(`/SaleOrderApi/GetItemsForInventoryReport`);

  

  
export default {
  getAllCustomers,
  getAllSAPItems,
  getRegionsAll,
  getAllEmploess,
  getAllSAPItemsReportRelated,
  GetItemsForInventoryReport,
};
