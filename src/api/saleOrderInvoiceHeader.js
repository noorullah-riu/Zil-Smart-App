import client from "./client3";

const getSaleOrderInvoiceHeader = (docEntry) => client.get(`/GetSalesOrderByDocNum?DocNum=${docEntry}`);

export default {
    getSaleOrderInvoiceHeader,
};
