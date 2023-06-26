import {
  SET_USER_EMAIL,
  SET_USER_ID,
  SET_USER_NICKNAME,
  SET_USER_PASSWORD,
} from './actions';

const initialState = {
  email: '',
  password: '',
  nickname: '',
  id: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    case SET_USER_PASSWORD:
      return {...state, password: action.payload};
    case SET_USER_NICKNAME:
      return {...state, nickname: action.palyload};
    case SET_USER_ID:
      return {...state, id: action.palyload};
    default:
      return state;
  }
}

export default userReducer;
