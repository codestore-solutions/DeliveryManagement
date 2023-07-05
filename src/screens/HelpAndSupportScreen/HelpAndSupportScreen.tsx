import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './HelpAndSupportStyle';
import {EmailIcon, MicrophoneIcon, PhoneIcon} from '../../assets';
const HelpAndSupportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.microIcon}>
        <MicrophoneIcon width={100} height={100} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>How can we help you ?</Text>
        <Text style={styles.subheading}>
          It look like you are experiencing problems with our sign up process.
          We are here to help so get in touch with us.
        </Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <EmailIcon width={54} height={54} />
          <Text style={styles.iconText}>Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <PhoneIcon width={54} height={54} />
          <Text style={styles.iconText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpAndSupportScreen;
