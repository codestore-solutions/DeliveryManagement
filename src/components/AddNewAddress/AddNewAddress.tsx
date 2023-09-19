import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MultiSelect} from 'react-native-element-dropdown';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';
import {Formik} from 'formik';
import {addAddresschema} from '../../utils/validations/addressValidation';
import {
  addNewWorkingLocationInterface,
  updateWorkingLocationInterface,
} from '../../utils/types/addressTypes';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import AddressService from '../../services/AddressService';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ApiConstant} from '../../constant/ApiConstant';
import {
  generateDaysArray,
  generateIdArray,
  generateLabelArray,
} from '../../utils/helpers/GetLabelByValue';

interface Props {
  onCancel: () => void;
  addressDetail: any;
}

const allDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const AddNewAddress: React.FC<Props> = ({onCancel, addressDetail}) => {
  const {data} = useAppSelector((state: RootState) => state.auth);
  const [selectedDays, setSelectedDays] = useState<Array<any>>(
    generateDaysArray(addressDetail?.selectedDays) ?? [],
  );
  const [timeSlots, setTimeSlots] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const addAddressHandler = async (values: any) => {
    let payload: addNewWorkingLocationInterface = {
      agentId: Number(data?.id),
      locationName: values?.location,
      address: values?.address,
      timeSlotIds: values?.dayAndtime?.timeSlotIds,
      selectedDays: values?.dayAndtime?.days,
    };
    try {
      setLoading(true);
      if (addressDetail) {
        const updatepayload: updateWorkingLocationInterface = {
          locationName: values?.location,
          address: values?.address,
          timeSlotIds: values?.dayAndtime?.timeSlotIds,
          selectedDays: values?.dayAndtime?.days,
        };
        // console.log('payload', payload)
        const {statusCode} = await AddressService.updateWorkingLocation(
          updatepayload,
          addressDetail?.id,
        );
        if (statusCode === ApiConstant.successCode) {
          onCancel();
        }
      } else {
        const {statusCode} = await AddressService.addNewWorkingLocation(
          payload,
        );
        if (statusCode === ApiConstant.successCode) {
          onCancel();
        }
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  const addValue = (value: any, setFieldValue: any, formTag: any) => {
    setFieldValue(formTag, value);
  };

  const handleDayPress = (day: any, setFeildValue: any) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(selectedDay => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    addValue(updatedDays, setFeildValue, 'dayAndtime.days');
  };

  const getTimeSlots = async () => {
    try {
      const {statusCode, data} = await AddressService.getTimeSlots();
      if (statusCode === ApiConstant.successCode) {
        const dropDownData = generateLabelArray(data);
        setTimeSlots(dropDownData);
      }
    } catch (err) {
      console.log('TimeSlots Fetching Error', err);
    }
  };

  useEffect(() => {
    getTimeSlots();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1, height:'100%', overflow: 'scroll'}}
      behavior="padding"
      keyboardVerticalOffset={-300}>
      <Formik
        initialValues={{
          location: addressDetail?.locationName ?? '',
          address: addressDetail?.address ?? '',
          dayAndtime: {
            days: generateDaysArray(addressDetail?.selectedDays) ?? [],
            timeSlotIds: generateIdArray(addressDetail?.agentTimeSlots) ?? [],
          },
        }}
        validationSchema={addAddresschema}
        onSubmit={addAddressHandler}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={[styles.container, styles.formContainer]}>
                 <ScrollView style={{marginBottom: 60}}>
            <Text style={styles.heading}>
              Please fill the following details
            </Text>
       
              <View style={styles.form}>
                <CustomTextInput
                  label={'Location'}
                  name="location"
                  onChangeText={handleChange('location')}
                  value={values.location}
                  errors={errors}
                  touched={touched}
                />
                <CustomTextInput
                  label={'Address'}
                  name="address"
                  onChangeText={handleChange('address')}
                  value={values.address}
                  errors={errors}
                  touched={touched}
                />

                <View >
                  <Text style={styles.label}>
                    Select Days{' '}
                    <Text
                      style={{
                        color: 'red',
                        fontWeight: '700',
                        paddingLeft: 3,
                        paddingBottom: 5,
                      }}>
                      *
                    </Text>
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{flexGrow: 1}}>
                    <View style={styles.timeLine}>
                      {allDays?.map(item => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.timeLintBtn,
                            selectedDays.includes(item) && styles.activeBtn,
                          ]}
                          onPress={() => handleDayPress(item, setFieldValue)}>
                          <Text
                            style={[
                              styles.timeLintBtnText,
                              selectedDays.includes(item) && styles.activeText,
                            ]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
                {errors.dayAndtime && (
                  <Text style={styles.errorMessage}>
                    {errors.dayAndtime.days}
                  </Text>
                )}
                <View >
                  <Text style={styles.label}>
                    Select Time Slot{' '}
                    <Text
                      style={{
                        color: 'red',
                        fontWeight: '700',
                        paddingLeft: 3,
                        paddingBottom: 5,
                      }}>
                      *
                    </Text>
                  </Text>
                  <View >
                    <View>
                      <MultiSelect
                        style={styles.dropdown}
                        data={timeSlots}
                        autoScroll={true}
                        activeColor="#CCCCCC"
                        labelField="label"
                        selectedStyle={{
                          borderRadius: 8,
                          borderColor: '#CCCCCC',
                        }}
                        valueField="value"
                        placeholder="Select time slot"
                        value={values.dayAndtime.timeSlotIds}
                        onChange={(selectedItems: any) =>
                          setFieldValue('dayAndtime.timeSlotIds', selectedItems)
                        }
                      />
                    </View>
                  </View>
                </View>
                {errors.dayAndtime?.timeSlotIds && (
                  <Text style={styles.errorMessage}>
                    {errors.dayAndtime.timeSlotIds}
                  </Text>
                )}
              </View>
            </ScrollView>
            <View style={styles.lower}>
              <View style={styles.btnConatiner}>
                <View style={ {width: '50%'}}>
                  <CustomButton
                    disabled={loading}
                    title={addressDetail ? 'Update' : 'Add Location'}
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

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 6,
    flex: 1,
    // position:'relative'
  },
  dropdown: {
    height: 48,
    paddingHorizontal: 5,
    borderRadius: 6,
    backgroundColor: 'transparent',
    borderColor: '#7E8299',
    borderWidth: 0.5,
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  timeLine: {
    marginVertical: 6,
    paddingVertical: 5,
    paddingHorizontal: 0,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  timeLintBtn: {
    marginHorizontal: 1,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    marginRight: 15,
    elevation: 0.8,
  },
  activeBtn: {
    backgroundColor: '#3E3AFF',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
    shadowColor: '#3E3AFF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  activeText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  timeLintBtnText: {
    fontWeight: '500',
    fontSize: 16,
  },
  form: {
    marginBottom: 200, 
  },
  lower: {
    // width: '100%',
    // bottom: -10,
    // position:'absolute',
    // marginLeft: 5,
    // marginBottom: 10,
  },
  btnConatiner: {
     display: 'flex',
    // paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 5,
   
  },
});
