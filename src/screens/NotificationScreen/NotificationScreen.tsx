import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './NotificationStyle';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import globalStyle from '../../global/globalStyle';

const data = [
  {
    key: 1,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 2,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 3,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 4,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 5,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 6,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 7,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 8,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 9,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 10,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 11,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 12,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
  {
    key: 13,
    message: 'Lorem ipsum dolor sit amet...',
    time: '2 min ago',
  },
];

const renderItem = ({item}: any | null) => {
  return (
    <TouchableOpacity key={item.key} style={styles.noticationCard}>
      <View style={styles.noticationCardRow}>
        <Text style={styles.noticationColOne}>{item.message}</Text>
        <Text style={styles.noticationColTow}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
  return (
    <SafeAreaView style={[styles.container, globalStyle.container]}>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.key}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
