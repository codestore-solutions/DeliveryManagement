import axios from 'axios';
import {axiosResponseInterceptors} from '../utils/intercepters/axiosIntercepters';
import API from './apiBase'
let axiosInstance: axiosHttpsServices;
class axiosHttpsServices {
  constructor() {
    axiosResponseInterceptors();
  }

  static getAxiosInstance() {
    if (axiosInstance instanceof axiosHttpsServices) {
      return axiosInstance;
    } else {
      return new axiosHttpsServices();
    }
  }
  public getRequest(url: string) {
    return API({}, url, 'GET');
  }
  public postRequest(url: string, payload: any) {
    return API(payload, url, 'POST');
  }
  public putRequest(url: string, payload: any) {
    return API(payload, url, 'PUT');
  }
  public deleteRequest(url: string) {
    return API({}, url, 'DELETE');
  }
}

export default axiosHttpsServices;
