import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, addItem, reset, AppState } from "./redux/appState";

const App1: React.FC = () => {
  const counter = useSelector((state: AppState) => state.counter);
  const items = useSelector((state: AppState) => state.items);
  const dispatch = useDispatch();

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem("itemInput") as HTMLInputElement;

    if (input.value) {
      dispatch(addItem(input.value));
      input.value = "";
    }
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4 mb-4">
        <h1 className="text-2xl">Count: {counter}</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
      </div>

      <form onSubmit={handleAddItem} className="mb-4">
        <input name="itemInput" placeholder="Add item" className="border p-2" />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 ml-2"
        >
          Add Item
        </button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index} className="text-lg">
            {item}
          </li>
        ))}
      </ul>

      <button
        className="bg-red-500 text-white px-4 py-2 mt-4"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default App1;
