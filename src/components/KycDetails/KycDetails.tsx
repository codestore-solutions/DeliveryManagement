import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {UploadIcon} from '../../assets';
import styles from './KycStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
const dataArr = Array<{key: number; label: string; value: any; imageUrl: any}>(
  {
    key: 1,
    label: 'Driving License',
    value: <UploadIcon />,
    imageUrl: '',
  },
  {
    key: 2,
    label: 'Aadhhar Card ',
    value: <UploadIcon />,
    imageUrl: '',
  },
  {
    key: 3,
    label: 'Pan Card.',
    value: <UploadIcon />,
    imageUrl: '',
  },
  {
    key: 4,
    label: 'Photo',
    value: <UploadIcon />,
    imageUrl: '',
  },
);

interface Props {
  data: any;
}

const KycDetails: React.FC<Props> = ({data}) => {
  const [fromData, setFormData] = useState<Array<string>>([]);
  const [kycDetails, setKycDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  
  const addUrl = (url: string) =>{
       
  }
  const fetchKycDetails = (id: string) => {
    setLoading(true);
    AgentServices.getAgentDetails(id, ApiConstant.kycDetailendpoint)
      .then(res => {
        if (res?.data) {
          setKycDetails(res?.data);
        }
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={[styles.container]}>
      <View>
        {dataArr?.map(item => (
          <View style={styles.row} key={item.key}>
            <SingleDetail type={1} label={item.label} value={item.value} />
          </View>
        ))}
      </View>
      <View style={styles.lower}>
        <CustomButton
          title={'Upload Document'}
          onPress={() => console.log('pressed')}
        />
      </View>
    </View>
  );
};

export default KycDetails;
