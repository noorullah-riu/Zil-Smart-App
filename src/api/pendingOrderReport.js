import client from "./client3";

const getPOHeaderDetails = (slp,Customer) =>
  client.get(`/SaleOrderApi/PendingOrderReport?SlpCode=${slp}&CardCode=${Customer}`);

  const getDailyRecievableHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/DailyRecievableReport?SlpCode=${slp}`);

export default {
  getPOHeaderDetails,
  getDailyRecievableHeaderDetails,
};
