import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './AssignmentStyle';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import {VericalMenuIcon} from '../../assets';
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
}
const PendingAssignment: React.FC<Props> = ({userData}) => {
  const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const navigate = () => {
    navigation.navigate('AssignmentDetail');
  };
  const renderItem = ({item}: any) => (
    <ReqComponent item={item} onPress={navigate} type={1} />
  );

  const fetchPendingRequestList = async (userData: any) => {
    try {
      setLoading(true);
      let payload = {
        page: 1,
        pageSize: 10,
        status: [5, 8],
      };
      const {data, statusCode} = await OrderServices.getDeliveryRquests(
        payload,
        userData,
      );
      if (statusCode === ApiConstant.successCode) {
        console.log('data', data);
        setOrderList(data);
      }
    } catch (err) {
      console.log('Fexthing Pending Request Error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequestList(userData);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.pageHeading}>Pending Request</Text>
            <View style={styles.menuIcon}>
              <VericalMenuIcon width={20} height={20} />
            </View>
          </View>
          <FlatList
            data={orderList?.list}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            style={styles.content}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PendingAssignment;
