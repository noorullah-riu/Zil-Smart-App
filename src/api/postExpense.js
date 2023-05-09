import client from "./client3";

const postExpense = (expense) => client.post("/SaleOrderApi/PostIncomingPaymentSales",expense);

export default {
  postExpense,
};
