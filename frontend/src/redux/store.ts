import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {bleMiddleware} from './BLE/listener';
import bleReducer from './BLE/slice';

const appReducer = combineReducers({
  ble: bleReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(bleMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
