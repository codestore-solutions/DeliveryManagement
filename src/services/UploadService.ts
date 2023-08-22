import { ApiConstant } from '../constant/ApiConstant';
import axios from '../utils/intercepters/axios';

const UploadService = {
  uploadImage: async (fileInfo: any) => {
    const { path, mime } = fileInfo;

    try {
      const formData = new FormData();
      formData.append('File', {
        uri: `file://${path}`,
        type: mime,
        name: 'image.jpg',
      });

      const url = `${ApiConstant.baseUrl}${ApiConstant.uploadImage}`;
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
