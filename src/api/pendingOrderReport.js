import client from "./client3";

const getPOHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/PendingOrderReport?SlpCode=1&CardCode=C00007`);

  const getDailyRecievableHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/DailyRecievableReport?SlpCode=${slp}`);

export default {
  getPOHeaderDetails,
  getDailyRecievableHeaderDetails,
};
