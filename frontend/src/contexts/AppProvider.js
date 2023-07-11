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
  const muscleList = [
    '어깨',
    '등',
    '가슴',
    '코어',
    '하체',
    '이두',
    '삼두',
    '엉덩이',
  ];
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setUserid] = useState('');
  const [usernickname, setUsernickname] = useState('이연재');
  const [useremail, setUseremail] = useState('leeyj1007987@g.skku.edu');
  const [userSetTime, setUserSetTime] = useState(30);
  const [userMotionTime, setUserMotionTime] = useState(60);
  const [userBirth, setUserBirth] = useState('2002.10.07');
  const [userGender, setUserGender] = useState(false);
  const [userHWeight, setUserHWeight] = useState('173/71');
  const [userWorkoutCareer, setUserWorkoutCareer] = useState('1년 이상');
  const [userBodyFat, setUserBodyFat] = useState(15);
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
      userHWeight,
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
      setUserHWeight,
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
