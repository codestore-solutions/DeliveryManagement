import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigations from './src/navigations/StackNavigations';
import Toast from 'react-native-toast-message';
// import  Toast  from './src/components/common/Toast/Toast';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigations />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
