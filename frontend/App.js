import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions, Platform, View, Text} from 'react-native';

//screens
import Intro from './src/screens/Intro/index.js';
import HomeScreen from './src/screens/HomeScreen/index.js';
import Register from './src/screens/Register/index.js';
import Login from './src/screens/Login/index.js';
import PasswordFind from './src/screens/Login/Find/Password/index.js';
import MyRoutine from './src/screens/Routine/MyRoutine/index.js';
import AddRoutine from './src/screens/Routine/AddRoutine/index.js';
import AddMotion from './src/screens/AddMotion/index.js';
import WorkoutReady from './src/screens/WorkoutReady/index.js';
import ConnectDevice from './src/screens/ConnectDevice/index.js';
import WorkoutStart from './src/screens/WorkoutStart/index.js';
import RoutineDetail from './src/screens/Routine/RoutineDetail/index.js';
import WorkoutRecord from './src/screens/WorkoutRecord/index.js';
import WorkoutDetail from './src/screens/WorkoutDetail/index.js';
import MainSetting from './src/screens/Settings/MainSetting/index.js';
import ProfileSetting from './src/screens/Settings/ProfileSetting/index.js';
import PasswordSetting from './src/screens/Settings/PasswordSetting/index.js';
import HeightWeight from './src/screens/Settings/HeightWeight/index.js';
import BodyFat from './src/screens/Settings/BodyFat/index.js';
import IntroSplash from './src/screens/Intro/splash.js';
import Gender from './src/screens/Register/Gender/index.js';
import RestingTime from './src/screens/Settings/RestingTime/index.js';
import PowerSaving from './src/screens/Settings/PowerSaving/index.js';
import WokroutCareer from './src/screens/Settings/WokroutCareer/index.js';
import CustomMotion from './src/screens/AddMotion/CustomMotion/index.js';
import WorkoutStartSplash from './src/screens/WorkoutStart/splash.js';
import Birthday from './src/screens/Register/Birthday/index.js';
import MotionDetail from './src/screens/MotionDetail/index.js';
import RecordDetail from './src/screens/RecordDetail/index.js';
import TestScreen from './src/screens/TestScreen/index.js';

//State Control
import {Provider} from 'react-redux';
import {store} from './src/redux/store.ts';
import {Provider as MobxProvider} from 'mobx-react';
import BLEStore from './src/redux/BLE/mobx_store.js';
import AppProvider from './src/contexts/AppProvider.js';

//warning ignore
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <MobxProvider store={BLEStore}>
          <NavigationContainer theme={Theme}>
            <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
              <Stack.Screen
                name="IntroSplash"
                component={IntroSplash}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Intro"
                component={Intro}
                options={{gestureEnabled: false, headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: true,
                  title: '',
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="PasswordFind"
                component={PasswordFind}
                options={{
                  headerShown: true,
                  title: '',
                  headerShadowVisible: false,
                }}
              />

              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: true,
                  title: '',
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Birthday"
                component={Birthday}
                options={{
                  headerShadowVisible: false,
                  title: '',
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="Gender"
                component={Gender}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  title: '',
                }}></Stack.Screen>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                  animation: 'none',
                  title: '운동',
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 20 * height_ratio,
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
                    fontSize: 16 * height_ratio,
                  },
                }}
              />
              <Stack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{
                  headerShown: true,
                  title: '테스트 모드',
                  headerShadowVisible: false,
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16 * height_ratio,
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
                    fontSize: 16 * height_ratio,
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
                    fontSize: 16 * height_ratio,
                  },
                  headerBackVisible: false,
                  headerShadowVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="RoutineDetail"
                component={RoutineDetail}
                options={{
                  title: '루틴 상세',
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16 * height_ratio,
                  },
                  headerBackVisible: false,
                  headerShadowVisible: false,
                }}></Stack.Screen>

              <Stack.Screen
                name="AddMotion"
                component={AddMotion}
                options={{
                  title: '동작 선택',
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16 * height_ratio,
                  },
                  headerShadowVisible: false,
                }}></Stack.Screen>

              <Stack.Screen
                name="MotionDetail"
                component={MotionDetail}
                options={{
                  title: '동작 상세',
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16 * height_ratio,
                  },
                  headerBackVisible: false,
                  headerShadowVisible: false,
                }}></Stack.Screen>

              <Stack.Screen
                name="CustomMotion"
                component={CustomMotion}
                options={{
                  title: '커스텀 동작 생성',
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16 * height_ratio,
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
                    fontSize: 20 * height_ratio,
                    marginLeft: Platform.OS === 'ios' ? 0 : 20 * width_ratio,
                  },
                  headerBackVisible: false,
                  headerShadowVisible: false,
                }}></Stack.Screen>

              <Stack.Screen
                name="WorkoutStartSplash"
                component={WorkoutStartSplash}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="WorkoutStart"
                component={WorkoutStart}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="WorkoutRecord"
                component={WorkoutRecord}
                options={{
                  title: '운동기록',
                  animation: 'none',
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 28 * height_ratio,
                    // marginLeft: Platform.OS === 'ios' ? 0 : 20 * width_ratio,
                  },
                  headerTitle: props => (
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 28 * height_ratio,
                          fontWeight: 700,
                          color: '#242424',
                        }}>
                        {props.children}
                      </Text>
                    </View>
                  ),
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="WorkoutDetail"
                component={WorkoutDetail}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  headerTitleAlign: 'center',
                }}></Stack.Screen>
              <Stack.Screen
                name="RecordDetail"
                component={RecordDetail}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  headerTitleAlign: 'center',
                }}></Stack.Screen>
              <Stack.Screen
                name="MainSetting"
                component={MainSetting}
                options={{
                  animation: 'none',
                  headerShown: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="ProfileSetting"
                component={ProfileSetting}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="PasswordSetting"
                component={PasswordSetting}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="RestingTime"
                component={RestingTime}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="PowerSaving"
                component={PowerSaving}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="HeightWeight"
                component={HeightWeight}
                options={{
                  headerTitleStyle: {
                    title: '키/몸무게',
                    color: '#242424',
                    fontSize: 16 * height_ratio,
                    fontWeight: '700',
                  },
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="BodyFat"
                component={BodyFat}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
              <Stack.Screen
                name="WorkoutCareer"
                component={WokroutCareer}
                options={{
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </MobxProvider>
      </AppProvider>
    </Provider>
  );
};

export default App;
