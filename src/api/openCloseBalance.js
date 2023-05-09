import client from "./client3";

const getOpenAndCloseBalance = (cardcode,toDate,fromDate) => client.get(`/GetOpenAndCloseBalance?FromDate=${fromDate}&ToDate=${toDate}&cardCode=${cardcode}`);
export default {
    getOpenAndCloseBalance,
};