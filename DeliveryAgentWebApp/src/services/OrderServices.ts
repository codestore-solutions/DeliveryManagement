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

  getOrderList = async (pageNumber: string, limit:string) => {
    let url = `${ApiContants.getOrders}?pageNumber=${pageNumber}&limit=${limit}`;
    // console.log("endpint", url);
    let response = await this.HttpsIntance.getRequest(url);
    return response;
  };
  
}

export default OrderServices;
