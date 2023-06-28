import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Intro from './src/screens/Intro/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';
import Register from './src/screens/Register/index.js';
import Login from './src/screens/Login/index.js';
import MyRoutine from './src/screens/Routine/MyRoutine/index.js';
import AddRoutine from './src/screens/Routine/AddRoutine/index.js';
import AddMotion from './src/screens/AddMotion/index.js';
import WorkoutReady from './src/screens/WorkoutReady/index.js';
import ConnectDevice from './src/screens/ConnectDevice/index.js';
import WorkoutStart from './src/screens/WorkoutStart/index.js';
import RoutineDetail from './src/screens/Routine/RoutineDetail/index.js';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={Store}>
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
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: true,
              title: '운동',
              headerShadowVisible: true,
              headerBackVisible: false,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name="ConnectDevice"
            component={ConnectDevice}
            options={{
              headerShown: true,
              title: '기기 연결',
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 16,
              },
            }}
          />
          <Stack.Screen
            name="MyRoutine"
            component={MyRoutine}
            options={{
              title: '내 루틴',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 16,
              },
              headerShadowVisible: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="AddRoutine"
            component={AddRoutine}
            options={{
              title: '새로운 루틴',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 16,
              },
              headerShadowVisible: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="RoutineDetail"
            component={RoutineDetail}
            options={{
              title: '루틴 상세',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 16,
              },
              headerShadowVisible: false,
            }}></Stack.Screen>

          <Stack.Screen
            name="AddMotion"
            component={AddMotion}
            options={{
              title: '동작 선택',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 16,
              },
              headerShadowVisible: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="WorkoutReady"
            component={WorkoutReady}
            options={{
              title: '운동',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 20,
                marginLeft: 20,
              },
              headerBackVisible: false,
              headerShadowVisible: true,
            }}></Stack.Screen>

          <Stack.Screen
            name="WorkoutStart"
            component={WorkoutStart}
            options={{
              headerShown: false,
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
