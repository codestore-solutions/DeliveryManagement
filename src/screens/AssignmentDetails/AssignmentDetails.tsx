import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './AssignmentStyle';
import {CallSharpIcon, QrCodeIcon, SendIcon} from '../../assets';
import {CustomButton, Timeline} from '../../components';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import ModalMessage from '../../components/common/ModalMessage/ModalMessage';
import OtpForm from '../../components/OtpForm/OtpForm';
import FeedBackScreen from '../FeedBackScreen/FeedBackScreen';
import {useRoute} from '@react-navigation/native';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import {getCurrIdx, getTimeLineData} from '../../utils/helpers/CustomizeData';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import {acceptRejectInterface, pickupAndDelivery} from '../../utils/types/deliveryRequestTypes';
import Loader from '../../components/common/Loader/Loader';
import UploadImage from '../../components/UploadImage/UploadImage';

const AssignmentDetails = () => {
  const userData = useAppSelector((state: RootState) => state.auth) as any;
  const [curr, setCurr] = useState<any>();
  const [timeLinedata, setTimeLineData] = useState<any>([
    {
      key: 0,
      title: '',
      description: '',
    },
    {
      key: 1,
      title: '',
      description: '',
    },
    {
      key: 2,
      title: '',
      description: '',
    },
    {
      key: 3,
      title: '',
      description: '',
    },
  ]);

  const route = useRoute();
  const {item}: any = route.params;

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delivered, setDelivered] = useState<boolean>(false);
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
  const updateTimeLineData = (payload: any): void => {
    setTimeLineData((prevData: any) =>
      prevData.map((item: any) =>
        item.key === payload.key ? {...item, ...payload} : item,
      ),
    );
  };
  const getTimeLineDetails = async (id: number) => {
    try {
      const {data, statusCode} = await OrderServices.getOrderTimeline(
        Number(id),
        userData?.data,
      );
      if (statusCode === ApiConstant.successCode) {
        if (data.length > 0) {
          getTimeLineData(data, updateTimeLineData);
          let currIdx = getCurrIdx(data);
          setCurr(currIdx);
        }
      }
    } catch (err) {
      console.log('Timeline fetching err', err);
    }
  };

  const arrivedRequest = async (item: any) => {
    try {
      let payload: acceptRejectInterface = {
        orderIds: [item?.id],
        deliveryStatus: 9,
      };
      const res = await OrderServices.acceptAndRejectDeliveryRequest(
        payload,
        userData.data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        // updateOrderList(item?.id);
        console.log('arrived');
        getOrderDetails(Number(item?.id));
        getTimeLineDetails(Number(item.id));
      }
    } catch (err) {
      console.log('Error on on the way to deliver Request', err);
    }
  };

  const getOrderDetails = async (id: any) => {
    try {
      setLoading(true);
      const {data, statusCode} = await OrderServices.getOrderDetailsById(
        id,
        userData?.data,
      );
      if (statusCode === ApiConstant.successCode) {
        setOrderData(data);
      }
    } catch (err) {
      console.log('OrderDetails Fetching Error', err);
    } finally {
      setLoading(false);
    }
  };

  const deliverRequest = async (item: any) => {
    try {
      setLoading(true);
      let payload: pickupAndDelivery = {
        image: '',
        orderIds: [item?.id],
        deliveryStatus: 11,
      };
     
      const res = await OrderServices.pickupAndDeliveryRequest(
        payload,
        userData?.data,
      );
      console.log('deliverres', res)
      if (res?.statusCode === ApiConstant.successCode) {
        console.log('Order Delivered');
        getTimeLineDetails(item?.id);
      }
    } catch (err) {
      console.log('Error on delivering Request', err);
    }finally{
       setLoading(false)
    }
  };

  useEffect(() => {
    getOrderDetails(Number(item.id));
    getTimeLineDetails(Number(item.id));
  }, [item]);

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Request ID</Text>
            <Text style={styles.value}>{orderData?.id}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>
                {orderData?.vendor?.business?.address?.street}
              </Text>
              <Pressable>
                <SendIcon width={20} height={20} />
              </Pressable>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Destination</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>
                {orderData?.shippingAddress?.street}
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
              <Text style={styles.avatarLabel}>
                {orderData?.customer?.name}
              </Text>
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
            <Text style={styles.labeltxt}>
              {orderData?.paymentStatus === 1 ? 'Online' : 'Card'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Total Amount</Text>
            <Text style={[styles.labeltxt, styles.red]}>30 $</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Your Earning</Text>
            <Text style={styles.labeltxt}>{orderData?.deliveryCharges}$</Text>
          </View>
        </View>

        {orderData?.orderStatus===11 ? (
          <FeedBackScreen />
        ) : (
          <View>
            <Timeline data={timeLinedata} currentIndex={curr} />
            {orderData?.paymentStatus === 1 ? (
              <>
                {orderData?.orderStatus === 9 && (
                  <>
                    <View style={styles.btnContainerDel}>
                      <CustomButton
                        disabled={delivered}
                        title={delivered ? 'Delivered' : 'Deliver Order'}
                        onPress={() =>deliverRequest(orderData)}
                      />
                    </View>
                  </>
                )}
                {orderData?.orderStatus === 8 && (
                  <>
                    <View style={styles.btnContainerDel}>
                      <CustomButton
                        title={'Arrived'}
                        onPress={() => arrivedRequest(orderData)}
                      />
                    </View>
                  </>
                )}
              </>
            ) : (
              <View>
                <View style={styles.qrContainer}>
                  <TouchableOpacity onPress={otpopenModal}>
                    <Text style={styles.btntxt}>Submit OTP</Text>
                  </TouchableOpacity>
                  <View style={styles.qr}>
                    <QrCodeIcon width={80} height={80} />
                  </View>
                  <View style={styles.btnContainer}>
                    <CustomButton
                      title={'Cash Collected'}
                      onPress={openModal}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
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
            <UploadImage
               setSelectedImage={setSelectedImage}
               closeModal={closeModal}
               selectedImage={selectedImage}
            />
        }
      />
    </ScrollView>
  );
};

export default AssignmentDetails;
