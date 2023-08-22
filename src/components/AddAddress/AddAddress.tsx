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


const AddAddress: React.FC<{index?: number}> = ({index}) => {
  const dispatch = useAppDispatch();
  const {data, profileStatus} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  console.log('profileStatus', profileStatus);
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
  // Set Working Location
  const setActiveLocation = async (item: any) => {
    let payload: setLocationInterface = {
      serviceLocationId: item?.serviceLocationId,
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

  const renderItem = (item: any) => {
    let arr = item?.selectedDays.split(' ');
    const getFirstThreeChars = (selectedDays: string[]) => {
      return selectedDays.map(day => day.substring(0, 3));
    };

    const firstThreeCharsOfSelectedDays = getFirstThreeChars(arr);
    return (
      <Pressable
        style={styles.card}
        key={item.id}
        onPress={() => setActiveLocation(item)}>
        <View style={styles.cardLeft}>
          {item?.isActive ? (
            <CheckedRadioIcon width={20} height={20} />
          ) : (
            <RadioIcon width={20} height={20} />
          )}
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardheading}>{item?.locationName}</Text>
          <Text style={styles.carddesc}>{item.address}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <Text style={styles.time}>
                {firstThreeCharsOfSelectedDays.join(', ')}
              </Text>
              <Text style={styles.time}>
                {item?.startTime + '-' + item?.endTime}
              </Text>
            </View>
            <View style={styles.cardFooterRight}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => deleteLocation(Number(item?.serviceLocationId))}>
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

  const deleteLocation = async (id: number) => {
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.deleteWorkingLocations(
        id,
      );
      if (statusCode === 200) {
        let filterLoc = locations?.filter(
          (item: any) => item?.serviceLocationId !== id,
        );
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
          // Update Profile Status Completed
          if (!profileStatus) {
            let payload: updateProfileInterface = {
              agentId: id,
              isProfileCompleted: true,
            };
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
    fetchLocations(Number(data?.id));
  }, [index, data?.id]);

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
