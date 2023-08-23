import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyle from '../../global/globalStyle';
import SingleDetail from '../common/SingleDetail/SingleDetail';
import CustomButton from '../common/CustomButton/CustomButton';
import VechileDetailsForm from './VechileDetailsForm';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../common/Loader/Loader';
import {getVehicleLabel} from '../../utils/helpers/GetLabelByValue';

interface Props {
  data: any;
  index: number;
  goToNextIndex: any;
}

const VehileDetails: React.FC<Props> = ({data, index, goToNextIndex}) => {
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  console.log('vechileDetails', vehicleDetails);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const updateDetails = (data: any) => {
    setVehicleDetails(data);
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
        ApiConstant.getVehicleDetailEndPoint,
      );
      // console.log("Vex data", data);
      if (data) {
        setVehicleDetails(data);
        setEdit(true);
      } else {
        setEdit(false);
      }
      setLoading(false);
    } catch (err: any) {
      if (err?.status === ApiConstant.notFound) {
        setEdit(false);
        setNotFound(true);
      }
      console.log('Vehicle Detail Fetching Error', err);
      setLoading(false);
    }
  };

  const dataArr = Array<{key: number; label: string; value: string}>(
    {
      key: 1,
      label: 'Vehicle Type',
      value: getVehicleLabel(vehicleDetails?.vehicleType),
    },
    {
      key: 2,
      label: 'Brand',
      value: vehicleDetails?.company,
    },
    {
      key: 3,
      label: 'ManufacturedYear',
      value: vehicleDetails?.manufacturedYear,
    },
    {
      key: 4,
      label: 'Model',
      value: vehicleDetails?.vehicleModel,
    },
    {
      key: 5,
      label: 'Registration Number',
      value: vehicleDetails?.registrationNumber,
    },
  );
  useEffect(() => {
    if (index === 2) {
      fetchVechileDetails(data?.id);
      if (notFound) {
        setEdit(false);
      }
    }
  }, [data?.id, index]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <View style={styles.container}>
        {!edit ? (
          <VechileDetailsForm
            onCancel={onCancel}
            data={data}
            vechileDetails={vehicleDetails}
            updateDetails={updateDetails}
            goToNextIndex={goToNextIndex}
          />
        ) : (
          <>
            <Text style={styles.heading}>Your Vehicle Details</Text>
            {dataArr?.map((item: any) => (
              <View style={styles.row} key={item.key}>
                <SingleDetail label={item.label} value={item.value} />
              </View>
            ))}
            <View style={styles.imageContainer}>
              <Image source={{uri: "https://app-deliveryagent-dev.azurewebsites.net/Images/image.jpg"}} />
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
  imageContainer: {
    height: 130,
    width: '100%',
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
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
