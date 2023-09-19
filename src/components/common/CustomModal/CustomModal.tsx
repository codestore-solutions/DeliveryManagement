import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CrossIcon } from '../../../assets';

interface CustomModalProps {
  visible: boolean;
  closeModal: () => void;
  element?: JSX.Element;
}

const CustomModal: FC<CustomModalProps> = ({ visible, closeModal, element }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBackground} />
        <View style={styles.modalContent}>
          <TouchableOpacity  onPress={closeModal} style={styles.closeButton}>
            <CrossIcon width={40} height={40}  />
          </TouchableOpacity>
          {element}
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:'90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  closeButton: {
    position:'absolute',
    paddingHorizontal: 14,
    paddingVertical:10,
    lineHeight:50,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalText:{}
});

export default CustomModal;