import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import { bankDetailvalidationSchema } from '../../utils/validations/userValidation';
import styles from './DetailStyle'


const BankDetailForm:React.FC<{onCancel: () => void;}>= ({onCancel}) => {
  
  const submitHandler = (values: any) => {
    console.log('values', values);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        bankname: '',
        ifsccode: '',
        accountNumber: '',
      }}
      validationSchema={bankDetailvalidationSchema}
      onSubmit={(values) => submitHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
          <CustomTextInput
            placeholder={'Enter your name..'}
            label={'Your Name'}
            name={'name'}
            value={values.name}
            onChangeText={text => handleChange('name')(text)}
            errors={errors}
          />
          <CustomTextInput
            placeholder={'Eg: State Bank of India'}
            label={'Bank Name'}
            value={values.bankname}
            name={'bankname'}
            onChangeText={text => handleChange('bankname')(text)}
            errors={errors}
          />
          <CustomTextInput
            placeholder={'Bank IFSC code'}
            label={'IFSC Code'}
            name={'ifsccode'}
            value={values.ifsccode}
            onChangeText={text => handleChange('ifsccode')(text)}
            errors={errors}
          />
         <CustomTextInput
            placeholder={'Enter your Account Number...'}
            label={'Account Number'}
            name={'accountNumber'}
            value={values.accountNumber}
            onChangeText={text => handleChange('accountNumber')(text)}
            errors={errors}
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
  )
}

export default BankDetailForm