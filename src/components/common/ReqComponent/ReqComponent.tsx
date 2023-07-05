import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './ReqStyle';
interface Props{
   item:any;
   onPress: () => void ;
}
const ReqComponent: React.FC<Props> = ({item, onPress}) => {
  return (
    <Pressable key={item.key} style={styles.requstCard}  onPress={onPress}>
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
    </Pressable>
  );
};

export default ReqComponent;
