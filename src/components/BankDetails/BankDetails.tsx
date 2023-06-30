import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BankDetailForm from './BankDetailForm';
import CustomButton from '../common/CustomButton/CustomButton';
import SingleDetail from '../common/SingleDetail/SingleDetail';

const data = Array<{key: number; label: string; value: any; imageUrl: any}>(
  {
    key: 1,
    label: 'Your Name',
    value: 'Rahul',
    imageUrl: '',
  },
  {
    key: 2,
    label: 'Bank Name',
    value: 'SBI',
    imageUrl: '',
  },
  {
    key: 3,
    label: 'IFSC Code',
    value: 'SBIN0002583',
    imageUrl: '',
  },
  {
    key: 4,
    label: 'Account Number',
    value: '751234567890980',
    imageUrl: '',
  },
);

const BankDetails = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const onEdit = () => {
    setEdit(true);
  };
  const onCancel = () => {
    setEdit(false);
  };
  if (edit) {
    return (
      <BankDetailForm onCancel={onCancel} />
    );
  } else {
    return (
      <View style={[styles.container]}>
      <View >
        {data?.map(item => (
          <View style={styles.row} key={item.key}>
            <SingleDetail label={item.label} value={item.value} />
          </View>
        ))}
      </View>
      <View style={styles.lower}>
        <CustomButton title={'Edit Details'}  onPress={onEdit} />
      </View>
    </View>
    );
  }
};

export default BankDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex:1,
  },
  lower: {
    width:'100%',
    position:'absolute',
    bottom:0,
    marginLeft:5,
    marginBottom:15,
  },
  row: {
    marginVertical: 10,
  },
});
