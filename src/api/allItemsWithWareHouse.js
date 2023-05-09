import client from "./client3";
const getItemsWithWareHouse = (itemGroupCode,itemCode) => client.get(`/GetAllItemsWithWareHouse/?ItemGroupCode=${itemGroupCode}&ItemCode=${itemCode}`);
export default {
  getItemsWithWareHouse,
};
// 2- change posting owner to logged in sales user
// 3- ledger report record issue
//4-
