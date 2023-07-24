import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {AddIcon, CheckedRadioIcon, ReadioIcon} from '../../assets';
import globalStyle from '../../global/globalStyle';
import SelectTimeScreen from '../DayandTime/SelectTimeScreen';
import AddNewAddress from '../AddNewAddress/AddNewAddress';
import AddressService from '../../services/AddressSevice';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/index';
import {AuthStateInterface} from '../../store/features/authSlice';
import { setLocationIntrface } from '../../utils/types/addressTypes';

const AddAddress = () => {
  const {data} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  const [selectedIndex, setIndex] = React.useState(0);
  const [locations, setLocations] = React.useState<any>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isEdit = () => {
    setEdit(true);
  };
  const isEditCancel = () => {
    setEdit(false);
  };
  // Set Working Loation
  const setActiveLoation = async(item:any) =>{
      let payload: setLocationIntrface ={
        serviceLocationId: item?.serviceLocationId,
        deliveryAgentId: Number(data?.id),
        isActive: true
      }
      try {
        const {statusCode} = await AddressService.setWorkingLocation(payload);
        if(statusCode === 200){
          await fetchloactions(Number(data?.id));
        }
      } catch (err) {
          console.log('Error op setting working location', err);
      }
  }

  const renderItem = (item: any) => {
    return (
      <Pressable style={styles.card} key={item.id} onPress={() => setActiveLoation(item)}>
        <View style={styles.cardLeft}>
          {item?.isActive ? (
            <CheckedRadioIcon width={20} height={20} />
          ) : (
            <ReadioIcon width={20} height={20} />
          )}
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardheading}>{item?.locationName}</Text>
          <Text style={styles.carddesc}>{item.address}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <Text style={styles.time}>{item?.selectedDays}</Text>
              <Text style={styles.time}>
                {item?.startTime + '-' + item?.endTime}
              </Text>
            </View>
            <View style={styles.cardFooterRight}>
              <TouchableOpacity style={styles.btn} onPress={() => deleteLocation(Number(item?.serviceLocationId))}>
                <Text style={styles.btnTxt}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  // const dataArr = [
  //   {
  //     id: '1',
  //     title: 'Home',
  //     description:
  //       'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis eius commodi saepe.',
  //     time: 'Mon-Wed (9:00 - 15:00)',
  //     checked: true,
  //   },
  //   {
  //     id: '2',
  //     title: 'Work',
  //     description:
  //       'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis eius commodi saepe.',
  //     time: 'Mon-Wed (9:00 - 15:00)',
  //     checked: false,
  //   },
  // ];
  const deleteLocation = async (id:number) =>{
    console.log('id', id);
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.deleteWorkingLocations(id);
      console.log('data', data, statusCode)
      if (statusCode === 200){
         let filterloc = locations?.filter((item:any) => item?.serviceLocationId !== id);
         setLocations(filterloc);
      } 
    } catch (err) {
      console.log('Location fetching error', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchloactions = async (id: number) => {
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.getWorkingLocations(id);
      if (statusCode === 200) setLocations(data);
    } catch (err) {
      console.log('Location fetching error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchloactions(Number(data?.id));
  }, []);

  if (edit) {
    return <AddNewAddress onCancel={isEditCancel} />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Working Location</Text>
          <Pressable style={styles.add} onPress={isEdit}>
            <AddIcon width={18} height={18} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator
                color={globalStyle.colors.baseColor}
                size={'large'}
              />
            ) : (
              locations?.map((item: any) => renderItem(item))
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 24,
  },
  add: {
    padding: 7,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
  },
  content: {
    marginVertical: 10,
  },
  card: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    borderColor: '#EAEAEA',
    borderWidth: 0.01,
    borderRadius: 8,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    flex: 10,
    flexDirection: 'column',
  },
  cardheading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  time: {
    color: globalStyle.colors.labelColor,
    letterSpacing: 0.02,
  },
  carddesc: {
    fontSize: 12,
    lineHeight: 20,
    color: '#777777',
    letterSpacing: 0.02,
    paddingVertical: 3,
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterLeft: {},
  cardFooterRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  btn: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  btnTxt: {
    color: globalStyle.colors.labelColor,
  },
});
