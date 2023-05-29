import {ApiConstant} from '../constant/ApiConstant';
import API from './apiBase';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
let userInstance: agentServices;

class agentServices {
  static getInstance() {
    if (userInstance instanceof agentServices) {
      return userInstance;
    } else {
      return new agentServices();
    }
  }

  // Verify gent Service
  verifyAgent = async (payload: any) => {
    let url = ApiConstant.verifyAgent;
    console.log("Url", url);
    let res = await API(payload,url, 'POST');
    if(res?.status === ApiConstant.successCode){
      Toast.show({
        type: 'success',
        text2: 'Request Sent Sucessfully.'
      }); 
    }
    return;
  };
  
}

export default agentServices;
