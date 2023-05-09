import client from "./client3";

const getSaleQuotations = (slp,docDate) => client.get(`/SaleOrderApi/GetSalesQuotitationbySalesPerson?slpCode=${slp}`);

export default {
    getSaleQuotations,
};

