import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DangerIcon, SuccessIcon} from '../../../assets';
import globalStyle from '../../../global/globalStyle';
import CustomButton from '../CustomButton/CustomButton';

interface Props {
  type: number;
  message: string;
  onPress?: () => void;
  onCancel?: () => void;
}

const ModalMessage: React.FC<Props> = ({type, message, onCancel, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageIcon}>
        {type === 1 ? (
          <DangerIcon width={50} height={50} />
        ) : (
          <SuccessIcon width={50} height={50} />
        )}
      </View>
      <Text style={styles.message}>{message}</Text>
      {type === 1 && (
        <View style={styles.btnConatiner}>
          <View style={{width: '40%'}}>
            <CustomButton title={'YES'} onPress={onPress} />
          </View>
          <View style={{width: '40%'}}>
            <CustomButton title={'NO'} outline={true} onPress={onCancel} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:15
  },
  messageIcon: {
    paddingVertical: 10,
  },
  message: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: 0.03,
    paddingVertical:10,

  },
  btnConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop:10
  },
});
