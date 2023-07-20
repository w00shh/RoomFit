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

  const equipmentList = ['핸들', '바', 'Y로프'];

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
  const [smartSaftey, setSmartSaftey] = useState();
  const [smartAssist, setSmartAssist] = useState();
  const [targetmotionindex, setTargetmotionindex] = useState(0);
  const [targetsetindex, setTargetsetindex] = useState(0);
  const [targetmotionrangemin, setTargetmotionrangemin] = useState(-1);
  const [targetmotionrangemax, setTargetmotionrangemax] = useState(-1);

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
      smartSaftey,
      smartAssist,
      targetmotionindex,
      targetsetindex,
      targetmotionrangemin,
      targetmotionrangemax,
      equipmentList,
      muscleList,
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
      setTargetmotionrangemin,
      setTargetmotionrangemax,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
