import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Platform,
  NativeModules,
  NativeEventEmitter,
  Dimensions,
  PermissionsAndroid,
  FlatList,
  Alert,
} from 'react-native';
import Reload from 'react-native-vector-icons/AntDesign';
import OnOff from '../../components/Switch';
import styles from './styles';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {stringToBytes} from 'convert-string';
const Buffer = require('buffer/').Buffer;

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ConnectDevice = ({navigation}) => {
  navigation.setOptions({
    headerRight: () => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            marginRight: 10,
            marginTop: 5,
            fontWeight: '700',
            fontSize: 15,
          }}>
          새로고침
        </Text>
        <TouchableOpacity onPress={startScan}>
          <Reload
            name="reload1"
            size={25}
            color="#242424"
            style={styles.reloadIcon}></Reload>
        </TouchableOpacity>
      </View>
    ),
  });

  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connected, setConnected] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const [connectDevice, setConnectDevice] = useState('');
  const [testMode, setTestMode] = useState('read');
  const [getBattery, setGetBattery] = useState('');
  const [pp, setPP] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    // start bluetooth manager
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
    });

    //startScan();

    let discoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        console.log('Got BLE peripheral', peripheral.id);

        if (peripheral.name) {
          peripherals.set(peripheral.id, peripheral);
          setBluetoothDevices(Array.from(peripherals.values()));
        }
      },
    );

    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
        handleGetConnectedDevices();
      },
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    return () => {
      discoverListener.remove();
      stopListener.remove();
    };
  }, []);

  const startScan = async () => {
    //현재 스캔 중이라면 스캔 넘어가기
    if (isScanning) {
      return;
    }
    peripherals.clear(); //기존에 있었던 디바이스 목록 삭제
    setBluetoothDevices(Array.from(peripherals.values()));

    //스캔 시작
    const durationInSeconds = 2;
    await BleManager.scan([], durationInSeconds, true)
      .then(() => {
        setIsScanning(true);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDiscoverPeripheral = peripheral => {
    console.log('Got ble peripheral', peripheral);

    if (!peripheral.name) {
      peripheral.name = 'No Name';
    }
    peripherals.set(peripheral.id, peripheral);
    setBluetoothDevices(Array.from(peripherals.values()));
  };

  const handleGetConnectedDevices = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected bluetooth devices');
      } else {
        for (let i = 0; i < results.length; i++) {
          let peripheral = results[i];
          peripheral.connected = true;
          peripherals.set(peripheral.id, peripheral);
          //setConnected(true);
          setBluetoothDevices(Array.from(peripherals.values()));
        }
      }
    });
  };

  const connectToPeripheral = async peripheral => {
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.name);
        peripherals.set(peripheral.id, peripheral);
        let peripheralResponse = peripherals.get(peripheral.id);
        console.log(peripheralResponse);
        if (peripheralResponse) {
          peripheral.connected = true;
          setConnectDevice(peripheralResponse.name);
          setConnected(true);
          setPP(peripheralResponse);
          console.log(pp.connected);
        }
        alert('Connected to ' + peripheral.name);
        retrieveServices(peripheral);

        const serviceUUID = '180f';
        const characteristicUUID = '2a19';

        BleManager.read(peripheral.id, serviceUUID, characteristicUUID).then(
          res => {
            console.log('read response ', res[0]);
            const battery = res[0];
            console.log('battery ', battery);
            setGetBattery(battery);
            console.log('getBattery ', getBattery);
          },
        );
      })
      .catch(error => console.log(error));
  };

  const disconnectPeripheral = peripheral => {
    BleManager.disconnect(peripheral.id).then(() => {
      peripheral.connected = false;
      setConnectDevice('');
      setConnected(false);
      alert(`Disconnected from ${peripheral.name}`);
    });
  };

  const retrieveServices = async peripheral => {
    try {
      const services = await BleManager.retrieveServices(peripheral.id);
      // console.log(services);
      const servicesArray = [services];
      console.log(servicesArray);
      servicesArray.forEach(service => {
        service.services.forEach(services => {
          console.log('Service UUID: ', services.uuid);
          //console.log('Characteristic uuid: ', service.characteristics.characteristic);
        });
        service.characteristics.forEach(characteristics => {
          console.log('Characteristic uuid: ', characteristics.characteristic);
        });

        service.characteristics.forEach(characteristics => {
          console.log(
            'Characteristic properties: ',
            characteristics.properties,
          );
        });
      });
    } catch (error) {}
  };

  const RenderDevices = ({peripheral, isLast}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          marginTop: 30,
          width: 350,
          height: 30,
          marginBottom: 10,
        }}>
        <Text style={styles.deviceName}>{peripheral.name}</Text>
        {!isScanning && (
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => connectToPeripheral(peripheral)}>
            <Text style={styles.connect}>연결</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {connectDevice && (
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
              <Text style={styles.connectText}>{connectDevice}</Text>
              <Text style={styles.battery}>배터리 {String(getBattery)}</Text>
            </View>
            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={() => disconnectPeripheral(pp)}>
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
        {bluetoothDevices.map((device, index) => (
          <View key={device.id}>
            <RenderDevices
              peripheral={device}
              isLast={index === bluetoothDevices.length - 1}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectDevice;
