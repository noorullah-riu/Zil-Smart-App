import client from "./client3";

const postExpense = (expense) => client.post("/SaleOrderApi/PostIncomingPaymentSales", expense);

const updateExpense = (expense) => client.put("/SaleOrderApi/UpdateIncomingPaymentSales", expense);

const deleteExpense = (id) => client.delete(`/SaleOrderApi/DeleteIncomingPaymentSales?docEntry=${id}`);

export default {
  postExpense,
  updateExpense,
  deleteExpense
};
