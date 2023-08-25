import {View, Text, SafeAreaView, RefreshControl} from 'react-native';
import styles from './AssignmentStyle';
import React, {useEffect, useState, useCallback} from 'react';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import {ApiConstant} from '../../constant/ApiConstant';
import OrderServices from '../../services/OrderServices';
import {VericalMenuIcon} from '../../assets';
import {FlatList} from 'react-native';
import Loader from '../../components/common/Loader/Loader';

interface Props {
  userData: any;
  index: any;
}

const IgnoredAssignment: React.FC<Props> = ({userData, index}) => {
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
        status: [7],
      };
      const {data, statusCode} = await OrderServices.getDeliveryRequests(
        payload,
        userData,
      );
      if (statusCode === ApiConstant.successCode) {
        setOrderList(data);
      }
    } catch (err) {
      console.log('Fetching Rejected Request Error', err);
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
            No Available Orders.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* <View style={styles.header}>
        <Text style={styles.pageHeading}>Ignored Request</Text>
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

export default IgnoredAssignment;
