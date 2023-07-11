import client from "./client3";

const getSaleQuotations = (slp, docDate) => client.get(`/SaleOrderApi/GetSalesQuotitationbySalesPerson?slpCode=${slp}`);

const getSaleQuotationsDate = (slp, fdate, tdate) => client.get(`/SaleOrderApi/GetSalesQuotationByDate?fromDate=${fdate}&toDate=${tdate}&slpCode=${slp}`);




export default {
    getSaleQuotations,
    getSaleQuotationsDate,
};

