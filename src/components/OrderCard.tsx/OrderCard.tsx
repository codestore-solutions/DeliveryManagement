import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './OrderCardStyle';

interface orderCardProps {
    id: number;
    AssignedBy: string;
    description: string;
    deliveryAddres:string;
    pickupAddress:string;
    payment:string;
  }


const OrderCard: React.FC<orderCardProps> = ({AssignedBy, description,deliveryAddres,pickupAddress, payment}) => {
  return (
    <View style={styles.card}>
        <View style={styles.cardLeft}>
             <Text style={styles.cardHeading}>{AssignedBy}</Text>
             <Text style={styles.cardDescription}>{description}</Text>
             <View style={styles.cardFooter}>
                 <Text>Payment Mode</Text>
                 <Text style={styles.payType}>{payment}</Text>
             </View>
             <View style={styles.cardFooter}>
                 <Text>Delivery Address: </Text>
                 <Text style={styles.address}>{deliveryAddres}</Text>
             </View>
        </View>
        <View style={styles.cardRight}>
            <TouchableOpacity style={styles.pickupBtn}>
                 <Text style={styles.btnText}>Pickup</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default OrderCard