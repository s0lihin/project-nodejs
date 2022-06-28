import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import sidebarReducer from './sidebar/sidebar.reducer';
import userinfoReducer from './userinfo/userinfo.reducer';
import gameReducer from './game/game.reducer';
import loaderReducer from './loader/loader.reducer';
import alertReducer from './alert/alert.reducer';

const middlewares = process.env.NODE_ENV === 'development' ? [logger] : [];

const store = configureStore({
    reducer: {
        sidebarReducer,
        userinfoReducer,
        gameReducer,
        loaderReducer,
        alertReducer
    },
    middleware: [...middlewares]
});

export default store;