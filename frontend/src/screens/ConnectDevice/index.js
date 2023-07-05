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
import OnOff from '../../components/Switch';
import styles from './styles';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

import {
  startScanning,
  stopScanning,
  disconnectDevice,
} from '../../redux/BLE/slice';
import {connectToDevice} from '../../redux/BLE/listener';
import {store, useAppDispatch, useAppSelector} from '../../redux/store';

import {checkBluetoothPermissions} from '../../redux/BLE/permission';
const Buffer = require('buffer/').Buffer;

const ConnectDevice = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
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
              dispatch(stopScanning());
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

  const [testMode, setTestMode] = useState('read');
  const [getBattery, setGetBattery] = useState('');
  const [pp, setPP] = useState('');
  const [inputText, setInputText] = useState('');

  const dispatch = useAppDispatch();
  const discoveredDevices = useAppSelector(state => state.ble.allDevices);
  const connectedDevice = useAppSelector(state => state.ble.connectedDevice);

  useEffect(() => {
    checkBluetoothPermissions().then(res => {
      if (res) {
        console.log('Start Scanning');
        dispatch(startScanning());
        setTimeout(() => {
          stopScanning();
          console.log('Stopped Scanning');
        }, 15000);
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
          marginHorizontal: 16 * width_ratio,
          marginTop: 30 * height_ratio,
          width: 350 * width_ratio,
          height: 30 * height_ratio,
          marginBottom: 10 * height_ratio,
        }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        {
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => {
              dispatch(connectToDevice(device));
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
              <Text style={styles.battery}>배터리 {String(getBattery)}</Text>
            </View>
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={() => {
                dispatch(disconnectDevice());
              }}>
              <Text style={styles.connect}>연결 해제</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.connectExplain}>
        <Text style={styles.statusText}>탐색된 기기</Text>
        <View style={{flexDirection: 'row'}}>
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
