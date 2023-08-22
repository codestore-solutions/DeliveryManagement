import {StyleSheet} from 'react-native';
import globalStyle from '../../global/globalStyle';

const styles = StyleSheet.create({
  dashboard: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    width: '50%',
  },
  switchBox: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusTag: {
    color: globalStyle.colors.labelColor,
  },
  switch: {
    height: 30,
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  timeLine: {
    marginVertical: 6,
    paddingVertical: 5,
    paddingHorizontal: 3,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  timeLintBtn: {
    marginHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 25,
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    marginRight: 15,
    elevation: 0.8,
  },
  activeBtn: {
    backgroundColor: '#3E3AFF',
    borderBottomWidth:3,
    borderLeftWidth:3,
    borderRightWidth:3,
    borderColor:'#fff',
    shadowColor: '#3E3AFF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
  },
  activeText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  timeLintBtnText: {
    fontWeight: '500',
    fontSize: 16,
  },
  cardsContainer: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardsOneContainer: {
    width: '48.2%',
  },
  cardsTwoContainer: {
    width: '48.3%',
  },
  cardContainer: {
    marginVertical: 4,
  },
  requestListContainer: {
    marginVertical: 10,
    paddingHorizontal:3,
    flex:1,
  },
  requestListContainerHeader: {
    marginBottom:15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '600',
    fontSize:20,
  },
  btnText: {
    color: globalStyle.colors.baseColor,
  },
});

export default styles;
