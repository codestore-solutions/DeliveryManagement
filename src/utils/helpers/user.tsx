import AsyncStorage from '@react-native-async-storage/async-storage';

export const Userheplers = {
  storeUser: async (user: any) => {
    try {
      const userString = JSON.stringify(user);
      await AsyncStorage.setItem('user', userString);
      console.log('User object stored successfully!');
    } catch (error) {
      console.log('Error storing user object:', error);
    }
  },

  retrieveUser: async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        const user = JSON.parse(userString);
        console.log('Retrieved user object:', user);
        return user;
      } else {
        console.log('No user object found.');
        return null;
      }
    } catch (error) {
      console.log('Error retrieving user object:', error);
      return null;
    }
  },
};
