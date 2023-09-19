import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {
  personaDetailsValidation,
  vehicleDetailValidationSchema,
} from '../../utils/validations/userValidation';
import styles from './VechileStyle';
import {UploadIcon} from '../../assets';
import {vehicleDetailInterface} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';
import DropDownComponent from '../common/DropDown/DropDownComponent';
import UploadService from '../../services/UploadService';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../common/Loader/Loader';

interface Props {
  onCancel: () => void;
  data: any;
  vechileDetails: any;
  updateDetails: (data: any) => void;
  goToNextIndex: any;
}

const vehicleType = [
  {label: 'Motorcycle', value: '1'},
  {label: 'Scooter', value: '2'},
  {label: 'GearlessMotorcycle', value: '3'},
  {label: 'Scooty', value: '4'},
];
const VechileDetailsForm: React.FC<Props> = ({
  onCancel,
  data,
  vechileDetails,
  updateDetails,
  goToNextIndex,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUpLoading, setFileUploading] = useState<boolean>(false);
  const submitHandler = async (values: any) => {
    let payload: vehicleDetailInterface = {
      agentId: Number(data?.id),
      vehicleType: Number(values?.vechileType),
      manufacturedYear: values?.manufacturedYear,
      vehicleModel: values?.model,
      company: values?.company,
      vehicleImage: values?.image,
      registrationNumber: values?.registrationNumber,
    };
    try {
      setLoading(true);
      if (vechileDetails) {
        const {data, statusCode} = await AgentServices.updateVechileDetail(
          payload,
          vechileDetails?.id,
        );
        if (statusCode === ApiConstant.successCode) {
          updateDetails(data);
          onCancel();
        }
      } else {
        const {data, statusCode} = await AgentServices.addVehicleDetails(
          payload,
        );
        if (statusCode === ApiConstant.successCode) {
          updateDetails(data);
          goToNextIndex();
        }
      }
    } catch (err) {
      console.log('Add Vehicle Detail Error', err);
    } finally {
      setLoading(false);
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true; // Permission granted
        } else {
          Alert.alert(
            'Storage Permission Denied',
            'Please grant storage permission to use this feature.',
          );
          return false; // Permission denied
        }
      } catch (error) {
        console.error('Error requesting storage permission: ', error);
        return false; // Permission denied (due to an error)
      }
    } else {
      return true; // On platforms other than Android, assume permission is granted
    }
  };

  const selectImage = async (setFieldValue: any) => {
    const hasPermission = await requestStoragePermission();
    if (hasPermission) {
      ImagePicker.openPicker({
        cropping: false,
      })
        .then((image: any) => {
          uploadImage(image, setFieldValue);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const takePhotoFromStorage = async (setFieldValue: any) => {
    const hasPermission = await requestStoragePermission();
    if (hasPermission) {
      selectImage(setFieldValue);
    }
  };
  const uploadImage = async (image: any, setFieldValue: any) => {
    try {
      setFileUploading(true);
      const {statusCode, data} = await UploadService.uploadImage(image);
      if (statusCode === ApiConstant.successCode) {
        if (data.urlFilePath) {
          setFieldValue('image', data.urlFilePath);
          console.log('data.urlFilePath', data.urlFilePath);
        }
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, overflow: 'scroll'}}
      behavior="padding"
      keyboardVerticalOffset={-300}>
      <Formik
        initialValues={{
          vechileType: vechileDetails?.vehicleType ?? '',
          company: vechileDetails?.company ?? '',
          model: vechileDetails?.vehicleModel ?? '',
          manufacturedYear: vechileDetails?.manufacturedYear ?? '',
          registrationNumber: vechileDetails?.registrationNumber ?? '',
          image: vechileDetails?.vehicleImage ?? '',
        }}
        validationSchema={vehicleDetailValidationSchema}
        onSubmit={values => submitHandler(values)}>
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          touched,
          errors,
        }) => (
          <View style={[globalStyle.container, styles.formContainer]}>
            <ScrollView style={{marginBottom: 60}}>
              <View style={styles.dropDown}>
                <DropDownComponent
                  data={vehicleType}
                  value={values.vechileType}
                  onChange={(text: any) => {
                    handleChange('vechileType')(text);
                    setFieldValue('vechileType', text);
                  }}
                  label={'Vechile Type'}
                />
              </View>
              {touched.vechileType && errors.vechileType && (
                <Text style={styles.errorMessage}>
                  Vehicle Type is required
                </Text>
              )}

              <CustomTextInput
                placeholder={'Eg: Hero'}
                label={'Company Name'}
                value={values.company}
                name={'company'}
                onChangeText={text => handleChange('company')(text)}
                errors={errors}
                touched={touched}
              />
              <CustomTextInput
                placeholder={'e.g Activa, Access 125, CT-100'}
                label={'Vehicle Model'}
                name={'model'}
                value={values.model}
                onChangeText={text => handleChange('model')(text)}
                errors={errors}
                touched={touched}
              />
              <CustomTextInput
                placeholder={'Eg: 2013'}
                label={'ManufacturedYear'}
                name={'manufacturedYear'}
                value={values.manufacturedYear}
                onChangeText={text => handleChange('manufacturedYear')(text)}
                errors={errors}
                touched={touched}
              />
              <CustomTextInput
                placeholder={'Eg: 123sddsd'}
                label={'Registration Number'}
                name={'registrationNumber'}
                value={values.registrationNumber}
                onChangeText={text => handleChange('registrationNumber')(text)}
                errors={errors}
                touched={touched}
              />
              <View style={styles.image}>
                <Text style={styles.label}>Vehicle Image</Text>
                <Pressable
                  style={
                    !values?.image
                      ? styles.imageContainer
                      : styles.imageContainerImage
                  }
                  onPress={() => takePhotoFromStorage(setFieldValue)}>
                  {values?.image ? (
                    fileUpLoading ? (
                      <Loader />
                    ) : (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: values?.image + `?${new Date()}`}}
                          style={{
                            width: '100%',
                            height: 198,
                            resizeMode: 'contain',
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    )
                  ) : fileUpLoading ? (
                    <Loader />
                  ) : (
                    <UploadIcon width={30} height={30} />
                  )}
                </Pressable>
              </View>
              {touched && errors?.image && (
                <Text style={styles.errorMessage}>
                  Profile Image is required
                </Text>
              )}
            </ScrollView>
            <View style={styles.lower}>
              <View style={styles.btnContainer}>
                <View
                  style={!vechileDetails ? {width: '100%'} : {width: '50%'}}>
                  <CustomButton
                    disabled={loading}
                    title={vechileDetails ? 'Update' : 'Save & Next'}
                    onPress={handleSubmit}
                  />
                </View>
                {vechileDetails && (
                  <View style={{width: '50%'}}>
                    <CustomButton
                      title={'Cancel'}
                      outline={true}
                      onPress={onCancel}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default VechileDetailsForm;
