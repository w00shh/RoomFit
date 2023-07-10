import React, {useState, createContext} from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setUserid] = useState('');
  const [usernickname, setUsernickname] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userSetTime, setUserSetTime] = useState(30);
  const [userMotionTime, setUserMotionTime] = useState(60);
  const [targetmotionindex, setTargetmotionindex] = useState(0);
  const [targetsetindex, setTargetsetindex] = useState(0);

  const value = {
    state: {
      isLogin,
      userid,
      usernickname,
      useremail,
      userSetTime,
      userMotionTime,
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
      setTargetmotionindex,
      setTargetsetindex,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
