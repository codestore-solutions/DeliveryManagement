import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import styles from './AssignmentStyle';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import {VericalMenuIcon} from '../../assets';
import {FlatList} from 'react-native';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import {RefreshControl} from 'react-native';
import Loader from '../../components/common/Loader/Loader';

//   {
//     key: 1,
//     requestId: '#HDYWFG28472CVSX',
//     pickup: '4653 Clearview Drive Englewood',
//     destination: '4653 Clearview Drive USA',
//   },
//   {
//     key: 2,
//     requestId: '#HDYWFG28472CVSX',
//     pickup: '4653 Clearview Drive Englewood',
//     destination: '4653 Clearview Drive USA',
//   },
//   {
//     key: 3,
//     requestId: '#HDYWFG28472CVSX',
//     pickup: '4653 Clearview Drive Englewood',
//     destination: '4653 Clearview Drive USA',
//   },
//   {
//     key: 4,
//     requestId: '#HDYWFG28472CVSX',
//     pickup: '4653 Clearview Drive Englewood',
//     destination: '4653 Clearview Drive USA',
//   },
// ];
interface Props {
  userData: any;
  index: any;
}
const CompletedAssignment: React.FC<Props> = ({userData, index}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const navigate = (item: any) => {
    navigation.navigate('AssignmentDetail', {item});
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Call the function to fetch the updated data here
    fetchCompletedRequestList(userData).finally(() => setRefreshing(false));
  }, [userData]);
  const renderItem = ({item}: any) => (
    <ReqComponent item={item} onPress={() => navigate(item)} />
  );

  const fetchCompletedRequestList = async (userData: any) => {
    try {
      setLoading(true);
      let payload = {
        page: 1,
        pageSize: 10,
        status: [11],
      };
      const {data, statusCode} = await OrderServices.getDeliveryRequests(
        payload,
        userData,
      );
      if (statusCode === ApiConstant.successCode) {
        console.log('data', data);
        setOrderList(data);
      }
    } catch (err) {
      console.log('Fetching Pending Request Error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedRequestList(userData);
  }, [userData, handleRefresh, index]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : orderList?.totalOrders === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'black'}}>
            No Avialable Orders.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* <View style={styles.header}>
          <Text style={styles.pageHeading}>Completed Request</Text>
          <View style={styles.menuIcon}>
            <VericalMenuIcon width={20} height={20} />
          </View>
        </View> */}
          <FlatList
            data={orderList?.list}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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

export default CompletedAssignment;
