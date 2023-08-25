import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {
  CheckTimeIcon,
  DeliverImg,
  PickupImg,
  UploadIcon,
} from '../../../assets';
import globalStyle from '../../../global/globalStyle';

interface Props {
  data: Array<Object>;
  currentIndex: any;
  openPickupModal: () => void;
  openDeliverModal: () => void;
}

const Timeline: React.FC<Props> = ({
  data,
  currentIndex,
  openPickupModal,
  openDeliverModal,
}) => {
  const openPickup = () => {
    console.log('Press');
    openPickupModal();
  };

  const renderItem = (item: any, index: number) => {
    const isCompleted = index <= currentIndex;
    const circleColor = isCompleted ? '#7E72FF' : '#DADADA';

    return (
      <View style={styles.itemContainer}>
        {/* <TouchableOpacity
                style={styles.tagContentRight}
                onPress={() => {
                  console.log('Pressed the Pickup icon');
                  openPickupModal();
                }}>
                <PickupImg width={20} height={20} />
                <Text>Pickup</Text>
              </TouchableOpacity> */}

        <Pressable
          onPress={() => {
            if (item.key === 1) {
              openPickupModal();
            } else if (item.key === 3) {
              openDeliverModal();
            }
          }}>
          <Svg height="100" width="100%">
            <View style={styles.tag}>
              <View style={isCompleted ? styles.circleStyle : styles.circleNot}>
                {isCompleted && (
                  <CheckTimeIcon cx="50%" cy="50" r="10" fill={circleColor} />
                )}
              </View>
              <View style={styles.tagContent}>
                <View style={styles.tagContentLeft}>
                  <Text
                    style={
                      isCompleted
                        ? styles.title
                        : [styles.title, styles.titleActive]
                    }>
                    {' '}
                    {item?.title}
                  </Text>
                  {isCompleted && (
                    <Text style={styles.desc}>{item?.description}</Text>
                  )}
                </View>
                {item?.key === 1 && (
                  <TouchableOpacity
                    style={styles.tagContentRight}
                    onPress={() => {
                      console.log('Pressed the Pickup icon');
                      openPickupModal();
                    }}>
                    <PickupImg width={20} height={20} />
                    <Text>Pickup</Text>
                  </TouchableOpacity>
                )}

                {item?.key === 3 && (
                  <Pressable
                    style={styles.tagContentRight}
                    onPress={() => {
                      console.log('Pressed the Deliver icon');
                      openDeliverModal();
                    }}>
                    <DeliverImg width={20} height={20} />
                    <Text>Deliver</Text>
                  </Pressable>
                )}
              </View>
            </View>
            {index !== data.length - 1 && (
              <View style={isCompleted ? styles.lineStyle : styles.lineNot}>
                <Line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100"
                  stroke={isCompleted ? '#7E72FF' : '#DADADA'}
                  strokeWidth="5"
                />
              </View>
            )}
          </Svg>
        </Pressable>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {data.map((item, index) => renderItem(item, index))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
    overflow:'hidden'
  },
  innerContainer: {
    // flexGrow: 1,
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagContent: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagContentLeft: {
    paddingLeft: 15,
  },
  tagContentRight: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    borderColor: globalStyle.colors.labelColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },
  titleActive: {
    color: '#CCCCCC',
  },
  desc: {
    color: globalStyle.colors.baseColor,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  circleStyle: {
    backgroundColor: '#7E72FF',
    width: 30,
    height: 30,
    borderRadius: 50,
    lineHeight: 20,
    padding: 3,
  },
  circleNot: {
    backgroundColor: '#DADADA',
    width: 30,
    height: 30,
    borderRadius: 50,
    lineHeight: 20,
    padding: 3,
  },
  lineStyle: {
    marginLeft: 10,
    backgroundColor: '#7E72FF',
    width: 10,
    height: 100,
    borderRadius: 50,
    lineHeight: 20,
    padding: 3,
  },
  lineNot: {
    marginLeft: 10,
    backgroundColor: '#DADADA',
    width: 10,
    height: 100,
    borderRadius: 50,
    lineHeight: 20,
    padding: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemText: {
    marginLeft: 8,
  },
  checkIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -7}, {translateY: -7}],
  },
});

export default Timeline;
