import client from "./client3";

const getSalesCommissionReport = (fDate, tDate) =>
  client.get(
    `/SaleOrderApi/SalesCommissionReport?fromdate=${fDate}&todate=${tDate}`
  );

export default {
  getSalesCommissionReport,
};
