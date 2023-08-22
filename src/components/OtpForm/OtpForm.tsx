import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';
import {acceptRejectInterface} from '../../utils/types/deliveryRequestTypes';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Toast from 'react-native-toast-message';
interface Props {
  type: number;
  data: any;
  orderDetails: any;
  getTimeLineDetails: any;
  closeModal: any;
}

const OtpForm: React.FC<Props> = ({
  type,
  data,
  orderDetails,
  getTimeLineDetails,
  closeModal,
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleOtpChange = (text: any, index: any) => {
    const updatedOtp = otp.split('');
    updatedOtp[index] = text;
    setOtp(updatedOtp.join(''));
  };

  const deliverRequest = async (item: any) => {
    try {
      setLoading(true);
      let payload: acceptRejectInterface = {
        orderIds: [item?.id],
        deliveryStatus: 11,
      };

      const res = await OrderServices.acceptAndRejectDeliveryRequest(
        payload,
        data.data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        console.log('Order Delivered');
        getTimeLineDetails(item?.id);
        closeModal();
      }
    } catch (err) {
      console.log('Error on delivering Request', err);
    }finally{
       setLoading(false)
    }
  };
  const handleSubmit = async () => {
    try {
      if (type === 1) {
        if (otp === '1234') {
          await deliverRequest(orderDetails);
        }
      } else {
        console.log('cod Otp:', otp);
        Toast.show({
          type: 'error',
          text1: 'Invaild Otp',
        })
      }
    } catch (err) {
      console.log('Conforming Delivery err', err);
    }
  };
  
  const renderOtpBoxes = () => {
    const otpBoxes = [];
    for (let i = 0; i < 4; i++) {
      otpBoxes.push(
        <TextInput
          key={i}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleOtpChange(text, i)}
          value={otp[i]}
        />,
      );
    }
    return otpBoxes;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please enter the OTP to verify</Text>
      <View style={styles.otpcontainer}>{renderOtpBoxes()}</View>
      <View style={styles.btn}>
        <CustomButton disabled={loading} title={ loading ? 'Confirming..':'Confirm Delivery'} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 29,
  },
  otpcontainer: {
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
  btn: {
    marginVertical: 15,
    width: '50%',
  },
});

export default OtpForm;
