import {
  Text,
  View,
  Switch,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState, useEffect} from 'react';
import styles from './DashboardStyle';
import {DashboardCard, DropDownComponent} from '../../components';
import RenderItem from '../../components/common/ReqComponent/ReqComponent';
import AgentServices from '../../services/AgentServices';
import {updateAgentStatus} from '../../utils/types/UserTypes';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import {AuthStateInterface} from '../../store/features/authSlice';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../../components/common/Loader/Loader';
import AddressService from '../../services/AddressService';
import {setLocationInterface} from '../../utils/types/addressTypes';
import NotAvailable from '../../components/common/NotAvailable/NotAvailable';

const Adddata = [
  {label: 'Home', value: '1'},
  {label: 'Office', value: '2'},
  {label: 'Other', value: '3'},
  {label: 'Current Location', value: '4'},
];

const HomeScreen = () => {
  const isFocused = useIsFocused()
  const [orderList, setOrderList] = useState<any>(null);
  const [total, setTotal] = useState<any>(0);
  const [activeLocationVal, setActiveLocationVal] = useState<any>(null);
  const [locations, setLocation] = useState<any>([]);
  const [dropDownValue, setDropDownValue] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {data} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigate = (item: any) => {
    navigation.navigate('AssignmentDetail', {item});
  };
  const updateDropDown = (value: any) => {
    console.log('value', value);
    setDropDownValue(value);
    setActiveLocation(value);
  };
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  // Toggle Switch handler
  const toggleSwitch = () => {
    let payload: updateAgentStatus = {
      agentId: data?.id,
      agentStatus: isEnabled ? 0 : 1,
    };
    // console.log('payload', payload)
    updateAgentStatus(payload);
  };
  // Update Agent Status function
  const updateAgentStatus = async (payload: updateAgentStatus) => {
    try {
      const {statusCode, data} = await AgentServices.updateAgentStatus(payload);
      if (statusCode === 200) {
        console.log('data', data);
        if (data?.agentStatus === 1) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    } catch (err) {
      console.log('Error on updating agent Status', err);
    }
  };
  const getAgentStatus = async (id: number) => {
    try {
      setLoading(true);
      const {statusCode, data} = await AgentServices.getAgentStatus(id);
      if (statusCode === 200) {
        console.log('sta', data);
        if (data?.agentStatus === 1) {
          setIsEnabled(true);
        }
        // setIsEnabled(previousState => !previousState);
      }
    } catch (err) {
      console.log('Error on updating agent Status', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAcceptedRequestList = async (userData: any) => {
    try {
      setLoading(true);
      let payload = {
        page: 1,
        pageSize: 10,
        status: [8, 9],
      };
      const {data, statusCode} = await OrderServices.getDeliveryRequests(
        payload,
        userData,
      );
      if (statusCode === ApiConstant.successCode) {
        setOrderList(data);
      }
    } catch (err) {
      console.log('Fetching Pending Request Error', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchMoreData = async () => {
    try {
      setLoading(true);
      let payload = {
        page: page + 1, // Increment the page number
        pageSize: 10,
        status: [8, 9],
      };
      const res = await OrderServices.getDeliveryRequests(
        payload,
        data
      );
      if (res?.statusCode === ApiConstant.successCode) {
        if (res?.data?.list && res?.data.list.length > 0) {
          setOrderList((prev:any) => ({
            ...prev,
            list: [...prev.list, ...res?.data.list],
          }));
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log('Fetching More Data Error', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (id: number) => {
    try {
      setLoading(true);
      const {data, statusCode} = await AddressService.getWorkingLocations(id);
      if (statusCode === 200) {
        const labelValueArray = data?.map((location: any) => (
          {
          label: location.locationName,
          value: location.id,
        }));
        const activeValueArray = data?.filter((location: any) => (location.isActive === true));
        setActiveLocationVal(activeValueArray[0]?.id)
        console.log('activeValueArray', activeValueArray[0]?.id)
        setLocation(labelValueArray);
      }
    } catch (err) {
      console.log('Location fetching error', err);
    } finally {
      setLoading(false);
    }
  };

  // Set Working Location
  const setActiveLocation = async (id: any) => {
    let payload: setLocationInterface = {
      serviceLocationId: id,
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

  const getTotalDeliveries = async (id: number) => {
    try {
      const {data, statusCode} = await AgentServices.getTotalAgentAndDelivery(
        id,
      );
      if (statusCode === ApiConstant.successCode) {
        setTotal(data?.deliveredOrdersCount);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const handleEndReached = () => {
    fetchMoreData();
  };
  useEffect(() => {
    getTotalDeliveries(Number(data?.id));
    fetchMoreData();
    getAgentStatus(data?.id);
    fetchLocations(data?.id);
  }, [data, isFocused]);
 
  const navigateToOngoing = (index:number) => {
    navigation.navigate('Home', {
      screen: 'Assignments',
      params: { index }
    });
  }
  
  // useEffect(() => {
  //   fetchLocations(data?.id);
  // }, [data, route]);

  const renderItem = ({ item }: any) => {
    return (
      <View key={item?.id}>
        <RenderItem item={item} onPress={() => navigate(item)} />
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.dashboard]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.dropdown}>
            <DropDownComponent
              value={activeLocationVal}
              data={locations}
              onChange={updateDropDown}
            />
          </View>
          <View style={styles.switchBox}>
            <Text style={styles.statusTag}>
              {isEnabled ? 'On Duty' : 'Off Duty'}
            </Text>
            <Switch
              trackColor={{true: '#4CD964', false: 'grey'}}
              thumbColor={isEnabled ? '#fff' : '#fff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
        </View>
        {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flexGrow: 1}}>
          <View style={styles.timeLine}>
            <TouchableOpacity style={[styles.timeLintBtn, styles.activeBtn]}>
              <Text style={[styles.timeLintBtnText, styles.activeText]}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeLintBtn}>
              <Text style={styles.timeLintBtnText}>This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeLintBtn}>
              <Text style={styles.timeLintBtnText}>Last 3 Months</Text>
            </TouchableOpacity>
          </View>
        </ScrollView> */}
        {/* <View style={styles.cardsContainer}>
          <View style={styles.cardsOneContainer}>
            <DashboardCard
              cardBackground={'#7E72FF'}
              iconBackground={'#A39AFF'}
              cardIconType={0}
              cardDesc={'1,021 Total Completed Deliveries'}
              cardHeading={'1,013'}
            />
          </View>
          <View style={styles.cardsTwoContainer}>
            <DashboardCard
              cardBackground={'#4285F4'}
              iconBackground={'#77A8F8'}
              cardIconType={1}
              cardDesc={'Total Tip Received'}
              cardHeading={'$200'}
            />
          </View>
        </View> */}
        <View style={styles.cardContainer}>
          <DashboardCard
            cardBackground={'#7E72FF'}
            iconBackground={'#A39AFF'}
            cardIconType={0}
            cardDesc={'Total Completed Deliveries'}
            cardHeading={total}
          />

          {/* <DashboardCard
            cardBackground={'#F1416C'}
            iconBackground={'#EC85A1'}
            cardIconType={1}
            cardDesc={'Total Cash for Order Collected'}
            cardHeading={'$200'}
            type={1}
          /> */}
        </View>

        <View style={styles.requestListContainer}>
          <View style={styles.requestListContainerHeader}>
            <Text style={styles.heading}>Ongoing Orders</Text>
            <TouchableOpacity onPress={() => navigateToOngoing(1)}>
              <Text style={styles.btnText}>View All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={{flex: 1, height: 300, backgroundColor: '#fff'}}>
              <Loader />
            </View>
          ) : !orderList?.list ? (
            <NotAvailable />
          ) : (
            // orderList?.list?.map((item: any) => {
            //   return (
            //     <View key={item?.id}>
            //       <RenderItem item={item} onPress={() => navigate(item)} />
            //     </View>
            //   );
            // })
            <FlatList
              data={orderList?.list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={
                hasMore ? (
                  <TouchableOpacity onPress={fetchMoreData}>
                    <Text style={{ textAlign: 'center', padding: 10 }}>
                      Load More
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ textAlign: 'center', padding: 10 }}>
                    No more data
                  </Text>
                )
              }
               // Add onEndReached prop
               // Specify the threshold for triggering onEndReached
               onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
