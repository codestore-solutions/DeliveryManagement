import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {CheckIcon, CompanyIcon, EditIcon, EmailIcon} from '../../assets';
import globalStyle from '../../global/globalStyle';

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.profileScreen}>
      <View style={styles.container}>
        <View style={styles.Profileheader}>
          <TouchableOpacity>
            <Text style={styles.profileButton}>Profile Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileEditIcon}
            onPress={() => navigation.navigate('CreateProfile')}>
            <EditIcon width={23} height={23} />
          </TouchableOpacity>
        </View>
        <View style={styles.ProfileContent}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/svgs/companyavatar.png')}
              style={styles.profileAvatar}
            />
            <Text style={styles.profileAboutDesc}>Profile Image</Text>
          </TouchableOpacity>
          <View style={styles.profileDescription}>
            <Text style={styles.profileName}>Ravi Chaurasiya</Text>
            <View style={styles.profileTag}>
              <View style={styles.profileTagIcon}>
                <CheckIcon width={16} height={17} />
              </View>
              <Text style={styles.profileTagText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.profileFounded}>Agent Id - 45</Text>
          <Text style={styles.profileAboutHeading}>Details:</Text>
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>Service Range - 15 KM</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>
                Service Location- Noida, Sector 59,61, 62.{' '}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>
                Address- Kankhal, Haridwar
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>PinCode- 249408</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>District- Haridwar</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.profileFounded}>State- Uttrakhand</Text>
            </View>
          </View>
        </View>
        <View style={styles.Profilefooter}>
          <Text style={styles.profileUsername}>Contacts</Text>
          <View style={styles.profileContacts}>
            <View style={styles.profileContactsLink}>
              <EmailIcon width={15} height={15} />
              <Text style={styles.linkText}>ravi99@gmail.com</Text>
            </View>
            <View style={styles.profileContactsLink}>
              <CompanyIcon width={15} height={15} />
              <Text style={styles.linkText}>+91 7860965109</Text>
              <Text style={styles.linkText}>+91 7355986157</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Home', {
                     screen:'Assignments'
                  })
                }>
                <Text style={{color: '#E74C43', textAlign: 'center'}}>Go to Home</Text>
              </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileScreen: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
  },
  details: {},
  detailItem: {},
  container: {
    marginVertical: 46,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0.3, height: 1},
    shadowOpacity: 0.4,
    borderRadius: 10,
  },
  Profileheader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  profileButton: {
    fontSize: 23,
    lineHeight: 24,
    borderBottomColor: '#66789C',
    borderBottomWidth: 1,
  },
  profileEditIcon: {
    backgroundColor: globalStyle.colors.baseColor,
    padding: 10,
    borderRadius: 50,
  },
  ProfileContent: {
    marginVertical: 15,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileDescription: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    color: '#05264E',
    fontSize: 20,
    lineHeight: 35,
  },
  profileTag: {
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTagIcon: {
    backgroundColor: '#00D246',
    paddingHorizontal: 4,
    paddingVertical: 4.3,
    lineHeight: 22,
    borderleftRadius: 10,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  profileTagText: {
    backgroundColor: '#00A938',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: '#fff',
    letterSpacing: 0.02,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  profileFounded: {
    marginVertical: 10,
    color: '#05264E',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.03,
  },
  profileAboutHeading: {
    color: '#05264E',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.03,
  },
  profileAboutDesc: {
    color: '#66789C',
    fontSize: 16,
    lineHeight: 22,
  },
  Profilefooter: {},
  profileUsername: {
    color: '#05264E',
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 0.03,
  },
  profileContacts: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
  },
  profileContactsLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  linkText: {
    marginLeft: 10,
  },
});
