import client from "./client3";

// const postServiceCall = (
//     cardCode,
//     cardName,
//     ItemCode,
//     ItemDescription,
//     subject,
//     callType,
//     remarks
//   ) =>
//     client.post(`/PostServiceCall/?CardCode=${cardCode}
//   &CardName=${cardName}&SerialNo=gfg&ItemCode=${ItemCode}&ItemDescription=${ItemDescription}
//   &Subject=${subject}&callType=${callType}&Remarks=${remarks}`);
const postServiceCall = (
  cardCode,
  cardName,
  ItemCode,
  ItemDescription,
  subject,
  callType,
  remarks
) =>
  client.post(`/PostServiceCall/?CardCode=${cardCode}
&CardName=${cardName}&SerialNo=gfg&ItemCode=${ItemCode}&ItemDescription=${ItemDescription}
&Subject=${subject}&callType=${callType}&Remarks=${remarks}`);

export default {
  postServiceCall,
};
