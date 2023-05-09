import client from "./client3";

const getAllVatGroups = () => client.get(`/GetVatGroup`);

export default {
    getAllVatGroups,
};