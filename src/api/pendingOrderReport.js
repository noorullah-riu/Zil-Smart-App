import client from "./client3";

const getPOHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/PendingOrderReport?SlpCode=${slp}`);

  const getDailyRecievableHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/DailyRecievableReport?SlpCode=${slp}`);

export default {
  getPOHeaderDetails,
  getDailyRecievableHeaderDetails,
};
