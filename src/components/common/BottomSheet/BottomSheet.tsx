import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import styles from './BottomStyle';
import LinearGradient from 'react-native-linear-gradient';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSlider from '../BottomSlider/BottomSlider';

interface filterModelProps {
  visibility: boolean;
  closeModel: () => void;
  element: JSX.Element;
}

const BottomSheet: React.FC<filterModelProps> = ({
  visibility,
  closeModel,
  element,
}) => {
  return (
    <Modal animationType={'none'} transparent={true} visible={visibility}>
      <LinearGradient
        start={{x: 0.5, y: 0.5}}
        end={{x: 0.5, y: 0.5}}
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']}
        style={styles.model}
        onMagicTap={closeModel}
        >
        <GestureHandlerRootView style={{flex: 1}}>
          <Pressable style={styles.container} onPress={closeModel} />
          <BottomSlider  element={element} />
        </GestureHandlerRootView>
      </LinearGradient>
    </Modal>
  );
};

export default BottomSheet;
