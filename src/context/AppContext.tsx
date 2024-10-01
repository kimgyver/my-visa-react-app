import React, { createContext, useContext, useReducer, useEffect } from "react";

interface State {
  counter: number;
  items: string[];
}

interface Action {
  type: "increment" | "addItem" | "reset";
  payload?: string;
}

const initialState: State = {
  counter: 0,
  items: []
};

interface AppContextInterface {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "addItem":
      return { ...state, items: [...state.items, action.payload || ""] };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Redux DevTools integration
  useEffect(() => {
    if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
      const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: "AppContext"
      });

      devTools.init(state); // Initialize with the initial state

      // Subscribe to actions dispatched from DevTools
      devTools.subscribe(message => {
        if (message.type === "DISPATCH" && message.state) {
          // Handle actions sent from Redux DevTools here, if necessary
          // You can parse and update the local state if needed
        }
      });

      // Send state changes to DevTools
      devTools.send("STATE_UPDATE", state);

      // No need for a disconnect, as it might not exist or be necessary
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
