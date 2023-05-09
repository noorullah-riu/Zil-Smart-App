import client from "./client3";

const getpendingInvoicesDetail = (date, userCode, cardCode) =>
  client.get(
    `/GetPendingInvoice?UserCode=ACCOUNT01&Date=2021-01-18&CardCode=C000064`
  );
// const getpendingInvoicesDetail = (date,userCode,cardCode) =>
// client.get(`/GetPendingInvoice?UserCode=${userCode}&Date=${date}&CardCode=${cardCode}`);

export default {
  getpendingInvoicesDetail,
};
