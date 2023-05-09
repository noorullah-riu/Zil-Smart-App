import client from "./client3";

const getAllCurrencies= () => client.get("/GetSAPCurrency");

export default {
    getAllCurrencies,
};
