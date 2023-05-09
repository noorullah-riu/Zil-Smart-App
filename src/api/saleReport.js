import client from "./client3";

const getSalesReport = (fDate, tDate, code) =>
    client.get(
        `/SaleOrderApi/GetSalesInvoiceReport?FromDate=${fDate}&ToDate=${tDate}&cardCode=${code}`
    );     
const getSalesReportDetail = (docNum) =>
    client.get(
        `/SaleOrderApi/GetSalesInvoiceReportDetail?DocNum=${docNum}`
    );
const getInventoryReport = (from,to,code) =>
  //RM000027
     client.get(
        `/SaleOrderApi/GetJumboBatchWiseItem?itemcode=${code}&fromdate=${from}&todate=${to}`
    ); 
// const getSalesReport = (fDate, tDate, code) => client.get(`/GetSalesReport?FromDate=2018-01-10&ToDate=2021-01-10&SAPUserCode=ACCOUNT01`);

export default {
    getSalesReport,
    getSalesReportDetail,
    getInventoryReport
};
