import client from "./client3";

const markAttendance = (userCode,userName,checkIn,date,checkInLocation,checkOut) => client.post(`/MarkAttendance?userCode=${userCode}&userName=${userName}&CheckIn=${checkIn}&Date=${date}&CheckInLocation=${checkInLocation}&CheckOut=${checkOut}`);
// const markAttendance = (userCode,userName,checkIn,date,checkInLocation,checkOut) => client.post('/MarkAttendance?userCode=manager&userName=B1SiteUser&CheckIn=7%3A10%3A24%20AM&Date=2022-01-8&CheckInLocation=PND&CheckOut=7%3A50%3A24%20AM');
// userCode,userName,currentTime,date,currentLocation,currentTime
export default {
    markAttendance,
};