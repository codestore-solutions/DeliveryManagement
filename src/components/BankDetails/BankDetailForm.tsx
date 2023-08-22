import {View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import CustomButton from '../common/CustomButton/CustomButton';
import {bankDetailvalidationSchema} from '../../utils/validations/userValidation';
import styles from './DetailStyle';
import {bankDetailInterface} from '../../utils/types/UserTypes';
import AgentServices from '../../services/AgentServices';

interface Props {
  onCancel: () => void;
  data: any;
  bankDetails: any;
  updateDetails: (data: any) => void;
  notFound: boolean;
  goToPrevIndex:any;
  goToNextIndex:any;
}

const BankDetailForm: React.FC<Props> = ({
  onCancel,
  data,
  bankDetails,
  notFound,
  updateDetails,
  goToPrevIndex,
  goToNextIndex
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandler = async (values: any) => {
    let payload: bankDetailInterface = {
      agentId: Number(data?.id),
      accountHolderName: values?.name,
      bankName: values?.bankname,
      ifscCode: values?.ifsccode,
      accountNumber: values?.accountNumber,
    };
    console.log('payload', payload);
    try {
      setLoading(true);
      if (bankDetails) {
        const {data, statusCode} = await AgentServices.updatebankDetail(
          payload,
          bankDetails?.id,
        );
        if (statusCode === 200) updateDetails(data);
      } else {
        const {data, statusCode} = await AgentServices.addBankDetails(payload);
        if (statusCode === 200){
          updateDetails(data);
         
        } 
      }
      goToNextIndex()
    } catch (err) {
      console.log('Add Vechile Detail Error', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        name: bankDetails?.accountHolderName ?? '',
        bankname: bankDetails?.bankName ?? '',
        ifsccode: bankDetails?.ifscCode ?? '',
        accountNumber: bankDetails?.accountNumber ?? '',
      }}
      validationSchema={bankDetailvalidationSchema}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
          <CustomTextInput
            placeholder={''}
            label={'Account Holder Name'}
            name={'name'}
            value={values.name}
            onChangeText={text => handleChange('name')(text)}
            errors={errors}
            touched={touched}
          />
          <CustomTextInput
            placeholder={'Eg: State Bank of India'}
            label={'Bank Name'}
            value={values.bankname}
            name={'bankname'}
            onChangeText={text => handleChange('bankname')(text)}
            errors={errors}
            touched={touched}
          />
          <CustomTextInput
            placeholder={'Bank IFSC code'}
            label={'IFSC Code'}
            name={'ifsccode'}
            value={values.ifsccode}
            onChangeText={text => handleChange('ifsccode')(text)}
            errors={errors}
            touched={touched}
          />
          <CustomTextInput
            placeholder={'Enter your Account Number...'}
            label={'Account Number'}
            name={'accountNumber'}
            value={values.accountNumber}
            onChangeText={text => handleChange('accountNumber')(text)}
            errors={errors}
            touched={touched}
          />
          <View style={styles.lower}>
            <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton
                  title={bankDetails ? 'Update' : 'Save'}
                  disabled={loading}
                  onPress={handleSubmit}
                />
              </View>
              {!notFound ? (
                <View style={{width: '50%'}}>
                  <CustomButton
                    title={'Cancel'}
                    outline={true}
                    onPress={onCancel}
                  />
                </View>
              ) :(
                <View style={{width: '50%'}}>
                <CustomButton
                  title={'Go Back'}
                  outline={true}
                  onPress={goToPrevIndex}
                />
              </View>
              )}
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default BankDetailForm;
