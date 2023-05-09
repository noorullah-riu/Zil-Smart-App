import client from "./client3";

const getSaleOrderDetails = (docNum) => client.get(`/GetSaleorderDetail?DocNum=${docNum}`);

export default {
    getSaleOrderDetails,
};