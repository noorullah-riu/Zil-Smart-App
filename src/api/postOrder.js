import client from "./client3";

const postOrder = (saleOrder) => client.post("/SAPAPI/PostSaleOrder",saleOrder);

const updateOrder = (saleOrder) => client.post("/SAPAPI/UpdateSalesOrder",saleOrder);

const PostPartner = (saleOrder) => client.post("/SaleOrderApi/PostBusinessPartner",saleOrder);


export default {
    postOrder,
    updateOrder,
    PostPartner
};
