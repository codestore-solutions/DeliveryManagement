import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './AssignmentStyle';
import {CallSharpIcon, QrCodeIcon, SendIcon} from '../../assets';
import {CustomButton, Timeline} from '../../components';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import {useRoute} from '@react-navigation/native';
import OrderServices from '../../services/OrderServices';
import {ApiConstant} from '../../constant/ApiConstant';
import {getCurrIdx, getTimeLineData} from '../../utils/helpers/CustomizeData';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import {
  acceptRejectInterface,
  pickupAndDelivery,
} from '../../utils/types/deliveryRequestTypes';
import Loader from '../../components/common/Loader/Loader';
import UploadImage from '../../components/UploadImage/UploadImage';
import UploadService from '../../services/UploadService';

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
  const [urls, setUrls] = useState<any>({
    pickupImg: '',
    deliverImg: '',
  });
  const [selectedImagePickup, setSelectedImagePickup] = useState<any>(null);
  const [selectedImageDeliver, setSelectedImageDeliver] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [pickupModal, setPickupModal] = useState<boolean>(false);
  const [deliverModal, setDeliverModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delivered, setDelivered] = useState<boolean>(false);

  const addUrl = (url: string, type: string) => {
    if (type === 'pickupImg') setUrls({...urls, pickupImg: url});
    else setUrls({...urls, deliverImg: url});
  };
  const openPickupModal = () => {
    setPickupModal(true);
  };
  const closePickupModal = () => {
    setPickupModal(false);
  };
  const openDeliverModal = () => {
    setDeliverModal(true);
  };
  const closeDeliverModal = () => {
    setDeliverModal(false);
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
          let filterData = data?.filter((item: any) => item.orderStatusId > 4);
          console.log('filterData', filterData);
          getTimeLineData(filterData, updateTimeLineData);
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
        console.log('data', data);
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
        image: urls?.deliverImg,
        orderIds: [item?.id],
        deliveryStatus: 11,
      };
      console.log('Deliver paylod', payload);
      const res = await OrderServices.pickupAndDeliveryRequest(
        payload,
        userData?.data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        getTimeLineDetails(item?.id);
        setDelivered(true);
        getOrderDetails(Number(item.id));
      }
    } catch (err) {
      console.log('Error on delivering Request', err);
    } finally {
      setLoading(false);
    }
  };

  const pickUpRequest = async (url: any) => {
    try {
      setLoading(true);
      let payload: pickupAndDelivery = {
        image: url,
        orderIds: [item?.id],
        deliveryStatus: 8,
      };
      console.log('payload', payload);
      const res = await OrderServices.pickupAndDeliveryRequest(
        payload,
        userData?.data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        getTimeLineDetails(item?.id);
        getOrderDetails(Number(item.id));
        closePickupModal();
      }
    } catch (err) {
      console.log('Error on delivering Request', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadDeliverImage = async (image: any) => {
    const {statusCode, data} = await UploadService.uploadImage(image);
    if (statusCode === ApiConstant.successCode) {
      if (data.urlFilePath) {
        addUrl(data.urlFilePath, 'deliverImg');
        console.log('data.urlFilePath & deliver quest', data.urlFilePath);
      }
    }
  };
  const uploadPickupImage = async (image: any) => {
    const {statusCode, data} = await UploadService.uploadImage(image);
    if (statusCode === ApiConstant.successCode) {
      if (data.urlFilePath) {
        addUrl(data.urlFilePath, 'pickupImg');
        console.log('data.urlFilePath', data.urlFilePath);
        pickUpRequest(data.urlFilePath);
      }
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>{orderData?.id}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value} numberOfLines={2}>
                {orderData?.vendor?.business?.address?.street}
              </Text>
              {/* <Pressable>
                <SendIcon width={20} height={20} />
              </Pressable> */}
            </View>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Destination</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value} numberOfLines={2}>
                {orderData?.shippingAddress?.street}
              </Text>
              {/* <Pressable>
                <SendIcon width={20} height={20} />
              </Pressable> */}
            </View>
          </View>
        </View>
        <View style={styles.detailsUser}>
          <View style={styles.row}>
            {/* <View style={styles.rowLeft}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.avatar}
              />
            </View> */}
            <Text style={styles.avatarLabel}>{orderData?.customer?.name}</Text>
            {/* <View style={[styles.rowRight, styles.callIcon]}>
              <CallSharpIcon width={25} height={25} />
            </View> */}
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Payment Status</Text>
            <Text style={[styles.labeltxt, styles.payment]}>
              {orderData?.paymentStatus === 1 ? 'Successful' : 'Pending'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Payment Mode</Text>
            <Text style={styles.labeltxt}>
              {orderData?.paymentMode === 2 ? 'COD' : 'Online'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Total Amount</Text>
            <Text style={[styles.labeltxt, styles.red]}>
              {orderData?.total ?? 'N/A'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labeltxt}>Your Earning</Text>
            <Text style={styles.labeltxt}>{orderData?.deliveryCharges}</Text>
          </View>
        </View>

        {orderData?.orderStatus === 11 ? (
          <Timeline
            data={timeLinedata}
            currentIndex={curr}
            openDeliverModal={() => {}}
            openPickupModal={() => {}}
          />
        ) : (
          <View>
            <Timeline
              data={timeLinedata}
              currentIndex={curr}
              openDeliverModal={
                orderData?.orderStatus === 9 ? openDeliverModal : () => {}
              }
              openPickupModal={
                orderData?.orderStatus === 6 ? openPickupModal : () => {}
              }
            />

            <View style={styles.imageContainer}>
              <View style={styles.tag}>
                <View style={styles.image}>
                  <Image
                    source={
                      urls?.pickupImg
                        ? {uri: urls.pickupImg}
                        : require('../../assets/images/pickup.png')
                    }
                    onError={error => console.log('Image Error:', error)}
                    style={styles.preview}
                  />
                </View>
                <Text>PickUp</Text>
              </View>
              <View style={styles.tag}>
                <View style={styles.image}>
                  <Image
                    source={
                      urls?.deliverImg
                        ? {uri: urls.deliverImg}
                        : require('../../assets/images/pickup.png')
                    }
                    style={styles.preview}
                  />
                </View>
                <Text>Delivered</Text>
              </View>
            </View>
            {orderData?.orderStatus === 9 && !delivered && (
              <>
                <View style={styles.btnContainerDel}>
                  <CustomButton
                    disabled={delivered}
                    title={delivered ? 'Delivered' : 'Deliver Order'}
                    onPress={() => {
                      if (urls?.deliverImg) {
                        deliverRequest(item);
                      } else {
                        openDeliverModal();
                      }
                    }}
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
            {orderData?.orderStatus === 6 && (
              <>
                <View style={styles.btnContainerDel}>
                  <CustomButton
                    title={'PickUp Order'}
                    onPress={openPickupModal}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </SafeAreaView>
      <CustomModal
        visible={pickupModal}
        closeModal={closePickupModal}
        element={
          <UploadImage
            title="Upload Pick Up Image"
            setSelectedImage={setSelectedImagePickup}
            selectedImage={selectedImagePickup}
            closeModal={closeDeliverModal}
            uploadImage={uploadPickupImage}
          />
        }
      />
      <CustomModal
        visible={deliverModal}
        closeModal={closeDeliverModal}
        element={
          <UploadImage
            title="Upload Deliver Image"
            setSelectedImage={setSelectedImageDeliver}
            selectedImage={selectedImageDeliver}
            closeModal={closeDeliverModal}
            uploadImage={uploadDeliverImage}
          />
        }
      />
    </ScrollView>
  );
};

export default AssignmentDetails;
