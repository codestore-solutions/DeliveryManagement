import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import globalStyle from '../../../global/globalStyle';

interface Props {
  countryCode: any;
  onChange: any;
}

const CountryPickerInput: React.FC<Props> = ({ countryCode, onChange }) => {
  const [show, setShow] = useState(false);

  const handlePickerButtonPress = (item: any) => {
    onChange(item.dial_code);
    setShow(false);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text style={{ color: 'black', fontSize: 15 }}>{countryCode}</Text>
        </TouchableOpacity>

        {show && (
          <CountryPicker
            lang="en"
            show={show}
            enableModalAvoiding={true}
            onBackdropPress={() => setShow(false)}
            style={{ modal: { height: 500 } }}
            pickerButtonOnPress={handlePickerButtonPress}
            inputPlaceholder='+ 91'
          />
        )}
      </View>
  );
};

export default CountryPickerInput;

const styles = StyleSheet.create({
  container: {},
});
