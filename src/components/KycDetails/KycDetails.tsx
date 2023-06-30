import { View, Text } from 'react-native'
import React from 'react'
import { UploadIcon } from '../../assets';
import styles from './KycStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
const data = Array<{key: number; label: string; value: any; imageUrl:any}>(
  {
    key: 1,
    label: 'Driving License',
    value: <UploadIcon />,
    imageUrl:''
  },
  {
    key: 2,
    label: 'Aadhhar Card ',
     value: <UploadIcon />,
     imageUrl:''
  },
  {
    key: 3,
    label: 'Pan Card.',
    value: <UploadIcon />,
    imageUrl:''

  },
  {
    key: 4,
    label: 'Photo',
    value: <UploadIcon />,
    imageUrl:''
  },
);

const KycDetails = () => {
  return (
    <View style={[styles.container]}>
      <View >
        {data?.map(item => (
          <View style={styles.row} key={item.key}>
            <SingleDetail type={1} label={item.label} value={item.value} />
          </View>
        ))}
      </View>
      <View style={styles.lower}>
        <CustomButton title={'Upload Document'} />
      </View>
    </View>
  )
}

export default KycDetails