import {
  Text,
  View,
  Switch,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './DashboardStyle';
import {DashboardCard, DropDownComponent} from '../../components';
import {DeliveryTruckIcon} from '../../assets';

const data = [
  {
    key: 1,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
  },
  {
    key: 2,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
  },
  {
    key: 3,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
  },
  {
    key: 4,
    requestId: '#HDYWFG28472CVSX',
    pickup: '4653 Clearview Drive Englewood',
    destination: '4653 Clearview Drive USA',
  },
];

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const renderItem = ({item}: any | null) => {
    return (
      <View key={item.key} style={styles.requstCard}>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Request ID</Text>
          <Text style={styles.requstColTow}>{item.requestId}</Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Pickup</Text>
          <Text style={styles.requstColTow}>{item.pickup}</Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Destination ID</Text>
          <Text style={styles.requstColTow}>{item.destination}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView style={[styles.dashboard]}>
        <View style={styles.header}>
          <View style={styles.dropdown}>
            <DropDownComponent />
          </View>
          <View style={styles.switchBox}>
            <Text style={styles.statusTag}>
              {isEnabled ? 'On Duty' : 'Off Duty'}
            </Text>
            <Switch
              trackColor={{true: '#4CD964', false: 'grey'}}
              thumbColor={isEnabled ? '#fff' : '#fff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flexGrow: 1}}>
          <View style={styles.timeLine}>
            <TouchableOpacity style={[styles.timeLintBtn, styles.activeBtn]}>
              <Text style={[styles.timeLintBtnText, styles.activeText]}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeLintBtn}>
              <Text style={styles.timeLintBtnText}>This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeLintBtn}>
              <Text style={styles.timeLintBtnText}>Last 3 Months</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.cardsContainer}>
          <View style={styles.cardsOneContainer}>
            <DashboardCard
              cardBackground={'#7E72FF'}
              iconBackground={'#A39AFF'}
              cardIconType={0}
              cardDesc={'1,021 Total Completed Deliveries'}
              cardHeading={'1,013'}
            />
          </View>
          <View style={styles.cardsTwoContainer}>
            <DashboardCard
              cardBackground={'#4285F4'}
              iconBackground={'#77A8F8'}
              cardIconType={1}
              cardDesc={'Total Tip Recieved'}
              cardHeading={'$200'}
            />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <DashboardCard
            cardBackground={'#F1416C'}
            iconBackground={'#EC85A1'}
            cardIconType={1}
            cardDesc={'Total Cash for Order Collected'}
            cardHeading={'$200'}
          />
        </View>

        <View style={styles.requestListContainer}>
          <View style={styles.requestListContainerHeader}>
            <Text style={styles.heading}>Ongoing Request</Text>
            <TouchableOpacity>
              <Text style={styles.btnText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item: any) => item.key}
            renderItem={renderItem}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
