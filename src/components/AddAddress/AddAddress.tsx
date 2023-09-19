import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import {AddIcon, CheckedRadioIcon, RadioIcon} from '../../assets';
import globalStyle from '../../global/globalStyle';
import AddNewAddress from '../AddNewAddress/AddNewAddress';
import AddressService from '../../services/AddressService';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/index';
import {
  AuthStateInterface,
  updateAgentProfileStatus,
} from '../../store/features/authSlice';
import {setLocationInterface} from '../../utils/types/addressTypes';
import {updateProfileInterface} from '../../utils/types/UserTypes';
import NotAvailable from '../common/NotAvailable/NotAvailable';
import AgentServices from '../../services/AgentServices';
import {ApiConstant} from '../../constant/ApiConstant';
import {useIsFocused} from '@react-navigation/native';

const AddAddress: React.FC<{index?: number; page?: boolean}> = ({
  index,
  page,
}) => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {data, profileStatus} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  // console.log('profileStatus', profileStatus);
  const [locations, setLocations] = React.useState<any>([]);
  const [timeSlots, setTimeSlots] = React.useState<any>([]);
  const [ids, setIds] = React.useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isEdit = () => {
    setEdit(true);
  };
  const isEditCancel = () => {
    setEdit(false);
  };
  // Set Working Location
  const setActiveLocation = async (item: any) => {
    let payload: setLocationInterface = {
      serviceLocationId: item?.id,
      agentId: Number(data?.id),
      isActive: true,
    };
    try {
      const {statusCode} = await AddressService.setWorkingLocation(payload);
      if (statusCode === 200) {
        await fetchLocations(Number(data?.id));
      }
    } catch (err) {
      console.log('Error op setting working location', err);
    }
  };

  const updateWorkingLocations = async (item: any) => {
    setEditAddress(item);
    isEdit();
  };

  const getTimeSlots = async () => {
    try {
      const timeSlotIds = [];
      for (const item of locations) {
        for (const slot of item.agentTimeSlots) {
          timeSlotIds.push(slot.timeSlotId);
        }
      }
      let params = {
        slotIds: timeSlotIds,
      };
      const {statusCode, data} = await AgentServices.getTimSlotsByIds(params);
      if (statusCode === ApiConstant.successCode) {
        setTimeSlots(data);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const renderItem = (item: any) => {
    let arr = item?.selectedDays.split(' ');
    const getFirstThreeChars = (selectedDays: string[]) => {
      return selectedDays.map(day => day.substring(0, 3));
    };
    const firstThreeCharsOfSelectedDays = getFirstThreeChars(arr);
    console.log('timeSlots', timeSlots);
    return (
      <Pressable
        style={styles.card}
        key={item.id}
        onPress={() => {
          if (!item?.isActive) setActiveLocation(item);
        }}>
        <View style={styles.cardLeft}>
          {item?.isActive ? (
            <CheckedRadioIcon width={20} height={20} />
          ) : (
            <RadioIcon width={20} height={20} />
          )}
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardHeading}>{item?.locationName}</Text>
          <Text style={styles.cardDesc}>{item.address}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <Text style={styles.time}>
                {firstThreeCharsOfSelectedDays.join(', ')}
              </Text>
              {/* <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width:'100%',
                  paddingVertical: 10,
                  // overflow: 'scroll',
                  marginTop:10,
                  paddingRight:10
                  
                }}>
                {timeSlots?.map((slot: any) => (
                  <Text style={[styles.time, { borderColor: '#EAEAEA',
                  borderRadius: 8,
                  borderWidth: 1, marginHorizontal:2,paddingHorizontal:5}]}>{slot.slotName}</Text>
                ))}
              </View> */}
            </View>
            <View style={styles.cardFooterRight}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => deleteLocation(Number(item?.id))}>
                <Text style={styles.btnTxt}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => updateWorkingLocations(item)}>
                <Text style={styles.btnTxt}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const deleteLocation = async (id: number) => {
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.deleteWorkingLocations(
        id,
      );
      if (statusCode === 200) {
        let filterLoc = locations?.filter((item: any) => item?.id !== id);
        setLocations(filterLoc);
      }
    } catch (err) {
      console.log('Location fetching error', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (id: number) => {
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.getWorkingLocations(id);
      if (statusCode === 200) {
        setLocations(data);
        if (data?.length > 0) {
          if (!profileStatus) {
            let payload: updateProfileInterface = {
              agentId: id,
              isProfileCompleted: true,
            };
            console.log('payload', payload);
            dispatch(updateAgentProfileStatus(payload));
          }
        }
      }
    } catch (err) {
      console.log('Location fetching error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (index === 3) fetchLocations(Number(data?.id));
    else if (edit || page) {
      fetchLocations(Number(data?.id));
      getTimeSlots();
    }
  }, [index, data?.id, edit, page, isFocused]);

  if (edit) {
    return (
      <AddNewAddress onCancel={isEditCancel} addressDetail={editAddress} />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Working Location</Text>
          <Pressable
            style={styles.add}
            onPress={() => {
              setEditAddress(null);
              isEdit();
            }}>
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
            ) : locations && locations?.length <= 0 ? (
              <NotAvailable message="No Available loctions." />
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
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#EAEAEA',
    borderRadius: 8,
    borderWidth: 2,
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    flex: 10,
    flexDirection: 'column',
  },
  cardHeading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  time: {
    color: globalStyle.colors.labelColor,
    letterSpacing: 0.02,
  },
  cardDesc: {
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
  cardFooterLeft: {
    width: '60%',
  },
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
    height: 30,
  },
  btnTxt: {
    color: globalStyle.colors.labelColor,
  },
});
