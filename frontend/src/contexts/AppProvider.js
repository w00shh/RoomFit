import React, {useState, createContext} from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const modeList = [
    {
      modeName: '기본',
      modeDescription: '설명',
    },
    {
      modeName: '고무밴드',
      modeDescription: '설명',
    },
    {
      modeName: '모드1',
      modeDescription: '설명',
    },
    {
      modeName: '모드2',
      modeDescription: '설명',
    },
    {
      modeName: '모드3',
      modeDescription: '설명',
    },
  ];
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setUserid] = useState('');
  const [usernickname, setUsernickname] = useState();
  const [useremail, setUseremail] = useState();
  const [userSetTime, setUserSetTime] = useState(30);
  const [userMotionTime, setUserMotionTime] = useState(60);
  const [userBirth, setUserBirth] = useState('');
  const [userGender, setUserGender] = useState();
  const [userHeight, setUserHeight] = useState();
  const [userWeight, setUserWeight] = useState();
  const [userWorkoutCareer, setUserWorkoutCareer] = useState('');
  const [userBodyFat, setUserBodyFat] = useState();
  const [powerSaving, setPowerSaving] = useState(7);
  const [smartSafety, setSmartSaftey] = useState(true);
  const [smartAssist, setSmartAssist] = useState(true);
  const [targetmotionindex, setTargetmotionindex] = useState(0);
  const [targetsetindex, setTargetsetindex] = useState(0);

  const value = {
    state: {
      modeList,
      isLogin,
      userid,
      usernickname,
      useremail,
      userSetTime,
      userMotionTime,
      userBirth,
      userGender,
      userHeight,
      userWeight,
      userWorkoutCareer,
      userBodyFat,
      powerSaving,
      smartSafety,
      smartAssist,
      targetmotionindex,
      targetsetindex,
    },
    actions: {
      setIsLogin,
      setUserid,
      setUsernickname,
      setUseremail,
      setUserSetTime,
      setUserMotionTime,
      setUserBirth,
      setUserGender,
      setUserHeight,
      setUserWeight,
      setUserWorkoutCareer,
      setUserBodyFat,
      setPowerSaving,
      setSmartSaftey,
      setSmartAssist,
      setTargetmotionindex,
      setTargetsetindex,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
