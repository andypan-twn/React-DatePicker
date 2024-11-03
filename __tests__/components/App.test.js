import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "~/src/components/App";

describe("Test App Component", () => {
  test("Component Renders with Default Props and No Errors", () => {
    const { container, rerender } = render(<App />);
    expect(container.querySelector("input")).toBeVisible();
  });

  test("Display Date Picker on Input Focus", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    expect(container.querySelector("section")).toHaveClass("date-picker");
  });

  test("Date Picker Hides After Date Selection", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(screen.getAllByText("1")[0]);
    expect(container.querySelector("section")).toBe(null);
  });

  test("Display Correct Information on Date Picker After Inputting Date String", () => {
    const { container, rerender } = render(<App />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.change(container.querySelector("input"), {
      target: { value: "2000-01-01" },
    });

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
  });
});
