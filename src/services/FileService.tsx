import { ApiConstants } from "../constants/ApiConstants";
import API from "./ApiService";


const uploadImage = async (file: any) =>{
    const formData = new FormData();
    formData.append("image", file);
    let url = `${ApiConstants.baseUrl}${ApiConstants.uploadImage}`;
    const res = await API({}, url, "POST", formData);
    return res?.data;
}

export default {uploadImage}