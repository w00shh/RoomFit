import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';

//buttons
import CustomButton_B from '../../components/CustomButton_B';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';

//ble instructions
import {
  getPosition,
  getVoltage,
  startReport,
  stopReport,
  setWeight,
  setRange,
  calibrate,
} from '../../redux/BLE/ble_instruction';

//ble store
import BLEStore from '../../redux/BLE/mobx_store';
import {useAppDispatch} from '../../redux/store';
import {startListening} from '../../redux/BLE/slice';
import {observer} from 'mobx-react';

import {debounce} from 'lodash';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const Log = React.memo(props => {
  return (
    <View key={props.index} style={{}}>
      <Text style={{fontWeight: props.content[0] === '[' ? 400 : 700}}>
        {props.content}
      </Text>
    </View>
  );
});

const TestScreen = ({navigation}) => {
  const debounceInterval = useRef(null);
  const [isReporting, setReporting] = useState(false);
  const [isListening, setListening] = useState(false);
  const [logs, setLogs] = useState([]);

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (isReporting) {
      debounceInterval.current = debounce(() => {
        setLogs([...logs, BLEStore.rawdata]);
      }, 10);
      debounceInterval.current();
    } else {
      setLogs([...logs, BLEStore.rawdata]);
    }

    return () => {
      if (debounceInterval.current) debounceInterval.current.cancel();
    };
  }, [BLEStore.rawdata, isReporting]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isListening) {
      setListening(true);
      dispatch(startListening());
    }
  }, []);

  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (logs.length) scrollViewRef.current.scrollToEnd({animated: true});
  }, [logs]);

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
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 16 * height_ratio,

        paddingVertical: 16 * height_ratio,
        paddingHorizontal: 16 * width_ratio,
        marginBottom: 16 * height_ratio,
      }}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        {logs.map((log, index) => (
          <Log content={log} key={index}></Log>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'column',
          gap: 4 * height_ratio,
        }}>
        <View
          style={{flexDirection: 'row', gap: 4 * width_ratio, width: '100%'}}>
          <CustomButton_B
            content={'Get Position'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Get Position']);
              await getPosition();
            }}
          />
          <CustomButton_B
            content={'Get Voltage'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Get Voltage']);
              await getVoltage();
            }}
          />
          <CustomButton_B
            content={'Start Report'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Start Report']);
              setReporting(true);
              await startReport();
            }}
          />
          <CustomButton_B
            content={'Stop Report'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setReporting(false);
              await stopReport();
              setLogs([...logs, 'Stop Report']);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 4 * width_ratio,
            width: '100%',
          }}>
          <CustomButton_B
            content={'Set Weight'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Set Weight']);
              await setWeight();
            }}
          />
          <CustomButton_B
            content={'Set Range'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Set Range']);
              await setRange();
            }}
          />
          <CustomButton_B
            content={'Calibrate'}
            marginVertical={0}
            height={35 * height_ratio}
            style={{flex: 1}}
            onPress={async () => {
              setLogs([...logs, 'Calibrate']);
              await calibrate();
            }}
          />
          <View style={{flex: 1}} />
        </View>
      </View>
    </View>
  );
};

export default observer(TestScreen);
