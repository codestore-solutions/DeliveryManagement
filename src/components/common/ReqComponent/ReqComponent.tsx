import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import styles from './ReqStyle';
import OrderServices from '../../../services/OrderServices';
import {
  acceptRejectInterface,
  pickupAndDelivery,
} from '../../../utils/types/deliveryRequestTypes';
import {useAppSelector} from '../../../store/hooks';
import {RootState} from '../../../store';
import {ApiConstant} from '../../../constant/ApiConstant';
import {AuthStateInterface} from '../../../store/features/authSlice';
import globalStyle from '../../../global/globalStyle';
import CustomModal from '../CustomModal/CustomModal';
import UploadImage from '../../UploadImage/UploadImage';
import UploadService from '../../../services/UploadService';

interface Props {
  item: any;
  onPress?: () => void;
  type?: number;
  updateOrderList?: any;
  onLongPressHandler?: any;
  multiSelect?: boolean;
  handleRefresh?: any;
}
const ReqComponent: React.FC<Props> = ({
  item,
  onPress,
  type,
  updateOrderList,
  onLongPressHandler,
  multiSelect,
  handleRefresh,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  console.log('Item', item);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const uploadPickupImage = async (image: any) => {
    try {
      setUpload(true);
      const {statusCode, data} = await UploadService.uploadImage(image);
      if (statusCode === ApiConstant.successCode) {
        if (data.urlFilePath) {
          await pickupRequest(item, data.urlFilePath);
          await handleRefresh(data);
          console.log('data.urlFilePath & deliver quest', data.urlFilePath);
        }
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setUpload(false);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const {data} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  const acceptRequest = async (item: any) => {
    try {
      setLoading(true);
      let payload: acceptRejectInterface = {
        orderIds: [item?.id],
        deliveryStatus: 6,
      };
      const res = await OrderServices.acceptAndRejectDeliveryRequest(
        payload,
        data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        updateOrderList(item?.id);
      }
    } catch (err) {
      console.log('Error on accepting Request', err);
    } finally {
      setLoading(false);
    }
  };
  const rejectRequest = async (item: any) => {
    try {
      setCancelLoading(true);
      let payload: acceptRejectInterface = {
        orderIds: [item?.id],
        deliveryStatus: 7,
      };
      const res = await OrderServices.acceptAndRejectDeliveryRequest(
        payload,
        data,
      );
      if (res?.statusCode === ApiConstant.successCode) {
        updateOrderList(item?.id);
        
      }
    } catch (err) {
      console.log('Error on accepting Request', err);
    } finally {
      setCancelLoading(false);
    }
  };

  const pickupRequest = async (item: any, url: string) => {
    try {
      setLoading(true);
      let payload: pickupAndDelivery = {
        image: url,
        orderIds: [item?.id],
        deliveryStatus: 8,
      };
      // console.log('payload', payload);
      const res = await OrderServices.pickupAndDeliveryRequest(payload, data);
      if (res?.statusCode === ApiConstant.successCode) {
        // handleRefresh(data);
        updateOrderList(item?.id);
        closeModal();
      }
    } catch (err) {
      console.log('Error on accepting Request', err);
    } finally {
      setLoading(false);
    }
  };

  const pickupOrderHandler = async () => {
    openModal();
  };
  return (
    <>
      <TouchableOpacity
        key={item.key}
        style={
          multiSelect ? [styles.requstCard, styles.selected] : styles.requstCard
        }
        onPress={onPress}
        onLongPress={onLongPressHandler}>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>OrderID</Text>
          <Text style={styles.requstColTow}>{item?.id}</Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Pickup Address</Text>
          <Text style={styles.requstColTow} numberOfLines={2}>
            {item?.vendor?.business?.address?.street}
          </Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Delivery Address</Text>
          <Text style={[styles.requstColTow, {flex: 1}]} numberOfLines={1}>
            {item?.shippingAddress?.street}
          </Text>
        </View>
        {item?.customer && (
          <View style={styles.requstCardRow}>
            <Text style={styles.requstColOne}>Customer Name</Text>
            <Text style={styles.requstColTow}>{item?.customer?.name}</Text>
          </View>
        )}
        {item?.deliveryCharges && (
          <View style={styles.requstCardRow}>
            <Text style={styles.requstColOne}>Delivery Charges</Text>
            <Text style={styles.requstColTow}>{item?.deliveryCharges}</Text>
          </View>
        )}
        {type === 1 && (
          <View style={styles.btnConaṭiner}>
            {item?.orderStatus === 6 ? (
              <TouchableOpacity
                style={[styles.acceptBtn, {width: '100%'}]}
                onPress={pickupOrderHandler}>
                <Text style={styles.acceptBtnText}>
                  {loading && (
                    <ActivityIndicator
                      size={'small'}
                      color={globalStyle.colors.backgroundColor}
                    />
                  )}
                  {loading ? 'Picking Up..' : 'Pickup Order'}
                </Text>
              </TouchableOpacity>
            ) : (
              item?.orderStatus === 5 && (
                <>
                  <TouchableOpacity
                    style={[styles.ignoreBtn]}
                    onPress={() => rejectRequest(item)}>
                    <Text style={styles.ignoreBtnText}>
                      {cancelLoading ? 'Rejecting..' : 'Reject'}
                      {cancelLoading && (
                        <ActivityIndicator
                          size={'small'}
                          color={globalStyle.colors.backgroundColor}
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => acceptRequest(item)}>
                    <Text style={styles.acceptBtnText}>
                      {loading ? 'Accepting..' : 'Accept'}
                      {loading && (
                        <ActivityIndicator
                          size={'small'}
                          color={globalStyle.colors.backgroundColor}
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </>
              )
            )}
          </View>
        )}
      </TouchableOpacity>
      <CustomModal
        visible={visible}
        closeModal={closeModal}
        element={
          <UploadImage
            title="Upload pickup Image"
            setSelectedImage={setSelectedImage}
            closeModal={closeModal}
            selectedImage={selectedImage}
            uploadImage={uploadPickupImage}
          />
        }
      />
    </>
  );
};

export default ReqComponent;
