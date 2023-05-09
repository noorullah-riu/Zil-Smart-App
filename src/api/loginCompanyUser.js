import client from "./client2";

const loginCompanyUser = (UserCode, Password) =>
  client.get(
    `/SaleOrderApi/SAPUserLogin?UserCode=${UserCode}&Password=${Password}`
  );

export default {
  loginCompanyUser,
};
