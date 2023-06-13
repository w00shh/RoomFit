import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  intro: {
    position: 'absolute',
    marginTop: '11%',
    marginLeft: '8%',
    marginRight: '8%',
  },

  mainLogo: {
    position: 'absolute',
    marginTop: '109%',
    marginLeft: '20%',
    marginRight: '20%',
  },

  Apple_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',

    width: 358,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: '135%',
  },
  Google_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    backgroundColor: '#4285f4',

    width: 358,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 12,
  },

  Button_Text: {
    color: 'white',
    fontSize: 16,
    fontWeight : '450',
  },

  selectionContainer: {
    marginTop: 45,
    flexDirection:'row',

    flex :1,
  },

  devider :{
    height:20,
  }

});

export default styles;
