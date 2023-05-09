import client from "./client3";

const getOpenInvoices = (date, cardCode) =>
  client.get(`/GetOpenInvoices?CardCode=C000087&Date=2021-12-02`);
// const getAllDeliveries = (date,cardCode) => client.get(`/GetOpenInvoices?CardCode=${cardCode}&Date=${date}`);

export default {
  getOpenInvoices,
};
