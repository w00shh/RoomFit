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
import Back from 'react-native-vector-icons/Ionicons';
import OnOff from '../../components/Switch';
import styles from './styles';

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
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              marginRight: 10 * width_ratio,
              marginTop: 5 * height_ratio,
              fontWeight: '700',
              fontSize: 15,
            }}>
            새로고침
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(startScanning());
            }}>
            <Reload
              name="reload1"
              size={25}
              color="#242424"
              style={styles.reloadIcon}></Reload>
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
            <Image
              style={styles.devider}
              source={require('../../assets/images/devider.png')}></Image>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <OnOff></OnOff>
          <Text>룸핏만 보기</Text>
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
