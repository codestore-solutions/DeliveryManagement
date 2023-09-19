import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import * as Yup from 'yup';
import React, {useState, useRef} from 'react';
import {Formik, useFormikContext} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import {personalDetailInterface} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';
import moment from 'moment';
import CountryPickerInput from '../common/PickerInput/CountryPickerInput';
import DropDownComponent from '../common/DropDown/DropDownComponent';
import {ApiConstant} from '../../constant/ApiConstant';
import UploadService from '../../services/UploadService';
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInput from 'react-native-phone-number-input';
import {UploadIcon} from '../../assets';
import Loader from '../common/Loader/Loader';
import CustomModal from '../common/CustomModal/CustomModal';
import UploadImage from '../UploadImage/UploadImage';

interface Props {
  onCancel: () => void;
  personalDetails: any;
  updateDetails: (data: any) => void;
  data?: any;
  goToNextIndex: () => void;
}

const genderData = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];
const PersonalDetailForm: React.FC<Props> = ({
  onCancel,
  personalDetails,
  updateDetails,
  data,
  goToNextIndex,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imgUpload, setImgUpolad] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);

  const handleDateChange = (handleChange: any, date: any) => {
    handleChange('dob')(date);
  };

  const submitHandler = async (values: any) => {
    const isVaild = phoneInput.current?.isValidNumber(values.mobileNo);
    if (isVaild) {
      const phoneInfo = phoneInput?.current?.state;
      let payload: personalDetailInterface = {
        agentId: Number(data?.id),
        fullName: values?.name,
        phoneNumber: phoneInfo?.number ?? '',
        countryCode: phoneInfo?.code ?? '',
        email: values?.email,
        gender: values?.gender,
        dateOfBirth: values?.dob,
        address: values?.address,
        profileImage: values?.profileImage,
      };
      console.log('payloadPersonal', payload);
      try {
        setLoading(true);
        if (personalDetails) {
          const {data, statusCode} = await AgentServices.updatePersonalDetail(
            payload,
            personalDetails?.id,
          );
          if (statusCode === 200) {
            updateDetails(data);
            onCancel();
          }
        } else {
          const {data, statusCode} = await AgentServices.addPersonalDetail(
            payload,
          );
          if (statusCode === 200) {
            updateDetails(data);
            goToNextIndex();
          }
        }
      } catch (err) {
        console.log('Personal Detail Error', err);
      } finally {
        setLoading(false);
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

  const selectImage = (setFeildValue: any) => {
    ImagePicker.openPicker({
      cropping: false,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageMaxSize: 2 * 1024 * 1024,
    })
      .then((image: any) => {
        uploadImage(image, setFeildValue);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const uploadImage = async (image: any, setFeildValue: any) => {
    try {
      setImgUpolad(true);
      const {statusCode, data} = await UploadService.uploadImage(image);
      if (statusCode === ApiConstant.successCode) {
        if (data.urlFilePath) {
          setFeildValue('profileImage', data.urlFilePath);
        }
      }
    } catch (err) {
      console.log('Image Upload Error', err);
    } finally {
      setImgUpolad(false);
    }
  };
  const takePhotoFromStorage = async (setFieldValue: any) => {
    const hasPermission = await requestStoragePermission();
    if (hasPermission) {
      selectImage(setFieldValue);
    }
  };

  return (
    <KeyboardAvoidingView
    style={{flex: 1, overflow: 'scroll'}}
    behavior="padding"
    keyboardVerticalOffset={-200}>
      <Formik
        initialValues={{
          name: data?.name ?? '',
          email: data?.email ?? '',
          mobileNo: personalDetails?.phoneNumber ?? '',
          dob: moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD') ?? '',
          gender: personalDetails?.gender ?? '',
          address: personalDetails?.address ?? '',
          profileImage: personalDetails?.profileImage ?? '',
        }}
        validationSchema={personaDetailsValidation}
        onSubmit={values => submitHandler(values)}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={[globalStyle.container, styles.formContainer]}>
              <ScrollView style={{marginBottom: 60}}>
            <CustomTextInput
              placeholder={'Enter your name..'}
              label={'Name'}
              name={'name'}
              value={values.name}
              disabled={true}
              onChangeText={text => handleChange('name')(text)}
              errors={errors}
              touched={touched}
            />
            <CustomTextInput
              placeholder={'Eg:abcd@gmail.com'}
              label={'Email'}
              value={values.email}
              name={'email'}
              disabled={true}
              onChangeText={text => handleChange('email')(text)}
              errors={errors}
              touched={touched}
            />
            <Text style={styles.inputlabel}>
              {'Phone No'}
              <Text
                style={{
                  color: 'red',
                  fontWeight: '700',
                  paddingLeft: 3,
                  paddingBottom: 5,
                }}>
                *
              </Text>
            </Text>
            <View>
              <PhoneInput
                ref={phoneInput}
                defaultValue={values.mobileNo}
                defaultCode="IN"
                onChangeFormattedText={text => {
                  handleChange('mobileNo')(text);
                }}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.number}
              />
            </View>
            {touched.mobileNo &&
              !phoneInput.current?.isValidNumber(values.mobileNo) && (
                <Text style={styles.errorMessage}>Invalid phone number</Text>
              )}

            <View style={styles.dropDown}>
              <DropDownComponent
                data={genderData}
                value={values.gender}
                onChange={(text: any) => handleChange('gender')(text)}
                label={'Gender'}
              />
            </View>
            <DateInput
              label={'D.O.B'}
              value={values?.dob}
              handleChange={handleChange}
              onChange={handleDateChange}
            />
            {touched.dob && errors?.dob && (
              <Text style={styles.errorMessage}>{errors?.dob}</Text>
            )}
            <CustomTextInput
              placeholder={''}
              label={'Residential Address'}
              value={values.address}
              name={'address'}
              onChangeText={text => handleChange('address')(text)}
              errors={errors}
              touched={touched}
            />
            <View style={styles.image}>
              <Text style={styles.label}>
                Profile Image{' '}
                <Text
                  style={{
                    color: 'red',
                    fontWeight: '700',
                    paddingLeft: 3,
                    paddingBottom: 5,
                  }}>
                  *
                </Text>
              </Text>
              <Pressable
                style={
                  !values?.profileImage
                    ? styles.imageContainer
                    : styles.imageContainerImage
                }
                onPress={() => takePhotoFromStorage(setFieldValue)}>
                {values?.profileImage ? (
                  imgUpload ? (
                    <Loader />
                  ) : (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: values?.profileImage + `?${new Date()}`}}
                        style={{
                          width: '100%',
                          height: 198,
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                      {/* <UploadIcon width={30} height={30} /> */}
                    </View>
                  )
                ) : imgUpload ? (
                  <Loader />
                ) : (
                  <UploadIcon width={30} height={30} />
                )}
              </Pressable>
            </View>
            {touched.profileImage && errors?.profileImage && (
              <Text style={styles.errorMessage}>Profile Image is required</Text>
            )}
             </ScrollView>
            <View style={styles.lower}>
              <View style={styles.btnContainer}>
                <View
                  style={!personalDetails ? {width: '100%'} : {width: '50%'}}>
                  <CustomButton
                    title={personalDetails ? 'Update' : 'Save & Next'}
                    onPress={handleSubmit}
                    disabled={loading}
                  />
                </View>
                {personalDetails && (
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

export default PersonalDetailForm;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 6,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  lower: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginVertical: 15,
  },
  dropDown: {},
  image: {
    marginVertical: 5,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  imageContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    borderStyle: 'dotted',
  },
  imageContainerImage: {
    height: 200,
    width: '100%',
    display: 'flex',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: '#CCCCCC',
    borderStyle: 'dotted',
  },
  label: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
  inputlabel: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
  phoneContainer: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    zIndex: 1,
  },
  countryCode: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
  },
  number: {
    flex: 1,
    height: 50,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingVertical: 2,
  },

  row: {
    marginVertical: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

const personaDetailsValidation = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  dob: Yup.date().required('Date of birth is required'),
  gender: Yup.string().trim().required('Gender is required'),
  address: Yup.string().trim().required('Address is required'),
  profileImage: Yup.string().required('Profile Image  is required'),
});
