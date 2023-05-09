import client from "./client3";

const getSaleOrders = (slp,docDate) => client.get(`/GetSOBySalePerson?slpCode=${slp}&DocDate=${docDate}`);


export default {
    getSaleOrders,
};