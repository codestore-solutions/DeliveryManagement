import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './AssignmentStyle';
import {CallSharpIcon, QrCodeIcon, SendIcon} from '../../assets';
import {CustomButton, Timeline} from '../../components';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import ModalMessage from '../../components/common/ModalMessage/ModalMessage';
import OtpForm from '../../components/OtpForm/OtpForm';



const AssignmentDetails = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [otpvisible, otpsetVisible] = useState<boolean>(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const otpopenModal = () => {
    otpsetVisible(true);
  };
  const otpcloseModal = () => {
    otpsetVisible(false);
  };
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
        <Timeline data={data} currentIndex={3} />
        <View style={styles.qrContainer}>
          <TouchableOpacity onPress={otpopenModal}>
            <Text style={styles.btntxt}>Submit OTP</Text>
          </TouchableOpacity>
          <View style={styles.qr}>
            <QrCodeIcon width={80} height={80} />
          </View>
          <View style={styles.btnContainer}>
            <CustomButton title={'Cash Collected'} onPress={openModal} />
          </View>
        </View>
      </SafeAreaView>
      <CustomModal
        visible={visible}
        closeModal={closeModal}
        element={
          <ModalMessage
            type={1}
            message={'Are you sure cash has been collected by you?'}
          />
        }
      />
      <CustomModal
        visible={otpvisible}
        closeModal={otpcloseModal}
        element={
          <OtpForm/>
        }
      />
    </ScrollView>
  );
};

export default AssignmentDetails;
