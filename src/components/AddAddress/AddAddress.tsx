import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {AddIcon, CheckedRadioIcon, ReadioIcon} from '../../assets';
import globalStyle from '../../global/globalStyle';
import SelectTimeScreen from '../DayandTime/SelectTimeScreen';
import AddNewAddress from '../AddNewAddress/AddNewAddress';

const AddAddress = () => {
  const [selectedIndex, setIndex] = React.useState(0);
  const [edit, setEdit] = useState<boolean>(false);
  const isEdit = () => {
    setEdit(true);
  };
  const isEditCancel = () => {
    setEdit(false);
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.card} key={item.id}>
        <View style={styles.cardLeft}>
          {item.checked ? (
            <CheckedRadioIcon width={20} height={20} />
          ) : (
            <ReadioIcon width={20} height={20} />
          )}
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardheading}>{item.title}</Text>
          <Text style={styles.carddesc}>{item.description}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.cardFooterRight}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const data = [
    {
      id: '1',
      title: 'Home',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis eius commodi saepe.',
      time: 'Mon-Wed (9:00 - 15:00)',
      checked: true,
    },
    {
      id: '2',
      title: 'Work',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis eius commodi saepe.',
      time: 'Mon-Wed (9:00 - 15:00)',
      checked: false,
    },
  ];
  if (edit) {
    return (
        <AddNewAddress onCancel={isEditCancel} />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Working Location</Text>
          <Pressable style={styles.add} onPress={isEdit}>
            <AddIcon width={18} height={18} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map(item => renderItem(item))}
          </ScrollView>
        </View>
      </View>
    );
  }
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 24,
  },
  add: {
    padding: 7,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
  },
  content: {
    marginVertical: 10,
  },
  card: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    borderColor: '#EAEAEA',
    borderWidth: 0.01,
    borderRadius: 8,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    flex: 10,
    flexDirection: 'column',
  },
  cardheading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  time: {
    color: globalStyle.colors.labelColor,
    letterSpacing: 0.02,
  },
  carddesc: {
    fontSize: 12,
    lineHeight: 20,
    color: '#777777',
    letterSpacing: 0.02,
    paddingVertical: 3,
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterLeft: {},
  cardFooterRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  btn: {
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  btnTxt: {
    color: globalStyle.colors.labelColor,
  },
});
