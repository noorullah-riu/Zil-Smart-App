import client from "./client3";

const postQuotation = (saleOrder) => client.post("/SAPAPI/PostSalesQuotation",saleOrder);


export default {
    postQuotation,
};
