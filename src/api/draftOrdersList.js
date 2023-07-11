import client from "./client3";

const getDrfatOrdersList = (slp) => client.get(`/SaleOrderApi/PendingOrderList?SlpCode=${slp}`);

const getDrfatOrdersListDate = (slp, fdate, tdate) => client.get(`/SaleOrderApi/PendingOrderList?SlpCode=${slp}&fromDate=${fdate}&toDate=${tdate}`);



export default {
    getDrfatOrdersList,
    getDrfatOrdersListDate,
};
