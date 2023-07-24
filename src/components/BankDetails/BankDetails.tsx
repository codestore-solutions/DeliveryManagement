import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BankDetailForm from './BankDetailForm';
import CustomButton from '../common/CustomButton/CustomButton';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../common/Loader/Loader';

interface Props {
  data: any;
}
const BankDetails: React.FC<Props> = ({data}) => {
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);

  const updateDetails = (data: any) => {
    setBankDetails(data);
  };
  const onEdit = () => {
    setEdit(false);
  };
  const onCancel = () => {
    setEdit(true);
  };
  const dataArr = Array<{
    key: number;
    label: string;
    value: any;
    imageUrl: any;
  }>(
    {
      key: 1,
      label: 'Your Name',
      value: bankDetails?.yourName,
      imageUrl: '',
    },
    {
      key: 2,
      label: 'Bank Name',
      value: bankDetails?.bankName,
      imageUrl: '',
    },
    {
      key: 3,
      label: 'IFSC Code',
      value: bankDetails?.ifscCode,
      imageUrl: '',
    },
    {
      key: 4,
      label: 'Account Number',
      value: bankDetails?.accountNumber,
      imageUrl: '',
    },
  );

  const fetchbankDetails = async (id: string) => {
    try {
      setLoading(true);
      let {data} = await AgentServices.getAgentDetails(
        id,
        ApiConstant.getbankdetailEndpoint,
      );
      // console.log('data', data)
      if (data !== null) {
        setBankDetails(data);
        setEdit(true);
      } else {
        setEdit(false);
      }
      setLoading(false);
    } catch (err) {
      console.log('personal details data fetching err', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchbankDetails(data?.id);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <View style={[styles.container]}>
        {!edit ? (
          <BankDetailForm
            data={data}
            onCancel={onCancel}
            bankDetails={bankDetails}
            updateDetails={updateDetails}
          />
        ) : (
          <>
          <View>
            {dataArr?.map((item: any) => (
              <View style={styles.row} key={item.key}>
                <SingleDetail label={item.label} value={item.value} />
              </View>
            ))}
          </View>
            <View style={styles.lower}>
              <CustomButton title={'Edit Details'} onPress={onEdit} />
            </View>
            </>
        )}
      </View>
    );
  }
};

export default BankDetails;

const styles = StyleSheet.create({
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
});
