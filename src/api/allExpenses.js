import client from "./client3";

const getAllExpenses = (fdate,userCode) => client.get(`/SaleOrderApi/GetIncomingPaymentSales?Date=${fdate}&UserCode=${userCode}`);

export default {
    getAllExpenses,
};
