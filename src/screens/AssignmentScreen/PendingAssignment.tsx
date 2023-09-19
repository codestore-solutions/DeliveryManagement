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
import NotAvailable from '../../components/common/NotAvailable/NotAvailable';
import {CustomButton} from '../../components';

interface Props {
  userData: any;
  index: any;
}
const PendingAssignment: React.FC<Props> = ({userData, index}) => {
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const updateOrderList = (id: any) => {
    let filtered = orderList.filter((item: any) => item.id != id);
    setOrderList(filtered);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPendingRequestList(userData, 1).finally(() => setRefreshing(false));
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

  const fetchPendingRequestList = async (userData: any, page: number) => {
    try {
      setLoading(true);
      let payload = {
        page: page,
        pageSize: 10,
        status: [5],
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
        console.log('fetchPendingRequestList', data.list)
        setTotalPages(data.totalOrders);
        setCurrentPage(page);
        // Check if there are no more records available
        if (page !== 1 && data.list.length === 0) {
          setOrderList([]);
        }
      }
    } catch (err) {
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
      fetchPendingRequestList(userData, currentPage + 1);
    }
  };
  useEffect(() => {
    if (index === 0) {
      fetchPendingRequestList(userData, currentPage);
    }
  }, [userData, handleRefresh, index]);



  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && !loadingMore ? (
        <Loader />
      ) : !orderList ? (
        <NotAvailable />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={orderList}
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PendingAssignment;
