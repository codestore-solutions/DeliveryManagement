import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './DetailStyle';
import globalStyle from '../../global/globalStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import PersonalDetailForm from './PersonalDetailForm';

const data = Array<{key: number; label: string; value: string}>(
  {
    key: 1,
    label: 'Name',
    value: 'Rahul Chaudhary',
  },
  {
    key: 2,
    label: 'Email',
    value: 'rahul.ch@codestoresolutions.com',
  },
  {
    key: 3,
    label: 'Phone No.',
    value: '+91 7860965109',
  },
  {
    key: 4,
    label: 'D.O.B',
    value: '02/03/2000',
  },
  {
    key: 5,
    label: 'Gender',
    value: 'Male',
  },
);

const PersonalDetails = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const onEdit = () => {
    setEdit(true);
  };
  const onCancel = () => {
    setEdit(false);
  };
  return (
    <View style={[styles.container]}>
      {edit ? (
        <PersonalDetailForm onCancel={onCancel} />
      ) : (
        <View style={[styles.container]}>
          {data?.map(item => (
            <View style={styles.row} key={item.key}>
              <SingleDetail label={item.label} value={item.value} />
            </View>
          ))}
          <View style={styles.lower}>
            <CustomButton title={'Edit Details'} onPress={onEdit} />
          </View>
        </View>
      )}
    </View>
  );
};

export default PersonalDetails;
