import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import React from 'react';
import styles from './AssignmentStyle';
import {VericalMenuIcon} from '../../assets';
import renderItem from '../../components/common/ReqComponent/ReqComponent';

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
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.pageHeading}>Post Request</Text>
            <View style={styles.menuIcon}>
              <VericalMenuIcon width={20} height={20} />
            </View>
          </View>
          <View style={styles.content}>
            <FlatList
              data={data}
              renderItem={renderItem}
              scrollEnabled={true}
              keyExtractor={(item: any) => item.key}
              style={styles.content}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssignmentScreen;
