import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eventsApi } from "./eventsApi";
import agendaReducer from "./agendaReducer";
import eventsReducer from "./eventsReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  events: eventsReducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [eventsApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(eventsApi.middleware),
});

let persistor = persistStore(store);

setupListeners(store.dispatch);
