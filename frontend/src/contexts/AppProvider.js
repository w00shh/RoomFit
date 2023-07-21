import React, {useState, createContext, useContext} from 'react';

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
  const bodyRegionList = [
    '어깨',
    '등',
    '가슴',
    '코어',
    '하체',
    '이두',
    '삼두',
    '엉덩이',
  ];

  const gripList = ['핸들', '바', 'Y로프'];

  const [motionList, setMotionList] = useState();
  const [routineList, setRoutineList] = useState();
  const [workoutList, setWorkoutList] = useState();
  const [selectedMotionList, setSelectedMotionList] = useState('');
  const [selectedGripList, setSelectedGripList] = useState([]);
  const [selectedBodyRegionList, setSelectedBodyRegionList] = useState([]);

  // 유저 관련 정보
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

  // 가동범위/하중모드 인데스 관련
  const [targetmotionindex, setTargetmotionindex] = useState(0);
  const [targetsetindex, setTargetsetindex] = useState(0);
  const [targetmotionrangemin, setTargetmotionrangemin] = useState(-1);
  const [targetmotionrangemax, setTargetmotionrangemax] = useState(-1);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const value = {
    state: {
      motionList,
      routineList,
      workoutList,
      selectedMotionList,
      selectedGripList,
      selectedBodyRegionList,
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
      gripList,
      bodyRegionList,
      left,
      right,
    },
    actions: {
      setMotionList,
      setWorkoutList,
      setRoutineList,
      setSelectedMotionList,
      setSelectedGripList,
      setSelectedBodyRegionList,
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
      setLeft,
      setRight,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
