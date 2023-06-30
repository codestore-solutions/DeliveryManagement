import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import { personaDetailsValidation } from '../../utils/validations/userValidation';

interface Props {
  onCancel: () => void;
}

const PersonalDetailForm: React.FC<Props> = ({onCancel}) => {
  const handleDateChange = (handleChange: any, date: any) => {
    // Custom logic for handling date changes
    console.log('Selected date:', date);
    handleChange('dob')(date);
    // Update the state or perform any other necessary operations
  };

  const submitHandler = (values: any) => {
    console.log('values', values);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        mobileNo: '',
        dob: '',
        gender: '',
      }}
      validationSchema={personaDetailsValidation}
      onSubmit={(values) => submitHandler(values)}>
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
          <DateInput
            label={'D.O.B'}
            value={values.dob}
            handleChange={handleChange}
            onChange={handleDateChange}
          />
          <View style={styles.lower}>
            <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton title={'Add Details'}  onPress={handleSubmit}/>
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
