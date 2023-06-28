import {
  SET_IS_LOGIN,
  SET_USER_EMAIL,
  SET_USER_ID,
  SET_USER_NICKNAME,
  SET_USER_PASSWORD,
  SET_TARGET_MOTION_ID,
  SET_TARGET_SET_ID,
} from './actions';

const initialState = {
  isLogin: false,
  useremail: '',
  userpassword: '',
  usernickname: '',
  userid: '',
  targetmotionid: 1,
  targetsetid: 0,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOGIN:
      return {...state, isLogin: action.payload};
    case SET_USER_EMAIL:
      return {...state, useremail: action.payload};
    case SET_USER_PASSWORD:
      return {...state, userpassword: action.payload};
    case SET_USER_NICKNAME:
      return {...state, usernickname: action.payload};
    case SET_USER_ID:
      return {...state, userid: action.payload};
    case SET_TARGET_MOTION_ID:
      return {...state, targetmotionid: action.payload};
    case SET_TARGET_SET_ID:
      return {...state, targetsetid: action.payload};
    default:
      return state;
  }
}

export default userReducer;
