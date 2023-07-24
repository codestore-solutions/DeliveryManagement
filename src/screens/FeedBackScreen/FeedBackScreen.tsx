import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './FeedBackStyle';
import FeedBackTabs from './FeedBackTabs';
const FeedBackScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.imageHeading}>Product Image</Text>
      <View style={styles.imageContainer}>
        <View style={styles.tag}>
          <View style={styles.image}>
            <Image
              source={require('../../assets/images/pickup.png')}
              onError={error => console.log('Image Error:', error)}
            />
          </View>
          <Text>PickUp</Text>
        </View>
        <View style={styles.tag}>
          <View style={styles.image}>
            <Image source={require('../../assets/images/delivery.png')} />
          </View>
          <Text>Delivered</Text>
        </View>
      </View>
      <Text style={styles.imageHeading}>Feedbacks</Text>
      <FeedBackTabs />
    </View>
  );
};

export default FeedBackScreen;
