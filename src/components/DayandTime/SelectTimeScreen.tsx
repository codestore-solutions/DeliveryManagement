import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import globalStyle from '../../global/globalStyle';
import {FlatList} from 'react-native-gesture-handler';

const SelectTimeScreen = () => {
  const [selectedDays, setSelectedDays] = useState<Array<any>>([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const hours = Array.from(Array(24).keys()).map(
    hour => `${hour.toString().padStart(2, '0')}:00`,
  );
  

  const handleDayPress = (day: any) => {
    setSelectedDays(day);
  };

  const handleHourPress = (hour: any) => {
    setSelectedHour(hour);
  };

  const handleMinutePress = (minute: any) => {
    setSelectedMinute(minute);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Day</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 1}}
        data={days}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
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
        )}
      />
      <Text style={styles.heading}>Select Time</Text>
      <View style={styles.timeConatiner}>
        <View style={styles.left} />
        <Text style={styles.headingTag}>From</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{maxHeight: 45}}
          data={hours}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity style={[styles.hourBtn]}>
              <Text style={[styles.hourText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
         <Text style={styles.headingTag}>To</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{maxHeight: 45}}
          data={hours}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity style={[styles.hourBtn]}>
              <Text style={[styles.hourText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    paddingVertical: 5,
  },
  heading: {
    color: '#7E8299',
    fontSize: 16,
    padding: 5,
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal:5,
  },
  headingTag:{
    color: globalStyle.colors.labelColor,
    fontSize: 16,
    padding: 5,
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal:10,
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
     paddingVertical:10,
     display:'flex',
     flexDirection:'row',
     alignItems:'center'
  },
  left:{
    flex:5,
  },
  hourBtn: {
    flex:3
  },
  hourText: {},
});

export default SelectTimeScreen;
