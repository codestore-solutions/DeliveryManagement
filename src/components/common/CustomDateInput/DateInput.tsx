import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {CalenderIcon} from '../../../assets';
import globalStyle from '../../../global/globalStyle';

interface Props {
  label: string;
  value?: string;
  onChange?: any;
  handleChange?: any;
  type?:number;
}

const DateInput: React.FC<Props> = ({label, value, onChange, handleChange, type}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    let data = moment(date).format('YYYY-MM-DD');
    const [dayValue, monthValue, yearValue] = data.split('/');
    if(type===1){
      setSelectedDate(yearValue);
      onChange(handleChange, yearValue);
    }else{
      setSelectedDate(data);
      onChange(handleChange, data);
    }
  
    hideDatePicker();
  };

  return (
    <View style={styles.conatinerMain}>
      <Text style={styles.inputlabel}>{label}</Text>
      <View style={styles.conatiner}>
        <TextInput style={styles.inputBox} placeholder={ type ? "Eg: yyyy" : "Eg: dd/mm/yyyy"} value={value} />
        <Pressable onPress={showDatePicker}>
          <CalenderIcon width={25} height={25} />
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  conatinerMain: {
    marginVertical: 5,
  },
  conatiner: {
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputlabel: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
  inputBox:{
    color:globalStyle.colors.labelColor
  }
});
