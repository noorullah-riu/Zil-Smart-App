import client from "./client3";

const getDraftOrderTable= (docEntry) => client.get(`/SaleOrderApi/GetSaleOrderDetails?DocNum=${docEntry}`);

const getDraftOrderNew= (docEntry) => client.get(`/SaleOrderApi/GetPendingSaleOrderDetails?DocEntry=${docEntry}`);

const getDraftOrderTableUP= (docEntry) => client.get(`/SaleOrderApi/GetPendingSaleOrderDetails?DocNum=${docEntry}`);


export default {
    getDraftOrderTable,
    getDraftOrderTableUP,
    getDraftOrderNew,
};
