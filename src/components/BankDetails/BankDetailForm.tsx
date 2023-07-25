import { View } from 'react-native';
import React,{useState} from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import CustomButton from '../common/CustomButton/CustomButton';
import { bankDetailvalidationSchema } from '../../utils/validations/userValidation';
import styles from './DetailStyle'
import { bankDetailInterface } from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';

interface Props{
  onCancel: () => void;
  data: any;
  bankDetails: any;
  updateDetails: (data:any) => void;
}

const BankDetailForm:React.FC<Props>= ({onCancel, data, bankDetails, updateDetails}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandler = async (values: any) => {
    let payload: bankDetailInterface ={
      deliveryAgentId: Number(data?.id),
      yourName: values?.name,
      bankName: values?.bankname,
      ifscCode: values?.ifsccode,
      accountNumber: values?.accountNumber
    }
    console.log('payload', payload);
    try {
      setLoading(true);
      if (bankDetails) {
        const {data, statusCode} = await AgentServices.updatebankDetail(
          payload,
          bankDetails?.id,
        );
        if(statusCode === 200) updateDetails(data);
      } else {
        const {data, statusCode} = await AgentServices.addBankDetails(payload);
        if(statusCode === 200) updateDetails(data);
      }
    } catch (err) {
      console.log('Add Vechile Detail Error', err);
    } finally{
        setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        name:  bankDetails?.yourName ?? '',
        bankname: bankDetails?.bankName ?? '',
        ifsccode:bankDetails?.ifscCode ?? '',
        accountNumber:bankDetails?.accountNumber ?? '',
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
                <CustomButton title={ bankDetails ?'Update':'Add'} disabled={loading}  onPress={handleSubmit}/>
             
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