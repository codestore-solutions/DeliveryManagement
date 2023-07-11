import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import {
  personaDetailsValidation,
  vechileDetailvalidationSchema,
} from '../../utils/validations/userValidation';
import styles from './VechileStyle';
import {UploadIcon} from '../../assets';
import {vechleDteailInterface} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';

interface Props {
  onCancel: () => void;
  data: any;
  vechileDetails: any;
  updateDetails: (data: any) => void;
}

const VechileDetailsForm: React.FC<Props> = ({
  onCancel,
  data,
  vechileDetails,
  updateDetails,
}) => {
  const handleDateChange = (handleChange: any, date: any) => {
    // Custom logic for handling date changes
    console.log('Selected date:', date);
    handleChange('dob')(date);
    // Update the state or perform any other necessary operations
  };

  const submitHandler = async (values: any) => {
    let payload: vechleDteailInterface = {
      deliveryAgentId: Number(data?.id),
      vehicleType: values?.vechileType,
      model: values?.model,
      companyName: values?.company,
      numberPlate: values?.numberPlate,
      vehicleImageUrl: 'https://unsplash.com/s/photos/bike',
      registrationNumber: values?.registrationNumber,
    };
    console.log('payload', payload);
    try {
      if (vechileDetails) {
        const {data} = await AgentServices.updateVechileDetail(
          payload,
          vechileDetails?.id,
        );
        updateDetails(data);
      } else {
        const {data} = await AgentServices.addVechileDetails(payload);
        console.log("Add Vec", data);
        updateDetails(data);
      }
    } catch (err) {
      console.log('Add Vechile Detail Error', err);
    }
  };
  return (
    <Formik
      initialValues={{
        vechileType: vechileDetails ? vechileDetails?.vehicleType: '',
        company:vechileDetails ? vechileDetails?.companyName: '',
        model:vechileDetails ? vechileDetails?.model: '',
        numberPlate:vechileDetails ? vechileDetails?.numberPlate: '',
        registrationNumber:vechileDetails ? vechileDetails?.registrationNumber : '',
        image: vechileDetails ? vechileDetails?.vehicleImageUrl: 'https://unsplash.com/s/photos/bike',
      }}
      validationSchema={vechileDetailvalidationSchema}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
          <ScrollView style={{marginBottom: 60}}>
            <CustomTextInput
              placeholder={'ComboBox'}
              label={'Vehicle Type'}
              name={'vechileType'}
              value={values.vechileType}
              onChangeText={text => handleChange('vechileType')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: Hero'}
              label={'Company Name'}
              value={values.company}
              name={'company'}
              onChangeText={text => handleChange('company')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: 2013'}
              label={'Model'}
              name={'model'}
              value={values.model}
              onChangeText={text => handleChange('model')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: 123sddsd'}
              label={'Number Plate'}
              name={'numberPlate'}
              value={values.numberPlate}
              onChangeText={text => handleChange('numberPlate')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: 123sddsd'}
              label={'Registration Number'}
              name={'registrationNumber'}
              value={values.registrationNumber}
              onChangeText={text => handleChange('registrationNumber')(text)}
              errors={errors}
            />
            <View style={styles.image}>
              <Text style={styles.label}>Vehicle Image</Text>
              <View style={styles.imageConatiner}>
                <UploadIcon width={70} height={70} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.lower}>
            <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton title={'Add Details'} onPress={handleSubmit} />
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
  );
};

export default VechileDetailsForm;
