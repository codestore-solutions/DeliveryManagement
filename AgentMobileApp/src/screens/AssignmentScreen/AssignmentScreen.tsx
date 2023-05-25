import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import styles from './AssignmentStyle'
import { OrderCard } from '../../components';

const orderData = [
  {
    id: 1,
    AssignedBy: 'Masala Club Restorant',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"COD"
  },
  {
    id: 2,
    AssignedBy: 'Masala Club Restorant',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"Online"
  },
  {
    id: 3,
    AssignedBy: 'Momos King',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"Card"
  },
  {
    id: 4,
    AssignedBy: 'Terence Cafe',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"Online"
  },
  {
    id: 5,
    AssignedBy: 'Hosiyaar Puri',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"Card"

  },
  {
    id: 6,
    AssignedBy: 'Terence Cafe',
    description: 'Food Delivery',
    deliveryAddres:'Ganga Agan, Flat No -8 , Haridwar',
    pickupAddress:'Masala Club, Ranipur Mode, Haridwar',
    payment:"Card"
  },
];


const AssignmentScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.pageHeading}>Orders List</Text>
          <FlatList
            data={orderData}
            renderItem={({item}) => (
              <OrderCard
                id={item.id}
                description={item.description}
                AssignedBy={item.AssignedBy}
                pickupAddress={item.pickupAddress}
                deliveryAddres={item.deliveryAddres}
                payment={item.payment}
              />
            )}
  
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AssignmentScreen