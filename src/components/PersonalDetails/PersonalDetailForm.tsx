import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import {personaDetailsValidation} from '../../utils/validations/userValidation';
import {personalDetailInterface} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';
import moment from 'moment';

interface Props {
  onCancel: () => void;
  personalDetails: any;
  updateDetails: (data: any) => void;
  data?: any;
}

const PersonalDetailForm: React.FC<Props> = ({
  onCancel,
  personalDetails,
  updateDetails,
  data,
}) => {
  const handleDateChange = (handleChange: any, date: any) => {
    handleChange('dob')(date);
  };

  const submitHandler = async (values: any) => {
    let payload: personalDetailInterface = {
      deliveryAgentId: Number(data?.id),
      fullName: values?.name,
      phoneNumber: values?.mobileNo,
      email: values?.email,
      gender: values?.gender,
      dateOfBirth: values?.dob,
    };
    if (personalDetails) {
      const {data} = await AgentServices.updatePersonalDetail(
        payload,
        personalDetails?.id,
      );
      updateDetails(data);
    } else {
      const {data} = await AgentServices.addPersonalDetail(payload);
      updateDetails(data);
    }
  };
  return (
    <Formik
      initialValues={{
        name: personalDetails ? personalDetails?.fullName : '',
        email: data ? data?.email : '',
        mobileNo: personalDetails ? personalDetails?.phoneNumber : '',
        dob: personalDetails
          ? moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD')
          : '',
        gender: personalDetails ? personalDetails?.gender : '',
      }}
      validationSchema={personaDetailsValidation}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
          <CustomTextInput
            placeholder={'Enter your name..'}
            label={'Name'}
            name={'name'}
            value={values.name}
            onChangeText={text => handleChange('name')(text)}
            errors={errors}
          />
          <CustomTextInput
            placeholder={'Eg:abcd@gmail.com'}
            label={'Email'}
            value={values.email}
            name={'email'}
            onChangeText={text => handleChange('email')(text)}
            errors={errors}
          />
          <CustomTextInput
            placeholder={'Eg: 7860965109'}
            label={'Phone No'}
            name={'mobileNo'}
            value={values.mobileNo}
            onChangeText={text => handleChange('mobileNo')(text)}
            errors={errors}
          />
          <CustomTextInput
            placeholder={'Eg: Male, Female, Other'}
            label={'Gender'}
            name={'gender'}
            value={values.gender}
            onChangeText={text => handleChange('gender')(text)}
            errors={errors}
          />
          <DateInput
            label={'D.O.B'}
            value={values.dob}
            handleChange={handleChange}
            onChange={handleDateChange}
          />
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

export default PersonalDetailForm;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 6,
    flex: 1,
  },
  lower: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginLeft: 5,
    marginBottom: 15,
  },
  row: {
    marginVertical: 10,
  },
  btnConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
