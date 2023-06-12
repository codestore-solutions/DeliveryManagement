import date from './CustomizeDate'
import { v4 as uuidv4 } from 'uuid';
const AvilableOrderData = (data:any) =>{

   let obj = {
    key: "",
       orderId: "",
       storename:"",
       paymentType:"",
       shippingAddress:"",
       date:"",
   };
   let newData = data.map((item:any) =>{
        obj.key = uuidv4(),
        obj.orderId = item.id,
        obj.storename = item.store.name,
        obj.paymentType = item.paymentMode,
        obj.shippingAddress = item.shippingAddressId,
        obj.date =  date.getDate(item.createdAt);
        return obj;

   })
   console.log("Res", newData);
   return newData;
}


export  default {
    AvilableOrderData 
};