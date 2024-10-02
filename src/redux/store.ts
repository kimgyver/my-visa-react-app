import { createStore } from "redux";
import { appReducer } from "./appState";

const store = createStore(
  appReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__() // To enable Redux DevTools
);

export default store;
