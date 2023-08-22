import React from 'react';
import styles from './DropDownStyle';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {getVehicleLabel} from '../../../utils/helpers/GetLabelByValue';

interface Props {
  data: any;
  value: any;
  onChange: any;
  label?: string;
}

const DropDownComponent: React.FC<Props> = ({data, value, onChange, label}) => {
  return (
    <View style={{paddingVertical: 3}}>
      {label && <Text style={styles.inputlabel}>{label}</Text>}
      <Dropdown
        style={label ? styles.dropdown : {}}
        iconStyle={styles.iconStyle}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={value ? getVehicleLabel(value) : 'Select'}
        value={value}
        onChange={(item: any) => {
          onChange(item.value);
        }}
      />
    </View>
  );
};

export default DropDownComponent;
