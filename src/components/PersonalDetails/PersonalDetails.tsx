import {View, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './DetailStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import PersonalDetailForm from './PersonalDetailForm';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../../components/common/Loader/Loader';
import moment from 'moment';
import globalStyle from '../../global/globalStyle';
import { useIsFocused } from '@react-navigation/native';
interface Props {
  data: any;
  index: number;
  goToNextIndex: () => void;
}

const PersonalDetails: React.FC<Props> = ({data, index, goToNextIndex}) => {
  const isFocused = useIsFocused();
  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [profileImg, setProfileImg] = useState<any>('');
  const [err, setError] = useState<any>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const updateDetails = (data: any) => {
    setPersonalDetails(data);
    setEdit(false);
  };
  const onEdit = () => {
    setEdit(false);
  };
  const onCancel = () => {
    setEdit(true);
  };

  const getPersonalDetails = async (id: string) => {
    try {
      setLoading(true);
      let {data} = await AgentServices.getAgentDetails(
        id,
        ApiConstant.personalDetailendpoint,
      );
      setProfileImg(data.profileImage);
      console.log('Profile data', data.profileImage);
      if (data !== null) {
        setPersonalDetails(data);

        setEdit(true);
      } else {
        setEdit(false);
      }
      setLoading(false);
    } catch (err: any) {
      if (err?.status === ApiConstant.notFound) {
        setEdit(false);
        setError(err);
      }
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
      value: personalDetails?.countryCode + personalDetails?.phoneNumber,
    },
    {
      key: 4,
      label: 'D.O.B',
      value:
        personalDetails &&
        moment(personalDetails?.dateOfBirth).format('YYYY-MM-DD'),
    },
    {
      key: 5,
      label: 'Gender',
      value: personalDetails?.gender,
    },
    {
      key: 6,
      label: 'Residential Address',
      value: personalDetails?.address,
    },
    {
      key: 7,
      label: 'Profile Image',
      value: personalDetails?.profileImage,
    },
  );
  useEffect(() => {
    if (index === 0) {
      getPersonalDetails(data?.id);
      if (err?.status === ApiConstant.notFound) {
        setEdit(false);
      }
    }
  }, [data, index, isFocused]);
  if (loading) {
    return <Loader />;
  }

  return (
    <View style={[styles.container]}>
      {!edit && !loading ? (
        <PersonalDetailForm
          onCancel={onCancel}
          personalDetails={personalDetails}
          data={data}
          updateDetails={updateDetails}
          goToNextIndex={goToNextIndex}
        />
      ) : (
        <View style={[styles.container]}>
          {dataArr?.map((item: any) =>
            item.key === 7 ? (
              <View
                key={item.key}
                style={{
                  display: 'flex',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.inputlabel}>{item.label}</Text>
                <Image
                  source={{uri: profileImg + `?${new Date()}`}}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    borderRadius: 50,
                  }}
                />
              </View>
            ) : (
              <View style={styles.row} key={item.key}>
                <SingleDetail label={item?.label} value={item?.value} />
              </View>
            ),
          )}
          <View style={styles.lower}>
            <CustomButton title={'Edit Details'} onPress={onEdit} />
          </View>
        </View>
      )}
    </View>
  );
};

export default PersonalDetails;