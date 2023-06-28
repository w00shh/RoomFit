export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_USER_NICKNAME = 'SET_USER_NICKNAME';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_TARGET_MOTION_ID = 'SET_TARGET_MOTION_ID';
export const SET_TARGET_SET_ID = 'SET_TARGET_SET_ID';

export const setIsLogin = islogin => dispatch => {
  dispatch({
    type: SET_IS_LOGIN,
    payload: islogin,
  });
};

export const setUserEmail = useremail => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: useremail,
  });
};

export const setUserPassword = userpassword => dispatch => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: userpassword,
  });
};

export const setUserNickname = usernickname => dispatch => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: usernickname,
  });
};

export const setUserId = userid => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: userid,
  });
};

export const setTargetMotionId = targetmotionid => dispatch => {
  dispatch({
    type: SET_TARGET_MOTION_ID,
    payload: targetmotionid,
  });
};

export const setTargetSetId = targetsetid => dispatch => {
  dispatch({
    type: SET_TARGET_SET_ID,
    payload: targetsetid,
  });
};
