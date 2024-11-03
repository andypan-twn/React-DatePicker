import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "~/src/components/App";

describe("Test App component", () => {
  test("have default props and no error", () => {
    const { container, rerender } = render(<App />);
    expect(container.querySelector("input")).toBeVisible();
  });

  test("focus input element and show date picker", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    expect(container.querySelector("section")).toHaveClass("date-picker");
  });

  test("focus input element and show date picker", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(screen.getAllByText("1")[0]);
    expect(container.querySelector("section")).toBe(null);
  });

  test("input change value and show input data", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.change(container.querySelector("input"), {
      target: { value: "2000-01-01" },
    });

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
  });
});
