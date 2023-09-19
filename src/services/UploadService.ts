import { ApiConstant } from '../constant/ApiConstant';
import axios from '../utils/intercepters/axios';

const UploadService = {
  uploadImage: async (fileInfo: any) => {
    const { path, mime } = fileInfo;
    console.log('fileInfo', fileInfo)
    try {
      const formData = new FormData();
      const uniqueName = `image_${Date.now()}.jpg`; 
      formData.append('File', {
        uri: `file://${path}`,
        type: mime,
        name: uniqueName,
      });

      const url = `${ApiConstant.baseUrl}${ApiConstant.uploadImage}`;
      console.log('url Image upload', url)
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response?.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },
};

export default UploadService;
