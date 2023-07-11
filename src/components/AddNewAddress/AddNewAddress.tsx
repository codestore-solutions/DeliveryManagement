import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import SelectTimeScreen from '../DayandTime/SelectTimeScreen';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';
import { Formik } from 'formik';
import { addAddresschema } from '../../utils/validations/addressValidation';
import { addNewWorkingLocationInterface } from '../../utils/types/addressTypes';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import AddressService from '../../services/AddressSevice';

interface Props {
  onCancel: () => void;
}

const AddNewAddress: React.FC<Props> = ({ onCancel }) => {
  const {data} = useAppSelector((state: RootState) => state.auth);
  const addAddressHandler =  (values: any) => {
    let payload: addNewWorkingLocationInterface = {
        deliveryAgentId: Number(data?.id),
        locationName:values?.location,
        address: values?.address,
        fromTime: values?.dayAndtime?.fromTime,
        toTime:  values?.dayAndtime?.toTime,
        selectDays:  values?.dayAndtime?.days,
    }

      AddressService.addNewWorkingLocation(payload).then((res) =>{
           console.log("Res", res);
      });
  };

  const addValue = (value:any, setFieldValue:any, formTag:any) => {
    // Set the value of the number field here...
    setFieldValue(formTag, value)
}
  return (
    <Formik
      initialValues={{
        location: '',
        address: '',
        dayAndtime: {
          days: [],
          fromTime: '',
          toTime: '',
        },
      }}
      validationSchema={addAddresschema}
      onSubmit={addAddressHandler}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.heading}>Please fill the following details</Text>
          <View style={styles.form}>
            <CustomTextInput
              label={'Location'}
              name="location"
              onChangeText={handleChange('location')}
              value={values.location}
              errors={errors}
            />
            <CustomTextInput
              label={'Address'}
              name="address"
              onChangeText={handleChange('address')}
              value={values.address}
              errors={errors}
            />
            <SelectTimeScreen
              handleChange={handleChange}
              setFeildValue={setFieldValue}
              addValue={addValue}
              errors={errors}
            />
          </View>
          <View style={styles.btnConatiner}>
            <View style={{ width: '50%' }}>
              <CustomButton title={'Add Details'} onPress={handleSubmit} />
            </View>
            <View style={{ width: '50%' }}>
              <CustomButton
                title={'Cancel'}
                outline={true}
                onPress={onCancel}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  form: {
    marginBottom: 55,
  },
  btnConatiner: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
