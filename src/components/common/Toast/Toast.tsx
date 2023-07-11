import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckIcon, DangerIcon } from '../../../assets';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';
import globalStyle from '../../../global/globalStyle';

const Toast = () => {
  const toast = useAppSelector((state: RootState) => state.toast);
  const toastStyles = toast.type === 'success' ? styles.successToast : styles.failToast;
  const icon = toast.type === 'success' ? <CheckIcon width={25} height={25} /> : <DangerIcon width={25} height={25} />;
  return (
    <View style={styles.container}>
      <View style={toastStyles}>
        {icon}
        <Text style={styles.message}>{toast.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -300,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
 
  successToast: {
    width:'90%',
    display:'flex',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor:globalStyle.colors.labelColor,
    shadowOffset:{
       width:1,
       height:1
    },
    elevation:3
  },
  failToast: {
    width:'90%',
    display:'flex',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    shadowColor:globalStyle.colors.labelColor,
    shadowOffset:{
       width:1,
       height:1
    },
    elevation:3
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  message: {
    color: globalStyle.colors.labelColor,
    fontSize: 16,
    paddingHorizontal:15
  },
});

export default Toast;
