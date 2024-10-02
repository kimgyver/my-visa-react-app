export interface AppState {
  counter: number;
  items: string[];
}

const initialState: AppState = {
  counter: 0,
  items: []
};

// Action types
const INCREMENT = "counter/increment";
const ADD_ITEM = "items/addItem";
const RESET = "counter/reset";

export const appReducer = (
  state: AppState = initialState,
  action: { type: string; payload?: string }
) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload || ""] };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Action creators
export const increment = () => ({ type: INCREMENT });
export const addItem = (item: string) => ({ type: ADD_ITEM, payload: item });
export const reset = () => ({ type: RESET });
