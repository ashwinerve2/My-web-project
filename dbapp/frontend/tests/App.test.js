import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders add user button", () => {
  render(<App />);
  const button = screen.getByText(/Add User/i);
  expect(button).toBeInTheDocument();
});

test("allows typing into name input", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Name");
  fireEvent.change(input, { target: { value: "John Doe" } });
  expect(input.value).toBe("John Doe");
});
