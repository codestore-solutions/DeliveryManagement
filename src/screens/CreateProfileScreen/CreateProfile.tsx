import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import styles from './CreateProfileStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BankDetails, KycDetails, PersonalDetails, VechileDetails} from '../../components';

const CreateProfile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'Pesonal Details'},
    {key: '2', title: 'KYC'},
    {key: '3', title: 'Vechile Details'},
    {key: '4', title: 'Bank Details'},
  ]);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case '1':
        return (
          <View style={styles.sceneContainer}>
            <PersonalDetails />
          </View>
        );
      case '2':
        return (
          <View style={styles.sceneContainer}>
            <KycDetails />
          </View>
        );
      case '3':
        return (
          <View style={styles.sceneContainer}>
            <VechileDetails />
          </View>
        );
        case '4':
        return (
          <View style={styles.sceneContainer}>
            <BankDetails />
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      scrollEnabled
      activeColor="#ffffff"
      inactiveColor="#7E8299"
      pressColor="#ffffff"
      pressOpacity={1}
      indicatorStyle={styles.indicator}
      renderLabel={({route, focused, color}) => (
        <View style={[styles.label, focused && styles.activeTabLabel]}>
          <Text
            style={[
              styles.tabLabelText,
              {color, fontWeight: focused ? 'bold' : 'normal'},
            ]}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

export default CreateProfile;
