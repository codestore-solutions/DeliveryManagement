import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import globalStyle from '../../../global/globalStyle';

interface Props {
  countryCode: any;
  onChange: any;
}

const CountryPickerInput: React.FC<Props> = ({countryCode, onChange}) => {
  const [show, setShow] = useState(false);
  // const [countryCode, setCountryCode] = useState('');
  console.log('countryCode', countryCode)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        // style={{
        //   backgroundColor: '#fff',
        // }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>
          {countryCode}
        </Text>
      </TouchableOpacity>

      {/* For showing picker just put show state to show prop */}
      <CountryPicker
        lang="en" // Set the language to display country names in English. You can change "en" to another language code if needed.
        show={show}
        style={{
          modal: {
            height: 500,
          },
        }}
        // when the picker button is pressed, you will get the country object with dial code
        pickerButtonOnPress={(item: any) => {
          onChange(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
};

export default CountryPickerInput;

const styles = StyleSheet.create({
  container: {},
});
