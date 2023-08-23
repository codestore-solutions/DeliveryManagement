import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
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
import {
  uploadImageInterface,
  vehicleDetailInterface,
} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';
import DropDownComponent from '../common/DropDown/DropDownComponent';
import UploadService from '../../services/UploadService';
import {ApiConstant} from '../../constant/ApiConstant';

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
    console.log('payload', payload);
    try {
      setLoading(true);
      if (vechileDetails) {
        const {data} = await AgentServices.updateVechileDetail(
          payload,
          vechileDetails?.id,
        );
        updateDetails(data);
      } else {
        const {data} = await AgentServices.addVehicleDetails(payload);
        console.log('Add Vec', data);
        updateDetails(data);
      }
      goToNextIndex();
    } catch (err) {
      console.log('Add Vehicle Detail Error', err);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (setFeildValue: any) => {
    ImagePicker.openPicker({
      cropping: false,
    })
      .then((image: any) => {
        uploadImage(image, setFeildValue);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const uploadImage = async (image: any, setFieldValue: any) => {
    const {statusCode, data} = await UploadService.uploadImage(image);
    if (statusCode === ApiConstant.successCode) {
      if (data.urlFilePath) {
        setFieldValue('image', data.urlFilePath);
        console.log('data.urlFilePath', data.urlFilePath);
      }
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
          image: vechileDetails?.vehicleImageUrl ?? '',
        }}
        // validationSchema={vehicleDetailValidationSchema}
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
                  onChange={(text: any) => handleChange('vechileType')(text)}
                  label={'Vechile Type'}
                />
              </View>
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
                  style={styles.imageContainer}
                  onPress={() => selectImage(setFieldValue)}>
                  {values?.image !== '' ? (
                    <Image source={{uri: values?.image}} />
                  ) : (
                    <UploadIcon width={70} height={70} />
                  )}
                </Pressable>
              </View>
            </ScrollView>
            <View style={styles.lower}>
              <View style={styles.btnContainer}>
                <View style={{width: '50%'}}>
                  <CustomButton
                    disabled={loading}
                    title={vechileDetails ? 'Update' : 'Save & Next'}
                    onPress={handleSubmit}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <CustomButton
                    title={'Cancel'}
                    outline={true}
                    onPress={onCancel}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default VechileDetailsForm;
