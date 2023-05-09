import client from "./client3";

const getDrfatOrdersList= (slp) => client.get(`/SaleOrderApi/PendingOrderList?CardCode=${slp}`);

export default {
    getDrfatOrdersList,
};
