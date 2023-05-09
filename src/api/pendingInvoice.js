import client from "./client3";

const getpendingInvoices = (date, userCode) =>
  client.get(
    `/GetPendingInvoiceCustomersNames?UserCode=ACCOUNT01&Date=2021-01-18`
  );
// const getAllDeliveries = (date,userCode) => client.get(`/GetPendingInvoiceCustomersNames?UserCode=${userCode}&Date=${date}`);

export default {
  getpendingInvoices,
};
