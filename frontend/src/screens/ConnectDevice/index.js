import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Reload from 'react-native-vector-icons/AntDesign';
import styles from './styles';

import {Switch} from '../../components/toggle';
import {Divider} from '../../components/divider';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Refresh from '../../assets/svg/buttons/single/refresh.svg';

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
const Buffer = require('buffer/').Buffer;

const ConnectDevice = ({navigation}) => {
  const [onlyRoomFit, setOnlyRoomFit] = useState(false);
  const toggleSwitch = () => setOnlyRoomFit(previousState => !previousState);

  const dispatch = useAppDispatch();
  const discoveredDevices = useAppSelector(state => state.ble.allDevices);
  const connectedDevice = useAppSelector(state => state.ble.connectedDevice);
  const battery = useAppSelector(state => state.ble.battery);

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
          marginTop: 30 * height_ratio,
          width: 358 * width_ratio,
          height: 30 * height_ratio,
          marginBottom: 10 * height_ratio,
        }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        {
          <TouchableOpacity
            style={styles.connectButton}
            onPress={async () => {
              await dispatch(connectToDevice(device));
              dispatch(readDeviceBattery());
            }}>
            <Text style={styles.connect}>연결</Text>
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
        <Image
          style={styles.devider}
          source={require('../../assets/images/devider.png')}></Image>
      </View>
      <ScrollView>
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
