import client from "./client3";

const getCurrencyRate = (date) => client.get(`/GetCurrencyRate?Date=${date}`);
// const getDeliveryDetails = (docNum) => client.get(`/GetDeliveryDetails?DocNum=${docNum}`);

export default {
    getCurrencyRate,
};
