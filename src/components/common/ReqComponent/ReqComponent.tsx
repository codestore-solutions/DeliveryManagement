import {View, Text} from 'react-native';
import React from 'react';
import styles from './ReqStyle';

const renderItem = ({item}: any | null) => {
  return (
    <View key={item.key} style={styles.requstCard}>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Request ID</Text>
        <Text style={styles.requstColTow}>{item?.requestId}</Text>
      </View>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Pickup</Text>
        <Text style={styles.requstColTow}>{item?.pickup}</Text>
      </View>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Destination ID</Text>
        <Text style={styles.requstColTow}>{item?.destination}</Text>
      </View>
      {item?.clientName && (
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Client Name</Text>
          <Text style={styles.requstColTow}>{item?.clientName}</Text>
        </View>
      )}
      {item?.earning && (
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Earning</Text>
          <Text style={styles.requstColTow}>{item?.earning}</Text>
        </View>
      )}
    </View>
  );
};

export default renderItem;
