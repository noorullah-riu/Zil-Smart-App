import client from "./client3";

const getApprovedSaleOrders = (slp) => client.get(`/SaleOrderApi/GetSaleOrderBySalesPerson?slpCode=${slp}`);
const getApprovedSaleOrderDate = (slp,Fdate,Tdate) => client.get(`/SaleOrderApi/GetSalesOrderByDate?FromDate=${Fdate}&ToDate=${Tdate}&slpCode=${slp}`);
// const getApprovedSaleOrders = (slp) => client.get(`/GetApprovedSalesOrderfromDraft?slpCode=19`);



export default {
    getApprovedSaleOrders,
    getApprovedSaleOrderDate,
};
