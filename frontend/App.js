import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './src/screens/Intro/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';
import Register from './src/screens/Register/index.js';
import Login from './src/screens/Login/index.js';

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
          name="Login"
          component={Login}
          options={{headerShown: true, title: '', headerShadowVisible: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: true, title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
