import {
  View,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {AddAddress} from '../../components';

const Location = () => {
  const [page, setPage] = useState<boolean>(true);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#fff', height:'100%'}}>
        <AddAddress page={page} />
      </View>
    </SafeAreaView>
  );
};

export default Location;
