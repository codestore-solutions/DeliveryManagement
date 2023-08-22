import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from './ReqStyle';
import OrderServices from '../../../services/OrderServices';
import {
  acceptRejectInterface,
  pickupAndDelivery,
} from '../../../utils/types/deliveryRequestTypes';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';
import { ApiConstant } from '../../../constant/ApiConstant';
import { AuthStateInterface } from '../../../store/features/authSlice';
import globalStyle from '../../../global/globalStyle';
import CustomModal from '../CustomModal/CustomModal';
import UploadImage from '../../UploadImage/UploadImage';

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
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useAppSelector(
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
    }
  };

  const pickupRequest = async (item: any) => {
    try {
      setLoading(true);
      let payload: pickupAndDelivery = {
        image: '',
        orderIds: [item?.id],
        deliveryStatus: 8,
      };

      const res = await OrderServices.pickupAndDeliveryRequest(
        payload,
        data,
      );
      console.log('res', res)
      if (res?.statusCode === ApiConstant.successCode) {
        console.log('achevied',)
        await handleRefresh(data);
        // }
      }
    } catch (err) {
      console.log('Error on accepting Request', err);
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.requstColOne}>Request ID</Text>
          <Text style={styles.requstColTow}>{item?.id}</Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Pickup</Text>
          <Text style={styles.requstColTow}>
            {item?.vendor?.business?.address?.street}
          </Text>
        </View>
        <View style={styles.requstCardRow}>
          <Text style={styles.requstColOne}>Destination ID</Text>
          <Text style={styles.requstColTow}>
            {item?.shippingAddress?.street}
          </Text>
        </View>
        {item?.customer && (
          <View style={styles.requstCardRow}>
            <Text style={styles.requstColOne}>Client Name</Text>
            <Text style={styles.requstColTow}>{item?.customer?.name}</Text>
          </View>
        )}
        {item?.deliveryCharges && (
          <View style={styles.requstCardRow}>
            <Text style={styles.requstColOne}>Earning</Text>
            <Text style={styles.requstColTow}>{item?.deliveryCharges}</Text>
          </View>
        )}
        {type === 1 && (
          <View style={styles.btnConaṭiner}>
            {item?.orderStatus === 6 ? (
              <TouchableOpacity
                style={[styles.acceptBtn, { width: '100%' }]}
                onPress={() => pickupRequest(item)}>
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
                    <Text style={styles.ignoreBtnText}>Reject</Text>
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
            setSelectedImage={setSelectedImage}
            closeModal={closeModal}
            selectedImage={selectedImage}
          />
        }
      />
    </>
  );
};

export default ReqComponent;
