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
import CountryPickerInput from '../common/PickerInput/CountryPickerInput';
import DropDownComponent from '../common/DropDown/DropDownComponent';

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
  {label: 'Other', value: '3'},
];
const PersonalDetailForm: React.FC<Props> = ({
  onCancel,
  personalDetails,
  updateDetails,
  data,
  goToNextIndex,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleDateChange = (handleChange: any, date: any) => {
    handleChange('dob')(date);
  };

  const submitHandler = async (values: any) => {
    let payload: personalDetailInterface = {
      agentId: Number(data?.id),
      fullName: values?.name,
      phoneNumber: values?.mobileNo,
      countryCode:values?.code ,
      email: values?.email,
      gender: values?.gender,
      dateOfBirth: values?.dob,
      address: values?.address,
    };
    console.log('payload', payload);
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
        if (statusCode === 200) {
          updateDetails(data);
        }
      }
      goToNextIndex();
    } catch (err) {
      console.log('Personal Detail Error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: data?.name ?? '',
        email: data?.email ?? '',
        code: personalDetails?.countryCode ?? '',
        mobileNo: personalDetails?.phoneNumber ?? '',
        dob: moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD') ?? '',
        gender: personalDetails?.gender ?? '',
        address: personalDetails?.address ?? '',
      }}
      validationSchema={personaDetailsValidation}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
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
          <Text style={styles.inputlabel}>{'Phone No'}</Text>
          <View style={styles.phoneConatiner}>
            <View style={styles.countryCode}>
              <CountryPickerInput
                countryCode={values?.code}
                onChange={(text: any) => handleChange('code')(text)}
              />
            </View>
            <View style={styles.number}>
              <CustomTextInput
                placeholder={'Eg: 7860965109'}
                label={'Phone No'}
                name={'mobileNo'}
                value={values.mobileNo}
                onChangeText={text => handleChange('mobileNo')(text)}
                errors={errors}
                touched={touched}
              />
            </View>
          </View>

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
            value={values.dob}
            handleChange={handleChange}
            onChange={handleDateChange}
          />
          <CustomTextInput
            placeholder={''}
            label={'Residential Address'}
            value={values.address}
            name={'address'}
            onChangeText={text => handleChange('address')(text)}
            errors={errors}
            touched={touched}
          />
          <View style={styles.lower}>
            <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton
                  title={personalDetails ? 'Update' : 'Save & Next'}
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
  dropDown: {},
  inputlabel: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
  phoneConatiner: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
    verticalAlign: 'middle',
    borderWidth: 1,
    borderRadius: 10,
    gap: 0,
  },
  countryCode: {
    flex: 2,
  },
  number: {
    flex: 10,
    paddingTop: 7,
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
