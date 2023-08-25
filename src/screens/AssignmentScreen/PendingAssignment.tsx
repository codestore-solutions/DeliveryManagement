import {View, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './AssignmentStyle';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import {VericalMenuIcon} from '../../assets';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../../components/common/Loader/Loader';
import {Text} from 'react-native';

const data = [
  {
    key: 1,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
    clientName: 'David Vese',
    earning: ' $ 10',
  },
  {
    key: 2,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
    clientName: 'David Vese',
    earning: ' $ 10',
  },
  {
    key: 3,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
    clientName: 'David Vese',
    earning: ' $ 10',
  },
  {
    key: 4,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
    clientName: 'David Vese',
    earning: ' $ 10',
  },
];
interface Props {
  userData: any;
  index: any;
}
const PendingAssignment: React.FC<Props> = ({userData, index}) => {
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const updateOrderList = (id: any) => {
    let filtered = orderList?.list.filter((item: any) => item.id != id);
    setOrderList({...orderList, list: filtered});
  };
  // const navigate = (item: any) => {
  //   if(multiSelect){
  //      console.log("Select");
  //   }else{
  //     navigation.navigate('AssignmentDetail', {item});
  //   }
  // };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Call the function to fetch the updated data here
    fetchPendingRequestList(userData).finally(() => setRefreshing(false));
  }, [userData]);

  const onLongPressHandler = () => {
    setMultiSelect(true);
  };
  const renderItem = ({item}: any) => (
    <ReqComponent
      item={item}
      // onPress={() => navigate(item)}
      type={1}
      updateOrderList={updateOrderList}
      onLongPressHandler={onLongPressHandler}
      multiSelect={multiSelect}
    />
  );

  const fetchPendingRequestList = async (userData: any) => {
    try {
      setLoading(true);
      let payload = {
        page: 1,
        pageSize: 10,
        status: [5],
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

  useEffect(() => {
    fetchPendingRequestList(userData);
  }, [userData, handleRefresh, index]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : orderList?.totalOrders === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            No Available Orders.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={orderList?.list}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            style={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PendingAssignment;
