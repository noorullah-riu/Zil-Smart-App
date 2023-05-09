import client from "./client3";

const purchaseRequest = (purchaseReq) =>
  client.post("/PostPurchaseRequest", purchaseReq);

export default {
  purchaseRequest,
};
