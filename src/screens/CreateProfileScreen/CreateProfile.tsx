import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import styles from './CreateProfileStyle';
import {BankDetails, KycDetails, PersonalDetails, VechileDetails} from '../../components';
import UserService from '../../services/UserService';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import {AuthStateInterface} from '../../store/features/authSlice'

const CreateProfile = () => {
  const {data} = useAppSelector((state:RootState) => state.auth) as  AuthStateInterface
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
            <PersonalDetails data={data}  />
          </View>
        );
      case '2':
        return (
          <View style={styles.sceneContainer}>
            <KycDetails data={data} />
          </View>
        );
      case '3':
        return (
          <View style={styles.sceneContainer}>
            <VechileDetails data={data} />
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
