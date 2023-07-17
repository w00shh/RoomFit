import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import styles from './styles';

import {Switch} from '../../components/toggle';
import {Divider} from '../../components/divider';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Refresh from '../../assets/svg/buttons/single/refresh.svg';

import Loading from '../../assets/svg/icons/loading.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

import {
  startScanning,
  readDeviceBattery,
  stopScanning,
} from '../../redux/BLE/slice';
import {connectToDevice, disconnectFromDevice} from '../../redux/BLE/listener';
import {store, useAppDispatch, useAppSelector} from '../../redux/store';

import {checkBluetoothPermissions} from '../../redux/BLE/permission';
import {Easing} from 'react-native-reanimated';
const Buffer = require('buffer/').Buffer;

const ConnectDevice = ({navigation}) => {
  const [onlyRoomFit, setOnlyRoomFit] = useState(false);
  const toggleSwitch = () => setOnlyRoomFit(previousState => !previousState);

  const [isConnecting, setIsConnecting] = useState('');
  const rotateIndex = useRef(new Animated.Value(0)).current;
  const rotateValue = rotateIndex.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dispatch = useAppDispatch();
  const discoveredDevices = useAppSelector(state => state.ble.allDevices);
  const connectedDevice = useAppSelector(state => state.ble.connectedDevice);
  const battery = useAppSelector(state => state.ble.battery);

  const startRotating = () => {
    rotateIndex.setValue(0);
    Animated.loop(
      Animated.timing(rotateIndex, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  };

  const stopRotating = () => {
    rotateIndex.stopAnimation();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8 * width_ratio,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15 * height_ratio,
            }}>
            새로고침
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(startScanning());
            }}>
            <Refresh height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    checkBluetoothPermissions().then(res => {
      if (res) {
        console.log('Start Scanning');
        dispatch(startScanning());
      }
    });
  }, []);

  const RenderDevices = ({device}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 7 * height_ratio,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12 * width_ratio,
            alignItems: 'center',
          }}>
          <Text style={styles.deviceName}>{device.name}</Text>
          {isConnecting === device.id && (
            <Animated.View style={{transform: [{rotate: rotateValue}]}}>
              <Loading height={16 * height_ratio} width={16 * width_ratio} />
            </Animated.View>
          )}
        </View>
        {
          <TouchableOpacity
            style={styles.connectButton}
            onPress={async () => {
              setIsConnecting(device.id);
              startRotating();
              await dispatch(connectToDevice(device));
              stopRotating();
              setIsConnecting('');
              dispatch(readDeviceBattery());
            }}>
            <Text style={styles.connect}>
              {isConnecting === device.id ? '취소' : '연결'}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {connectedDevice && (
        <View>
          <View style={styles.connectExplain}>
            <Text style={styles.statusText}>연결된 기기</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Divider height_ratio={height_ratio} />
          </View>
          <View style={styles.connectContainer}>
            <View>
              <Text style={styles.connectText}>{connectedDevice.name}</Text>
              {typeof battery == 'number' && (
                <Text style={styles.battery}>배터리 {battery}%</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={() => {
                dispatch(disconnectFromDevice(connectedDevice));
              }}>
              <Text style={styles.connect}>연결 해제</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.connectExplain}>
        <Text style={styles.statusText}>탐색된 기기</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8 * width_ratio,
          }}>
          <Switch on={onlyRoomFit} onPress={toggleSwitch} />
          <Text style={{fontSize: 14 * height_ratio}}>룸핏만 보기</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Divider height_ratio={height_ratio} />
      </View>
      <ScrollView style={{gap: 8 * height_ratio}}>
        {discoveredDevices.map((device, index) => (
          <View key={device.id}>
            <RenderDevices
              device={device}
              isLast={index === discoveredDevices.length - 1}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectDevice;
