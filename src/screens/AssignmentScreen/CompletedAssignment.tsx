import {View, Text, SafeAreaView, LayoutAnimation} from 'react-native';
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
import NotAvailable from '../../components/common/NotAvailable/NotAvailable';
import {CustomButton} from '../../components';

interface Props {
  userData: any;
  index: any;
}

const CompletedAssignment: React.FC<Props> = ({userData, index}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const navigate = (item: any) => {
    navigation.navigate('AssignmentDetail', {item});
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Call the function to fetch the updated data here
    fetchCompletedRequestList(userData, 1).finally(() => setRefreshing(false));
  }, [userData]);
  const renderItem = ({item}: any) => (
    <ReqComponent item={item} onPress={() => navigate(item)} />
  );

  const fetchCompletedRequestList = async (userData: any, page: number) => {
    try {
      setLoading(true);
      let payload = {
        page: page,
        pageSize: 5,
        status: [11],
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
    } catch (err) {
      console.log('Fetching Pending Request Error', err);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {loadingMore && <Loader />}
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
      fetchCompletedRequestList(userData, currentPage + 1);
    }
  };
  useEffect(() => {
    if (index === 2) fetchCompletedRequestList(userData, 1);
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
            keyExtractor={item => item.id}
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

export default CompletedAssignment;
