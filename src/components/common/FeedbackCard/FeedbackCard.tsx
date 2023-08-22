import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StarIcon, StarWhiteIcon} from '../../../assets';

const FeedbackCard = () => {
  return (
    <View style={styles.card}>
      {/* <View style={styles.stars}>
        <StarIcon width={25} height={25} />
        <StarIcon width={25} height={25} />
        <StarIcon width={25} height={25} />
        <StarIcon width={25} height={25} />
        <StarWhiteIcon width={25} height={25} />
      </View> */}

      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
      </Text>
    </View>
  );
};

export default FeedbackCard;

const styles = StyleSheet.create({
  card: {},
  stars: {},
});
