import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyle from '../../global/globalStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import VechileDetailsForm from './VechileDetailsForm';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../common/Loader/Loader';

interface Props {
  data: any;
}

const VehileDetails: React.FC<Props> = ({data}) => {
  const [vechileDetails, setVechileDetails] = useState<any>(null);
  const [edit, setEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const updateDetails = (data: any) => {
    setVechileDetails(data);
  };
  const onEdit = () => {
    setEdit(false);
  };
  const onCancel = () => {
    setEdit(true);
  };

  const fetchVechileDetails = async (id: string) => {
    try {
      setLoading(true);
      const {data} = await AgentServices.getAgentDetails(
        id,
        ApiConstant.getvechileDetailendpoint,
      );
      // console.log("Vex data", data);
      if (data) {
        setVechileDetails(data);
        setEdit(true);
      } else {
        setEdit(false);
      }
      setLoading(false);
    } catch (err) {
      console.log('Vechile Detail Fetching Error', err);
      setLoading(false);
    }
  };

  const dataArr = Array<{key: number; label: string; value: string}>(
    {
      key: 1,
      label: 'Vehicle Type',
      value: vechileDetails?.vehicleType,
    },
    {
      key: 2,
      label: 'Brand',
      value: vechileDetails?.companyName,
    },
    {
      key: 3,
      label: 'Model',
      value: vechileDetails?.model,
    },
    {
      key: 4,
      label: 'Number Plate',
      value: vechileDetails?.numberPlate,
    },
    {
      key: 5,
      label: 'Registration Number',
      value: vechileDetails?.registrationNumber,
    },
  );
  useEffect(() => {
    fetchVechileDetails(data?.id);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <View style={styles.container}>
        {!edit ? (
          <VechileDetailsForm
            onCancel={onCancel}
            data={data}
            vechileDetails={vechileDetails}
            updateDetails={updateDetails}
          />
        ) : (
          <>
            <Text style={styles.heading}>Your Vehicle Details</Text>
            {dataArr?.map((item: any) => (
              <View style={styles.row} key={item.key}>
                <SingleDetail label={item.label} value={item.value} />
              </View>
            ))}
            <View style={styles.lower}>
              <CustomButton title={'Edit Details'} onPress={onEdit} />
            </View>
          </>
        )}
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
