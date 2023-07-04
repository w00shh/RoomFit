import React, {useState, createContext} from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const [userid, setUserid] = React.useState('');
  const [usernickname, setUsernickname] = React.useState('');
  const [useremail, setUseremail] = React.useState('');
  const [targetmotionindex, setTargetmotionindex] = React.useState(0);
  const [targetsetindex, setTargetsetindex] = React.useState(0);

  const value = {
    state: {userid, usernickname, useremail, targetmotionindex, targetsetindex},
    actions: {
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
