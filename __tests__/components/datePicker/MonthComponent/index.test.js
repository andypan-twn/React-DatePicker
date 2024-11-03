import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MonthComponent from "~/src/components/datePicker/MonthComponent";

describe("Test MonthComponent", () => {
  test("have default props and no error", () => {
    render(<MonthComponent />);
    fireEvent.click(screen.queryByText("Jan"));
  });

  test("should have Jan - Dec", () => {
    render(<MonthComponent />);

    expect(screen.queryByText("Jan")).toBeInTheDocument();
    expect(screen.queryByText("Feb")).toBeInTheDocument();
    expect(screen.queryByText("Mar")).toBeInTheDocument();
    expect(screen.queryByText("Apr")).toBeInTheDocument();
    expect(screen.queryByText("May")).toBeInTheDocument();
    expect(screen.queryByText("Jun")).toBeInTheDocument();
    expect(screen.queryByText("Jul")).toBeInTheDocument();
    expect(screen.queryByText("Aug")).toBeInTheDocument();
    expect(screen.queryByText("Sep")).toBeInTheDocument();
    expect(screen.queryByText("Oct")).toBeInTheDocument();
    expect(screen.queryByText("Nov")).toBeInTheDocument();
    expect(screen.queryByText("Dec")).toBeInTheDocument();
  });

  test("select item should have selected class", () => {
    render(<MonthComponent select="0" />);

    expect(screen.getByText("Jan")).toHaveClass("select");
  });

  test("click item should trigger onSelect", () => {
    const mockFunc = jest.fn();
    render(<MonthComponent onSelect={mockFunc} />);

    fireEvent.click(screen.getByText("Jan"));
    expect(mockFunc).toBeCalledTimes(1);
  });
});
