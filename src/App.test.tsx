import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("resets the counter and items", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const incrementButton = screen.getByText(/increment/i);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton); // Counter should be 2

    const addItemInput = screen.getByPlaceholderText(/add item/i);
    fireEvent.change(addItemInput, { target: { value: "Item 1" } });
    const addItemButton = screen.getByText(/add item/i);
    fireEvent.click(addItemButton);

    // Check counter and items
    expect(screen.getByText(/count: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();

    // Reset
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    // Check reset
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    expect(screen.queryByText(/item 1/i)).toBeNull();
  });
});
