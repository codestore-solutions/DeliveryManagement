import {Dimensions, SafeAreaView, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import styles from './SliderStyle';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_SLIDE_DISTANCE = 700;

interface bottomSheetProps {
  element: JSX.Element;
}

const BottomSlider: React.FC<bottomSheetProps> = ({element}) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })

    .onUpdate(e => {
      translateY.value = Math.min(
        Math.max(e.translationY + context.value.y, -MAX_SLIDE_DISTANCE),
        0,
      );
    });
  const reAminatedBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 1.3);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, reAminatedBottomSheetStyle]}>
        <Pressable style={styles.line} />
        <SafeAreaView>
          <ScrollView>{element}</ScrollView>
        </SafeAreaView>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSlider;
