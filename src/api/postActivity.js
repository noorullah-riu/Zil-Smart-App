import client from "./client";

const postActivity = (activity) => client.post("/SaleOrderApi/PostBPActivity",activity);


export default {
    postActivity,
};