import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Accordion} from '../../components';

const FaqScreen = () => {
  return (
 
      <View style={styles.container}>
        <View style={styles.row}>
          <Accordion
            title={'Lorem ipsum dummy heading'}
            content={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            }
          />
        </View>
        <View style={styles.row}>
          <Accordion
            title={'Lorem ipsum dummy heading'}
            content={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            }
          />
        </View>
        <View style={styles.row}>
          <Accordion
            title={'Lorem ipsum dummy heading'}
            content={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            }
          />
        </View>
        <View style={styles.row}>
          <Accordion
            title={'Lorem ipsum dummy heading'}
            content={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            }
          />
        </View>
      </View>
   
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height:'100%'
  },
  row: {
    width: '100%',
    marginVertical: 10,
  },
});
