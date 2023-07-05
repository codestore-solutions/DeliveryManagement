import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import styles from './AssignmentStyle';
import {CallSharpIcon, QrCodeIcon, SendIcon} from '../../assets';
import {CustomButton, Timeline} from '../../components';


const AssignmentDetails = () => {
  const data = [
    {
      id: 0,
      title: 'Ordered Thursday, 31st May ',
    },
    {
      id: 1,
      title: 'Shipped Thursday, 31st May',
    },
    {
      id: 2,
      title: 'Out for delivery',
    },
    {
      id: 3,
      title: 'Delivered',
    },
  ];
  return (
    <ScrollView>
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Request ID</Text>
            <Text style={styles.value}>#JDIWBWB243NV</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.valueConatiner}>
              <Text style={styles.value}>4653 Clearview Drive Englewood</Text>
              <Pressable>
                <SendIcon width={20} height={20} />
              </Pressable>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Destination</Text>
            <View style={styles.valueConatiner}>
              <Text style={styles.value}>
                02134, 71 Charter str Boston, MA, USA
              </Text>
              <Pressable>
                <SendIcon width={20} height={20} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.detailsUser}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.avatar}
              />
              <Text style={styles.avatarLabel}>Sabrina</Text>
            </View>
            <View style={[styles.rowRight, styles.callIcon]}>
              <CallSharpIcon width={25} height={25} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Payment Status</Text>
            <Text style={[styles.labeltxt, styles.payment]}>Done</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Payment Mode</Text>
            <Text style={styles.labeltxt}>Card</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Total Amount</Text>
            <Text style={[styles.labeltxt, styles.red]}>$33.75</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Your Earning</Text>
            <Text style={styles.labeltxt}> $10</Text>
          </View>
        </View>
        <Timeline data={data} currentIndex={1} /> 
        <View style={styles.qrContainer}>
             <TouchableOpacity>
                 <Text style={styles.btntxt}>Submit OTP</Text>
               </TouchableOpacity>
               <View style={styles.qr}>
                 <QrCodeIcon width={80} height={80} />
               </View>
               <View style={styles.btnContainer}>

               <CustomButton title={'Cash Collected'} />
               </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AssignmentDetails;
