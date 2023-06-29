import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Intro');
    }, 1500);
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../../assets/images/img_logo_roomfit.png')}></Image>
    </View>
  );
};

export default Splash;
