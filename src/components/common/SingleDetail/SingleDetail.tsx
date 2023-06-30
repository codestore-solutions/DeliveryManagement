import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import ImagePicker, {Image as CropImage} from 'react-native-image-crop-picker';
import globalStyle from '../../../global/globalStyle';
import {DetailEditIcon, UploadIcon} from '../../../assets';
import CustomModal from '../CustomModal/CustomModal';
import UploadImage from '../../UploadImage/UploadImage';

interface Props {
  label: string;
  value: any;
  type?: number;
  image?: any;
}

const SingleDetail: React.FC<Props> = ({label, value, type}) => {
  const [selectedImage, setSelectedImage] = useState<CropImage | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.containerRight}>
        {type === 1 ? (
          <View style={styles.imageList}>
            {selectedImage && (
              <Image
                source={{uri: selectedImage?.path}}
                style={{
                  width: 70,
                  height: 50,
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}
              />
            )}
            <Pressable onPress={openModal}>
              {selectedImage ? (
                <DetailEditIcon width={35} height={35} />
              ) : (
                <UploadIcon width={35} height={35} />
              )}
            </Pressable>
          </View>
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
      <CustomModal
        visible={visible}
        closeModal={closeModal}
        element={
          <UploadImage
            setSelectedImage={setSelectedImage}
            closeModal={closeModal}
          />
        }
      />
    </View>
  );
};

export default SingleDetail;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  containerLeft: {
    maxWidth: '40%',
  },
  containerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#7E8299',
    fontSize: 14,
    fontWeight: '400',
  },
  value: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
  },
});
