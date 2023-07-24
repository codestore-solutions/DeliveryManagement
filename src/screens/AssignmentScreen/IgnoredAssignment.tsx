import { View, Text, SafeAreaView } from 'react-native'
import styles from './AssignmentStyle';
import React, { useEffect, useState } from 'react'
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../navigations/types';
import { ApiConstant } from '../../constant/ApiConstant';
import OrderServices from '../../services/OrderServices';
import { VericalMenuIcon } from '../../assets';
import { FlatList } from 'react-native';

interface Props{
    userData:any
 }


const IgnoredAssignment:React.FC<Props> = ({userData}) => {
    const [orderList, setOrderList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
    const navigation =
    useNavigation<NavigationProps>();
    const navigate = () =>{
      navigation.navigate('AssignmentDetail');
    }
    const renderItem = ({item}:any) => (
         <ReqComponent item={item} onPress={navigate} />
    );
   
    const fetchCompletedRequestList = async (userData: any) => {
      try {
        setLoading(true);
        let payload = {
          page: 1,
          pageSize: 10,
          status: [7],
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
      fetchCompletedRequestList(userData);
    }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageHeading}>Ignored Request</Text>
        <View style={styles.menuIcon}>
          <VericalMenuIcon width={20} height={20} />
        </View>
      </View>
        <FlatList
          data={orderList?.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.content}
        />
    </View>
  </SafeAreaView>
  )
}

export default IgnoredAssignment