import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './src/screens/Intro/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options = {{title: '운동'},{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
