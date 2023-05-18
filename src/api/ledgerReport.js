import client from "./client3";

const getLedgerReport = (fDate, tDate, code) =>
  client.get(
    `/SaleOrderApi/GetLedgerDetails?FromDate=${fDate}&ToDate=${tDate}&cardCode=${code}`
  );

  const getAgingReport = (code) =>
  client.get(
    `/SaleOrderApi/GetCustomerAgingReport?slpCode=${code}`
  );

  const getJumboRollReport = (code) =>
  client.get(
    `/SaleOrderApi/JumboStockReport`
  );

// const getLedgerReport = (fDate,tDate,code) => client.get(`/GetLedgerDetails?FromDate=2021-01-10&ToDate=2021-12-31&cardCode=C000001`);

export default {
  getLedgerReport,
  getAgingReport,
  getJumboRollReport,
};
