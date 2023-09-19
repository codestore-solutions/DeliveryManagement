import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React,{useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import styles from './HeaderStyles';
import {useRoute} from '@react-navigation/native';
import {LeftArrowIconHeader, MenuIcon, NotificationIcon} from '../../assets';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  AuthStateInterface,
  reset, userSelector,
} from '../../store/features/authSlice';
import UserService from '../../services/UserService';

interface TabHeaderProps {
  title: string;
  type?: number;
  status?: boolean;
}

const TabHeader: React.FC<TabHeaderProps> = ({title, type, status}) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const [statusLoader, setStatusLoader] = useState<boolean>(true);
  const {isAuthenticated, loading, data} = useAppSelector(
    userSelector,
  ) as AuthStateInterface;

  const navigation = useNavigation<NavigationProps>();
  const goBackHandler = () => {
    if (route.name === 'CreateProfile') {
      navigation.navigate('Home', {screen: 'Dashboard'});
    } else {
      navigation.goBack();
    }
  };
  // const redirectNavigation = () =>{
  //   if (isAuthenticated) {
  //     UserService.getUserProfileStatus(data?.id)
  //       .then(res => {
  //         setStatusLoader(true)
  //         if (res?.statusCode === 200) {
  //           if (res?.data?.isProfileCompleted) {
  //             console.log('first', res?.data?.isProfileCompleted);
  //             navigation.navigate('Home', {
  //               screen: 'Dashboard',
  //             });
  //           } else {
  //             console.log('comes first');
  //             navigation.navigate('CreateProfile');
  //           }
  //         }
  //       })
  //       .catch(err => {
  //         if(err?.status === 404){
  //             console.log('Err Not found profile status', err)
  //         }
  //         console.log('profile status fetching err', err?.data);
  //       }).finally(() =>{
  //           setStatusLoader(false);
  //       });
  //   } else {
  //     navigation.navigate('Login');
  //   }
  // }
  const logout = () => {
    dispatch(reset());
  };


  return (
    <View style={styles.container}>
      {type === 0 ? (
        <Pressable onPress={status ? goBackHandler : logout}>
          <LeftArrowIconHeader width={30} height={30} />
        </Pressable>
      ) : (
        <Pressable onPress={() => navigation.openDrawer()}>
          <MenuIcon width={30} height={30} />
        </Pressable>
      )}
      <Text style={styles.heading}>{title}</Text>
      <TouchableOpacity
        style={styles.bellIcon}
        // onPress={() =>
        //   navigation.navigate('Home', {
        //     screen: 'Notification',
          // })}
        >
          

          <>
            <NotificationIcon width={30} height={30} />
            <Text style={styles.tag}>9</Text>
          </>
        
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
