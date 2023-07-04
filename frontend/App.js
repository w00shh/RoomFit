import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Linking} from 'react-native';
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
import Splash from './src/screens/Intro/splash.js';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store.js';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const App = () => {
  // React.useEffect(() => {
  //   const handleDeepLink = async () => {
  //     // 앱이 최초로 실행되었을 때 딥 링크 처리
  //     const initialUrl = await Linking.getInitialURL();
  //     if (initialUrl) {
  //       handleUrl(initialUrl);
  //     }

  //     // 딥 링크 이벤트 리스너 등록
  //     Linking.addEventListener('url', handleUrl);
  //   };

  //   const handleUrl = url => {
  //     const sep_url = url.url.split('auth?')[1];
  //     const params = {};
  //     sep_url.split('/').forEach(pair => {
  //       const [key, value] = pair.split('=');
  //       params[key] = value;
  //     });
  //     const json = JSON.stringify(params);
  //     console.log(params);
  //   };

  //   handleDeepLink();

  //   // 딥 링크 이벤트 리스너 해제
  //   return () => {
  //     Linking.removeEventListener('url', handleUrl);
  //   };
  // }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
              transitionConfig: () => ({
                transitionSpec: {
                  duration: 500, // 애니메이션 지속 시간 설정
                },
                screenInterpolator: sceneProps => {
                  // 애니메이션을 커스터마이즈할 수 있는 함수
                  // 예시: 페이드 애니메이션
                  const {position, layout, scene} = sceneProps;
                  const {index} = scene;

                  const opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 1, 0],
                  });

                  return {opacity};
                },
              }),
            }}
          />
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
            name="PasswordFind"
            component={PasswordFind}
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
              animation: 'none',
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
          <Stack.Screen
            name="WorkoutRecord"
            component={WorkoutRecord}
            options={{
              title: '운동기록',
              animation: 'slide_from_right',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 28,
                marginLeft: 20,
              },
              headerShadowVisible: false,
              headerBackVisible: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="WorkoutDetail"
            component={WorkoutDetail}
            options={{
              headerShadowVisible: false,
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
