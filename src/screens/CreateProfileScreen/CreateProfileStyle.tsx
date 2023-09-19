import {StyleSheet} from 'react-native';
import globalStyle from '../../global/globalStyle';

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: '#f2f2f2',
    height: 0,
    width: 0,
  },
  label: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    textDecorationLine: 'none',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight:10,
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 0.8,
  },
  activeTabLabel: {
    backgroundColor: '#3E3AFF',
    borderBottomWidth: 3,
    paddingBottom: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  tabLabelText: {
    fontSize: 15,
    zIndex: 1,
  }
});

export default styles;

