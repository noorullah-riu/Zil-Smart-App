import client from "./client3";

// const getAllDeliveries = (cardcode,date,userCode) => client.get(`/GetAllDeliveries?cardcode=${cardcode}&date=${date}&userCode=${userCode}`);
const getAllDeliveries = (cardcode,date,userCode) => client.get('/GetAllDeliveries?cardcode=C000001&date=2021-12-13&userCode=manager');


export default {
    getAllDeliveries,
};