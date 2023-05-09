import client from "./client3";

const getApprovedSaleOrders = (slp) => client.get(`/SaleOrderApi/GetSaleOrderBySalesPerson?slpCode=${slp}`);
// const getApprovedSaleOrders = (slp) => client.get(`/GetApprovedSalesOrderfromDraft?slpCode=19`);



export default {
    getApprovedSaleOrders,
};
