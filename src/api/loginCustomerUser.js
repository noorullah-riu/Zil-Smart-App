import client from "./client";

const loginCustomerUser = (CustomerCode, PhoneNumber) => client.get(`/SAPCustomerLogin/?CustomerCode=${CustomerCode}&PhoneNumber=${PhoneNumber}&FCMToken=gfg`);

export default {
    loginCustomerUser,
};
