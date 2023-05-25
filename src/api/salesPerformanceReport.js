import client from "./client3";

const getSalesPerformanceReport = (fDate, tDate) =>
  client.get(
    `/SaleOrderApi/MonthlySalesPerformanceReport?fromdate=${fDate}&todate=${tDate}`
  );

export default {
  getSalesPerformanceReport,
};
