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
    elevation: 1.2,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    marginVertical: 5,
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
  },
  btnText: {
    color: globalStyle.colors.baseColor,
  },
  requstCard: {
    backgroundColor:'#F9F9F9',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical:5,
    borderRadius:15,
  },
  requstCardRow: {
    marginVertical:5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requstColOne: {
    color:'#7E8299',
    fontSize:16,
    fontWeight:'400'
  },
  requstColTow: {
     color:'#000000',
     fontSize:16,
     fontWeight:'400'
  },
});

export default styles;
