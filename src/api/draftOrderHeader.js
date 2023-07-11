import client from "./client3";

// const getAllStock= (pageSize,offSet) => client.get(`/ViewStockPosition?pageSize=30&offSet=0`);
const getDrfatOrderHead= (Docentry) => client.get(`/GetSaleOrderFromDraft?DocEntry=${Docentry}`);

const getDrfatOrderHeadUP= (Docentry) => client.get(`/SaleOrderApi/GetPendingSalesOrderByDocNum?DocNum=${Docentry}`);



export default {
    getDrfatOrderHead,
    getDrfatOrderHeadUP,
};