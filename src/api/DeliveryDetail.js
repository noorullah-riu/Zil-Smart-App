import client from "./client3";

const getDeliveryDetails = (docNum) => client.get(`/GetDeliveryDetails?DocNum=${docNum}`);

export default {
    getDeliveryDetails,
};