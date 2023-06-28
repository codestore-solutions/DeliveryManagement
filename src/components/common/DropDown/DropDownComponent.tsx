import React, {useState} from 'react';
import styles from './DropDownStyle';
import {Text, View} from 'react-native';
import {LocationIcon} from '../../../assets';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Home', value: '1'},
  {label: 'Office', value: '2'},
  {label: 'Other', value: '3'},
  {label: 'Current Location', value: '4'},
];

const DropDownComponent = () => {
  const [value, setValue] = useState<any>(null);
  const renderItem = (item: any) => {
    return (
      <View style={styles.dropitem}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === '4'&& <LocationIcon width={15} height={15} />}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      iconStyle={styles.iconStyle}
      placeholderStyle={styles.placeholderStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Address"
      value={value}
      onChange={(item: any) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <View style={{paddingRight:10}}>
        <LocationIcon width={20} height={20}  />
        </View>
      )}
      renderItem={renderItem}

    />
  );
};

export default DropDownComponent;
