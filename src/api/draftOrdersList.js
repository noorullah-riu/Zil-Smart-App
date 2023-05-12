import client from "./client3";

const getDrfatOrdersList= (slp) => client.get(`/SaleOrderApi/PendingOrderList?SlpCode=${slp}`);

export default {
    getDrfatOrdersList,
};
