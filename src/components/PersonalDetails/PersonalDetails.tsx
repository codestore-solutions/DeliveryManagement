import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './DetailStyle';
import globalStyle from '../../global/globalStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import PersonalDetailForm from './PersonalDetailForm';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../../components/common/Loader/Loader';
import moment from 'moment';



interface Props {
  data: any;
}

const PersonalDetails: React.FC<Props> = ({data}) => {
  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const updateDetails = (data:any) =>{
     setPersonalDetails(data);
  }
  const onEdit = () => {
    setEdit(false);
  };
  const onCancel = () => {
    setEdit(true);
  };

  const getPersonalDetails =async (id: string) => {
    try {
      setLoading(true);
      let {data} = await AgentServices.getAgentDetails(id,  ApiConstant.personalDetailendpoint);
      // console.log('data', data)
      if(data !== null){
         setPersonalDetails(data);
         setEdit(true)
      }else{
         setEdit(false);
      }
      setLoading(false);
    } catch (err) {
      console.log('personal details data fetching err', err);
      setLoading(false);
    }
  };
 
  const dataArr = Array<{key: number; label: string; value: string}>(
    {
      key: 1,
      label: 'Name',
      value: personalDetails?.fullName,
    },
    {
      key: 2,
      label: 'Email',
      value: personalDetails?.email,
    },
    {
      key: 3,
      label: 'Phone No.',
      value: personalDetails?.phoneNumber,
    },
    {
      key: 4,
      label: 'D.O.B',
      value:  personalDetails && moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD'),
    },
    {
      key: 5,
      label: 'Gender',
      value: personalDetails?.gender,
    },
  );
  useEffect(() => {
    getPersonalDetails(data?.id);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={[styles.container]}>
      { !edit ? (
        <PersonalDetailForm onCancel={onCancel} personalDetails={personalDetails} data={data} updateDetails={updateDetails} />
      ) : (
        <View style={[styles.container]}>
          {dataArr?.map((item: any) => (
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
