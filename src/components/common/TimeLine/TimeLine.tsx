import React from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';
import Svg, {Line, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckTimeIcon, UploadIcon} from '../../../assets';
import globalStyle from '../../../global/globalStyle';

interface Props {
  data: Array<Object>;
  currentIndex: any;
}

const Timeline: React.FC<Props> = ({data, currentIndex}) => {
  const renderItem = ({item, index}: any) => {
    const isCompleted = index <= currentIndex;
    const circleColor = isCompleted ? '#7E72FF' : '#DADADA';
    return (
      <View style={styles.itemContainer}>
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
                  <Text style={styles.desc}>Sell All Updates</Text>
                )}
              </View>
              <View style={styles.tagContentRight}>
                <UploadIcon width={35} height={35} />
              </View>
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
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.innerContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  innerContainer: {
    flexGrow: 1,
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
    backgroundColor: '#CCCCCC',
    borderColor: globalStyle.colors.labelColor,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dotted',
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
