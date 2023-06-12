import moment from 'moment';


const getDate = (date:any) =>{
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
}

export default {
     getDate
}