import moment from 'moment';

const getDate = (date:any) =>{
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
}


function getCurrentTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return timestamp;
  }
export default {
     getDate,
     getCurrentTimestamp
}