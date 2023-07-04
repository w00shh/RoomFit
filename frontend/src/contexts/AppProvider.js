import React, {useState, createContext} from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setUserid] = useState('');
  const [usernickname, setUsernickname] = useState('');
  const [useremail, setUseremail] = useState('');
  const [targetmotionindex, setTargetmotionindex] = useState(0);
  const [targetsetindex, setTargetsetindex] = useState(0);

  const value = {
    state: {
      isLogin,
      userid,
      usernickname,
      useremail,
      targetmotionindex,
      targetsetindex,
    },
    actions: {
      setIsLogin,
      setUserid,
      setUsernickname,
      setUseremail,
      setTargetmotionindex,
      setTargetsetindex,
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
