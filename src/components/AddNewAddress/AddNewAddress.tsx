import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import SelectTimeScreen from '../DayandTime/SelectTimeScreen';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';
import { Formik } from 'formik';
import { addAddresschema } from '../../utils/validations/addressValidation';
import { addNewWorkingLocationInterface } from '../../utils/types/addressTypes';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import AddressService from '../../services/AddressService';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { getHoursList } from '../../utils/helpers/helperfunctions';
import DropDownComponent from '../common/DropDown/DropDownComponent';
import { ApiConstant } from '../../constant/ApiConstant';
import { generateLabelArray } from '../../utils/helpers/GetLabelByValue';

interface Props {
  onCancel: () => void;
}
// const timeSlots = [
//   { 
//     label: '12:00 AM',
//     value: '00:00'
//   },
//   { 
//     label: '01:00 AM',
//     value: '01:00'
//   },
//   { 
//     label: '02:00 AM',
//     value: '02:00'
//   },
//   { 
//     label: '03:00 AM',
//     value: '03:00'
//   },
//   { 
//     label: '04:00 AM',
//     value: '04:00'
//   },
//   { 
//     label: '05:00 AM',
//     value: '05:00'
//   },
//   { 
//     label: '06:00 AM',
//     value: '06:00'
//   },
//   { 
//     label: '07:00 AM',
//     value: '07:00'
//   },
//   { 
//     label: '08:00 AM',
//     value: '08:00'
//   },
//   { 
//     label: '09:00 AM',
//     value: '09:00'
//   },
//   { 
//     label: '10:00 AM',
//     value: '10:00'
//   },
//   { 
//     label: '11:00 AM',
//     value: '11:00'
//   },
//   { 
//     label: '12:00 PM',
//     value: '12:00'
//   },
//   { 
//     label: '01:00 PM',
//     value: '13:00'
//   },
//   { 
//     label: '02:00 PM',
//     value: '14:00'
//   },
//   { 
//     label: '03:00 PM',
//     value: '15:00'
//   },
//   { 
//     label: '04:00 PM',
//     value: '16:00'
//   },
//   { 
//     label: '05:00 PM',
//     value: '17:00'
//   },
//   { 
//     label: '06:00 PM',
//     value: '18:00'
//   },
//   { 
//     label: '07:00 PM',
//     value: '19:00'
//   },
//   { 
//     label: '08:00 PM',
//     value: '20:00'
//   },
//   { 
//     label: '09:00 PM',
//     value: '21:00'
//   },
//   { 
//     label: '10:00 PM',
//     value: '22:00'
//   },
//   { 
//     label: '11:00 PM',
//     value: '23:00'
//   }
// ];

const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AddNewAddress: React.FC<Props> = ({ onCancel }) => {
  const { data } = useAppSelector((state: RootState) => state.auth);
  const [selectedDays, setSelectedDays] = useState<Array<any>>([]);
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
      const { data } = await AddressService.addNewWorkingLocation(payload);
      console.log('data');
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  const addValue = (value: any, setFieldValue: any, formTag: any) => {
    // Set the value of the number field here...
    setFieldValue(formTag, value);
  };

  const handleDayPress = (day: any, setFeildValue: any) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(selectedDay => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    addValue(updatedDays, setFeildValue, 'dayAndtime.days');
  };

  const getTimeSlots = async() =>{
      try {
         const {statusCode, data} = await AddressService.getTimeSlots();
         if(statusCode === ApiConstant.successCode){
          const dropDownData = generateLabelArray(data);
          setTimeSlots(dropDownData)
         } ;
      } catch (err) {
        console.log('TimeSlots Fetching Error', err);
      }
  }

  useEffect(() =>{
   getTimeSlots()
  }, [])
  return (
    <Formik
      initialValues={{
        location: '',
        address: '',
        dayAndtime: {
          days: [],
          timeSlotIds:[]
        },
      }}
      validationSchema={addAddresschema}
      onSubmit={addAddressHandler}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.heading}>Please fill the following details</Text>
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
            {/* <SelectTimeScreen
              handleChange={handleChange}
              setFeildValue={setFieldValue}
              addValue={addValue}
              errors={errors}
            /> */}
            <View style={styles.days}>
              <Text style={styles.label}>Select Days</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}>
                <View style={styles.timeLine}>
                  {allDays?.map(item => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.timeLintBtn,
                        selectedDays.includes(item) && styles.activeBtn,
                      ]}
                      onPress={() => handleDayPress(item, setFieldValue)}
                    >
                      <Text style={[
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
            <View style={styles.time}>
              <Text style={styles.label}>Select Time Slot</Text>
              <View style={styles.timeRow}>
                <View style={styles.col}>
                <MultiSelect
                  style={styles.dropdown} // Add the appropriate styles
                  data={timeSlots}
                  labelField="label"
                  valueField="value"
                  placeholder="Select time slot"
                  value={values.dayAndtime.timeSlotIds}
                  onChange={(selectedItems:any) => setFieldValue('dayAndtime.timeSlotIds', selectedItems)}
                />
                </View>
                
              </View>
            </View>
          </View>
          <View style={styles.btnConatiner}>
            <View style={{ width: '50%' }}>
              <CustomButton
                disabled={loading}
                title={'Add Details'}
                onPress={handleSubmit}
              />
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
    height: '100%',
  },
  dropdown: {
    height: 50,
    paddingHorizontal:5,
    borderRadius:5,
    backgroundColor: 'transparent',
    borderColor: 'gray',
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
    fontWeight: '500'
  },
  days: {},
  time: {

  },
  timeRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  col: {
    flex: 6,
    // paddingHorizontal:5,
    // borderWidth:1,
    // borderColor:globalStyle.colors.borderColor,
    // borderRadius:10,
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
    marginBottom: 55,
  },
  btnConatiner: {
    display: 'flex',
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
});
