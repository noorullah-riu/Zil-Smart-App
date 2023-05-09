import client from "./client3";

// const getCustomerDetails = (CardCode) => client.get(`/GetCustomerBasedOnCardCode?CardCode=${CardCode}`);
const getCustomerDetails = (CardCode) => client.get(`/GetCustomerBasedOnCardCode?CardCode=C000016`);

                                                       
export default {
    getCustomerDetails,
};