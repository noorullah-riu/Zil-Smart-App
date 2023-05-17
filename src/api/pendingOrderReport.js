import client from "./client3";

const getPOHeaderDetails = (slp) =>
  client.get(`/SaleOrderApi/PendingOrderReport?SlpCode=${slp}`);

export default {
  getPOHeaderDetails,
};
