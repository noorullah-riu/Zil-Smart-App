import client from "./client3";

const getDraftOrderTable= (docEntry) => client.get(`/SaleOrderApi/GetSaleOrderDetails?DocNum=${docEntry}`);

export default {
    getDraftOrderTable,
};
