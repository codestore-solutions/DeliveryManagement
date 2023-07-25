import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async (user:any) => {
  const userString = JSON.stringify(user);
  await AsyncStorage.setItem('user', userString);
};

const removeUser = async () => {
  await AsyncStorage.removeItem('user');
  console.log('User removed from storage successfully!');
};

const getUser = async () => {
  const userString = await AsyncStorage.getItem('user');
  const data = userString ? JSON.parse(userString) : null
  return data ? data : null;
};

const checkUser = async () => {
  const userString = await AsyncStorage.getItem('user');
  const data = userString ? JSON.parse(userString) : null;
  return data ? true : false;
};

export default {
  storeUser,
  removeUser,
  getUser,
  checkUser,
};
