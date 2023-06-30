import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../../global/globalStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import VechileDetailsForm from './VechileDetailsForm';

const data = Array<{key: number; label: string; value: string}>(
  {
    key: 1,
    label: 'Vehicle Type',
    value: '2 Wheeler',
  },
  {
    key: 2,
    label: 'Brand',
    value: 'Hero, Splender',
  },
  {
    key: 3,
    label: 'Model',
    value: '2011',
  },
  {
    key: 4,
    label: 'D.O.B',
    value: '02/03/2000',
  },
  {
    key: 5,
    label: 'Registration Number',
    value: '123AWES2390',
  },
);

const VehileDetails = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const onEdit = () => {
    setEdit(true);
  };
  const onCancel = () => {
    setEdit(false);
  };
  if(edit){
     return (
         <VechileDetailsForm onCancel={onCancel} />
     )
  }else{
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Your Vehicle Details</Text>
        {data?.map(item => (
          <View style={styles.row} key={item.key}>
            <SingleDetail label={item.label} value={item.value} />
          </View>
        ))}
        <View style={styles.lower}>
          <CustomButton title={'Edit Details'} onPress={onEdit} />
        </View>
      </View>
    );
  }
};

export default VehileDetails;

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '600',
    color: globalStyle.colors.labelColor,
  },
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
  lower: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginLeft: 5,
    marginBottom: 15,
  },
  row: {
    marginVertical: 10,
  },
  btnConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
