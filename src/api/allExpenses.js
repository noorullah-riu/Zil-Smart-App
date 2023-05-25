import client from "./client3";

const getAllExpenses = (fdate,userCode) => client.get(`/SaleOrderApi/GetIncomingPaymentSales?Date=${fdate}&UserCode=${userCode}`);
  // /SaleOrderApi/GetIncomingPaymentSales?Date=2023-05-13&UserCode=1
export default {
    getAllExpenses,
};
