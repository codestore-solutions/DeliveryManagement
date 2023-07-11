import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import globalStyle from '../../global/globalStyle';
import {getHoursList} from '../../utils/helpers/helperfunctions';

interface Props {
  handleChange: (field: string, value: any) => void;
  setFeildValue: any;
  addValue: any;
  errors: any;
}

const SelectTimeScreen: React.FC<Props> = ({
  setFeildValue,
  addValue,
  errors,
  handleChange,
}) => {
  const [selectedDays, setSelectedDays] = useState<Array<any>>([]);
  const [selectedHourfrom, setSelectedHourfrom] = useState(0);
  const [selectedHourTo, setSelectedHourTo] = useState(0);

  const handleHourSelectionFrom = (hour: any) => {
    setSelectedHourfrom(hour);
    let val = hour.toString().padStart(2, '0') + ':00';
    addValue(val, setFeildValue, 'dayAndtime.fromTime');
  };

  const handleHourSelectionTo = (hour: any) => {
    setSelectedHourTo(hour);
    let val = hour.toString().padStart(2, '0') + ':00';
    addValue(val, setFeildValue, 'dayAndtime.toTime');
  };

  const alldays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = getHoursList();
  const handleDayPress = (day: any) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(selectedDay => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    addValue(updatedDays, setFeildValue, 'dayAndtime.days');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Day</Text>
      <ScrollView
        style={{flexGrow: 1}}
        contentContainerStyle={styles.timeLine}
        showsVerticalScrollIndicator={false}>
        {alldays?.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.timeLintBtn,
              selectedDays.includes(item) && styles.activeBtn,
            ]}
            onPress={() => handleDayPress(item)}>
            <Text
              style={[
                styles.timeLintBtnText,
                selectedDays.includes(item) && styles.activeText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors && (
        <Text style={styles.errorMessage}>{errors?.dayAndtime?.days} </Text>
      )}
      <Text style={styles.heading}>Select Time</Text>
      <View style={styles.timeConatiner}>
        <View style={styles.left} />
        <View style={styles.right}>
          <View style={styles.rightfrom}>
            <Text style={styles.headingTag}>From</Text>
            <ScrollView style={styles.scroller}>
              {hours.map((_, hour) => (
                <Text
                  key={hour}
                  style={[
                    styles.hourText,
                    selectedHourfrom === hour && styles.selectedHourText,
                  ]}
                  onPress={() => handleHourSelectionFrom(hour)}>
                  {hour.toString().padStart(2, '0')}:00
                </Text>
              ))}
            </ScrollView>
          </View>
          <View style={styles.rightTo}>
            <Text style={styles.headingTag}>To</Text>
            <ScrollView style={styles.scroller}>
              {hours.map((_, hour) => (
                <Text
                  key={hour}
                  style={[
                    styles.hourText,
                    selectedHourTo === hour && styles.selectedHourText,
                  ]}
                  onPress={() => handleHourSelectionTo(hour)}>
                  {hour.toString().padStart(2, '0')}:00
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      {errors && (
        <Text style={styles.errorMessage}>{errors?.dayAndtime?.toTime} </Text>
      )}
      {errors && (
        <Text style={styles.errorMessage}>{errors?.dayAndtime?.formTime} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
  },
  selectedHourText: {
    color: globalStyle.colors.baseColor,
    fontWeight: '500',
  },
  heading: {
    color: '#7E8299',
    fontSize: 16,
    padding: 5,
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal: 5,
  },
  headingTag: {
    color: globalStyle.colors.labelColor,
    fontSize: 16,
    padding: 5,
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  timeLine: {
    marginVertical: 5,
    paddingVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    color: globalStyle.colors.labelColor,
  },
  timeLintBtn: {
    paddingVertical: 7,
    paddingHorizontal: 10,
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
  timeConatiner: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 4,
  },
  right: {
    flex: 8,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  rightfrom: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightTo: {
    display: 'flex',
    flexDirection: 'row',
    // maxHeight: 100,
    // overflow:'hidden'
  },
  scroller:{
     flex: 10,
     height:70,
     overflow:'scroll'
  },
  hourText: {
    fontSize:16,
    color: globalStyle.colors.labelColor
  },
});

export default SelectTimeScreen;
