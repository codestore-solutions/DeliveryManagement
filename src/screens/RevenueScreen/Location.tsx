import { View, Text, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react'
import { AddAddress, BottomSheet, SelectTimeScreen } from '../../components';
import styles from './LocationStyle';
const Location = () => {
  const [visible, setVisible] = useState<boolean>(false);
 
  const openModal = () =>{
      setVisible(true);
  }
  const closeModal = () =>{
    setVisible(false);
}

  return (
    <SafeAreaView>
         <Pressable style={styles.container} onPress={openModal}>
            <Text style={styles.textColor}>View</Text>
         </Pressable>
      <BottomSheet visibility={visible} closeModel={closeModal} element={   <AddAddress/>} />
    </SafeAreaView>
  )
}

export default Location