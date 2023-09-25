import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import {CameraIcon, GalleryIcon} from '../../assets';
import globalStyle from '../../global/globalStyle';
import ImagePicker, {Image as CropImage} from 'react-native-image-crop-picker';

interface Props {
  title?: string;
  setSelectedImage: Function;
  closeModal: () => void;
  selectedImage: any;
  uploadImage: (selectedImage: any) => Promise<void>;

}

const UploadImage: React.FC<Props> = ({
  setSelectedImage,
  title,
  closeModal,
  uploadImage,
 
}) => {
  const selectImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.8, 
      compressImageMaxWidth: 1000, 
      compressImageMaxHeight: 1000,
      compressImageMaxSize: 2 * 1024 * 1024,
    })
      .then((image: CropImage) => {
        setSelectedImage(image);
        uploadImage(image);
        closeModal();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const takePicture = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.8, 
      compressImageMaxWidth: 1000, 
      compressImageMaxHeight: 1000,
      compressImageMaxSize: 2 * 1024 * 1024,
    })
      .then((image: CropImage) => {
        setSelectedImage(image);
        uploadImage(image)
          .then(res => console.log('res', res))
          .catch(err => console.log('err', err));
        closeModal();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        console.log('grant', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const data = {
            status: 1,
            message: 'Camera permission granted',
          };
          console.log(data);
          return data;
        } else {
          const data = {
            status: 2,
            message: 'Camera permission denied',
          };
          Alert.alert(
            'Camera Permission Denied',
            'Please grant camera permission to use this feature.',
          );
          return data;
        }
      } catch (error) {
        const data = {
          status: 1,
          message: 'Error' + error,
        };
        return data;
      }
    }
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        console.log('Storage Permission Result:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const data = {
            status: 1,
            message: 'Storage permission granted',
          };
          return data;
        } else {
          const data = {
            status: 2,
            message: 'Storage permission denied',
          };
          Alert.alert(
            'Storage Permission Denied',
            'Please grant storage permission to use this feature.',
          );
          return data;
        }
      } catch (error) {
        const data = {
          status: 1,
          message: 'Error' + error,
        };
        return data;
      }
    }
  };
  const takePhotoWithCamera = () => {
    requestCameraPermission().then(res => {
      if (res?.status === 1) {
        takePicture();
      }
    });
  };
  const takePhotoFromStorage = () => {
    requestStoragePermission().then(res => {
      if (res?.status === 1) {
        selectImage();
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>{title ? title : 'Choose Option'}</Text>
      </View>
      {/* <View style={styles.image}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage?.path}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          />
        )}
      </View> */}
      <View style={styles.content}>
        <Pressable style={styles.iconStyle} onPress={takePhotoWithCamera}>
          <CameraIcon width={55} height={55} />
        </Pressable>
        <Pressable style={styles.iconStyle} onPress={takePhotoFromStorage}>
          <GalleryIcon width={55} height={55} />
        </Pressable>
      </View>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  iconStyle: {
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
  },
});