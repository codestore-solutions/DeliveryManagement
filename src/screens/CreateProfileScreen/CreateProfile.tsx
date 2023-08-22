import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import styles from './CreateProfileStyle';
import {
  BankDetails,
  KycDetails,
  PersonalDetails,
  VechileDetails,
} from '../../components';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import {AuthStateInterface} from '../../store/features/authSlice';
import WorkingLocation from '../WorkingLocation/WorkingLocation';

const CreateProfile = () => {
  const {data} = useAppSelector(
    (state: RootState) => state.auth,
  ) as AuthStateInterface;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'Pesonal Details'},
    {key: '2', title: 'KYC'},
    {key: '3', title: 'Vehicle Details'},
    {key: '4', title: 'Bank Details'},
    {key: '5', title: 'Working Location'},
  ]);

  const goToNextIndex = () => {
    setIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= routes.length ? 0 : nextIndex;
    });
  };

  // Function to navigate to the previous index
  const goToPrevIndex = () => {
    setIndex((prevIndex:number) => {
      const prevIdx = prevIndex - 1;
      return prevIndex < 0 ? routes.length - 1 : prevIdx;
    });
  };
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case '1':
        return (
          <View style={styles.sceneContainer}>
            <PersonalDetails data={data} index={index} goToNextIndex={goToNextIndex} />
          </View>
        );
      case '2':
        return (
          <View style={styles.sceneContainer}>
            <KycDetails data={data} goToNextIndex={goToNextIndex}   />
          </View>
        );
      case '3':
        return (
          <View style={styles.sceneContainer}>
            <VechileDetails data={data} index={index} goToNextIndex={goToNextIndex} />
          </View>
        );
      case '4':
        return (
          <View style={styles.sceneContainer}>
            <BankDetails data={data} index={index} goToPrevIndex={goToPrevIndex}  goToNextIndex={goToNextIndex} />
          </View>
        );
      case '5':
        return (
          <View style={styles.sceneContainer}>
             <WorkingLocation index={index} />
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
      renderScene={({ route }) => renderScene({ route, data })}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

export default CreateProfile;
