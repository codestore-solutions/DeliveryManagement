import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './ReqStyle';
interface Props {
  item: any;
  onPress: () => void;
  type?: number;
}
const ReqComponent: React.FC<Props> = ({item, onPress, type}) => {

  
  return (
    <Pressable key={item.key} style={styles.requstCard} onPress={onPress}>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Request ID</Text>
        <Text style={styles.requstColTow}>{item?.id}</Text>
      </View>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Pickup</Text>
        <Text style={styles.requstColTow}>{item?.vendor?.business?.address?.street}</Text>
      </View>
      <View style={styles.requstCardRow}>
        <Text style={styles.requstColOne}>Destination ID</Text>
        <Text style={styles.requstColTow}>{item?.shippingAddress?.street}</Text>
      </View>
      {item?.customer && (
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Client Name</Text>
          <Text style={styles.requstColTow}>{item?.customer?.name}</Text>
        </View>
      )}
      {item?.deliveryCharges && (
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Earning</Text>
          <Text style={styles.requstColTow}>{item?.deliveryCharges}</Text>
        </View>
      )}
      {type === 1 && (
        <View style={styles.btnConaṭiner}>
          <TouchableOpacity style={styles.ignoreBtn}>
            <Text style={styles.ignoreBtnText}>Ignore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptBtn}>
            <Text style={styles.acceptBtnText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

export default ReqComponent;
