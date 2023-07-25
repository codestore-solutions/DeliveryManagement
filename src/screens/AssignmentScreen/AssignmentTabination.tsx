import { View, Text, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import {TabView, TabBar} from 'react-native-tab-view';
import AssignmentScreen from './AssignmentScreen';
import PendingAssignment from './PendingAssignment';
import CompletedAssignment from './CompletedAssignment';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import IgnoredAssignment from './IgnoredAssignment';

const AssignmentTabination = () => {
  const {data} = useAppSelector((state: RootState) => state.auth);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'Ongoing'},
    {key: '2', title: 'Pending'},
    {key: '3', title: 'Completed'},
    {key: '4', title: 'Ignored'},
  ]);
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case '1':
        return (
          <View style={styles.sceneContainer}>
            <AssignmentScreen userData={data} />
          </View>
        );
      case '2':
        return (
          <View style={styles.sceneContainer}>
            <PendingAssignment userData={data} />
          </View>
        );
      case '3':
        return (
          <View style={styles.sceneContainer}>
            <CompletedAssignment userData={data} />
          </View>
        );
        case '4':
        return (
          <View style={styles.sceneContainer}>
            <IgnoredAssignment userData={data} />
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
              {color, fontWeight: focused ? 'bold' : 'normal',  paddingBottom:4},
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
  )
}

export default AssignmentTabination

const styles = StyleSheet.create({
    sceneContainer: {
       flex:1,
       backgroundColor:'#fff'
    },
    tabBar: {
      backgroundColor: '#fff',
      elevation: 0, 
      shadowOpacity: 0,
    },
    indicator: { 
      backgroundColor: '#f2f2f2', // Set the indicator width to 0 to hide it
      height: 0,
      width: 0,
    },
     label: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:150,
      textDecorationLine:'none',
      paddingVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: '#EAEAEA',
      borderRadius: 25,
      marginHorizontal:5,
      elevation: 0.8,
    },
    activeTabLabel: {
      backgroundColor: '#3E3AFF',
      borderBottomWidth:3,
      paddingBottom:3,
      borderLeftWidth:3,
      borderRightWidth:3,
      borderColor:'#fff',
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 8,
    },
    tabLabelText:{
       fontSize:15,
       zIndex:1
    },
  });