import {View, Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './AssignmentStyle';
import {VericalMenuIcon} from '../../assets';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import Loader from '../../components/common/Loader/Loader';
import NotAvailable from '../../components/common/NotAvailable/NotAvailable';

interface Props {
  userData: any;
  index: any;
}

const AssignmentScreen: React.FC<Props> = ({userData, index}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigate = (item: Object) => {
    navigation.navigate('AssignmentDetail', {item});
  };
  
  const updateOrderList = (id: any) => {
    let filtered = orderList.filter((item: any) => item.id != id);
    setOrderList(filtered);
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Call the function to fetch the updated data here
    fetchAcceptedRequestList(userData, 1).finally(() => setRefreshing(false));
  }, [userData]);
  const renderItem = ({item}: any) => (
    <ReqComponent
      handleRefresh={fetchAcceptedRequestList}
      type={1}
      item={item}
      onPress={() => navigate(item)}
      updateOrderList={updateOrderList}
    />
  );

  const fetchAcceptedRequestList = async (userData: any, page: number) => {
    try {
      setLoading(true);
      let payload = {
        page: page,
        pageSize: 10,
        status: [6, 8, 9],
      };
      const {data, statusCode} = await OrderServices.getDeliveryRequests(
        payload,
        userData,
      );
      if (statusCode === ApiConstant.successCode) {
        if (page === 1) {
          setOrderList(data.list);
        } else {
          setOrderList((prevList: any) => [...prevList, ...data.list]);
        }
        setTotalPages(data.totalOrders);
        setCurrentPage(page);
        // Check if there are no more records available
        if (page !== 1 && data.list.length === 0) {
          setOrderList([]);
        }
      }
      setLoading(false);
      }
     catch (err) {
      console.log('Fetching Pending Request Error', err);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {/* {loadingMore && <Loader />} */}
      {currentPage >= totalPages && <Text>No more Record the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  );

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      setLoadingMore(true);
      fetchAcceptedRequestList(userData, currentPage + 1);
    }
  };
  useEffect(() => {
    if(index === 1) fetchAcceptedRequestList(userData, currentPage);
  }, [userData, handleRefresh, index]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : !orderList ? (
        <NotAvailable />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={orderList}
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AssignmentScreen;
