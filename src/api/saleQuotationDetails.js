import client from "./client3";

const getSaleQuotationDetails = (docNum) => client.get(`/SaleOrderApi/GetSaleQuotationDetails?DocNum=${docNum}`);

export default {
    getSaleQuotationDetails,
};
