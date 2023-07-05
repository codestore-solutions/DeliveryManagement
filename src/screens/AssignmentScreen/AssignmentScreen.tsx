import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './AssignmentStyle';
import {VericalMenuIcon} from '../../assets';
import ReqComponent from '../../components/common/ReqComponent/ReqComponent';

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

const AssignmentScreen = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigate = () =>{
    navigation.navigate('AssignmentDetail');
  }
  const renderItem = ({item}:any) => (
       <ReqComponent item={item} onPress={navigate} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageHeading}>Post Request</Text>
        <View style={styles.menuIcon}>
          <VericalMenuIcon width={20} height={20} />
        </View>
      </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.key.toString()}
          style={styles.content}
        />
    </View>
  </SafeAreaView>
  );
};

export default AssignmentScreen;
