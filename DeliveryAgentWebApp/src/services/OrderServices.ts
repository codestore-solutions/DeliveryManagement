import { ApiContants } from "../constants/ApiContants";
import HttpsServices from "./HttpsServices";

let OrderInstance: OrderServices;

class OrderServices {
  private HttpsIntance = HttpsServices.getAxiosInstance();
  static getInstance() {
    if (OrderInstance instanceof OrderServices) {
      return OrderInstance;
    } else {
      return new OrderServices();
    }
  }

  getOrderList = async (deliveryType: Number, isOrderAssigned:Number) => {
    let url = `${ApiContants.getOrders}?deliveryType=${deliveryType}&isOrderAssigned=${isOrderAssigned}`;
    console.log("endpint", url);
    let response = await this.HttpsIntance.getRequest(url);
    return response;
  };
  
}

export default OrderServices;
