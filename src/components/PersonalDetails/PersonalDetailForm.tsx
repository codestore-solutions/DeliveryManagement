import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
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
    try {
      setLoading(true);
      if (personalDetails) {
        const {data, statusCode} = await AgentServices.updatePersonalDetail(
          payload,
          personalDetails?.id,
        );
        if (statusCode === 200) updateDetails(data);
      } else {
        const {data, statusCode} = await AgentServices.addPersonalDetail(
          payload,
        );
        if (statusCode === 200) updateDetails(data);
      }
    } catch (err) {
      console.log('Personal Detail Error', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        name: personalDetails?.fullName ?? '',
        email: data?.email ?? '',
        mobileNo: personalDetails?.phoneNumber ?? '',
        dob: moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD') ?? '',
        gender: personalDetails?.gender ?? '',
      }}
      validationSchema={personaDetailsValidation}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleSubmit, values, errors}) => (
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
            disabled={true}
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
                <CustomButton
                  title={personalDetails ? 'Update' : 'Add'}
                  onPress={handleSubmit}
                  disabled={loading}
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
