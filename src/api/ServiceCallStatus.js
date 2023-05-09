import client from "./client3";

// const getServiceCallStatus = (CardCode) => client.get(`/GetServiceCallStatus?CardCode=${CardCode}`);
const getServiceCallStatus = (CardCode) => client.get(`/GetServiceCallStatusByCustomer?CardCode=C000016`);



export default {
    getServiceCallStatus,
};