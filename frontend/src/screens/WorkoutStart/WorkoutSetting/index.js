import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const WorkoutSetting = ({navigation, route}) => {
  const [pressSetting, setPressSetting] = useState(false);
  const [isAssist, setIsAssist] = useState(appcontext.state.smartAssist);
  const [isSafety, setIsSaftey] = useState(appcontext.state.smartSaftey);
  const [isLock, setIsLock] = useState(false);
  const toggleSwitch = () =>
    appcontext.actions.setSmartAssist(previousState => !previousState);
  const toggleSwitch2 = () =>
    appcontext.actions.setSmartSaftey(previousState => !previousState);
  const toggleSwitch3 = () => setIsLock(previousState => !previousState);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [temprestSet, setTempRestSet] = useState('');
  const [temprestMotion, setTempRestMotion] = useState('');
  const [restSet, setRestSet] = useState(appcontext.state.userSetTime);
  const [restMotion, setRestMotion] = useState(appcontext.state.userMotionTime);
};
