import client from "./client";

const getAllActivities = (id) => client.get(`/SaleOrderApi/GetBusinessPartnerActivity?UserId=${id}`);

const getStats1 = (slp) => client.get(`/SaleOrderApi/GetCurrentMonthSalesEmployeeWise?slpcode=${slp}`);
const getStats2 = (slp) => client.get(`/SaleOrderApi/GetCurrentMonthSalesEmployeeItemWise?slpcode=${slp}`);
const getStats3 = (slp) => client.get(`/SaleOrderApi/GetEmployeeWiseSixMonthSales?slpcode=${slp}`);

export default {
    getAllActivities,
    getStats1,
    getStats2,
    getStats3
};