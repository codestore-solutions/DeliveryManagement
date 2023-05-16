import {AxiosResponseInterceptors} from '../utils/Interceptors/AxiosInterceptors';
import API from './ApiBase'
let axiosInstance: HttpsServices;
class HttpsServices {
  constructor() {
    AxiosResponseInterceptors();
  }
  static getAxiosInstance() {
    if (axiosInstance instanceof HttpsServices) {
      return axiosInstance;
    } else {
      return new HttpsServices();
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

export default HttpsServices;
