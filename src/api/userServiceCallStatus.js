import client from "./client3";

// const getServiceCallStatus = (CardCode) => client.get(`/GetServiceCallStatus?UserCode=${CardCode}`);
const getServiceCallStatus = (UserCode) =>
  client.get(`/GetServiceCallStatus?UserCode=TECH02`);

export default {
  getServiceCallStatus,
};
