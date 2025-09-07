import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("watchlist", JSON.stringify(state.data.watchlist));
  } catch {
    return
  }
};


const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("watchlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};


const preloadedState = {
  data: {
    tokenData: null,
    watchlist: loadFromLocalStorage()
  }
};

const appStore = configureStore({
    reducer : {
        data : dataReducer
    },
    preloadedState
});

appStore.subscribe(() => {
  saveToLocalStorage(appStore.getState());
});


export default appStore;