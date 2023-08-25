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

const AssignmentScreen: React.FC<Props> = ({userData, index}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = () => {
    setRefreshing(true);
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigate = (item: Object) => {
    navigation.navigate('AssignmentDetail', {item});
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Call the function to fetch the updated data here
    fetchAcceptedRequestList(userData).finally(() => setRefreshing(false));
  }, [userData]);
  const renderItem = ({item}: any) => (
    <ReqComponent
      handleRefresh={fetchAcceptedRequestList}
      type={1}
      item={item}
      onPress={() => navigate(item)}
    />
  );

  const fetchAcceptedRequestList = async (userData: any) => {
    try {
      setLoading(true);
      let payload = {
        page: 1,
        pageSize: 10,
        status: [6, 8, 9],
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
    fetchAcceptedRequestList(userData);
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

export default AssignmentScreen;
