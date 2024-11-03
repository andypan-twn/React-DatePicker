import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateComponent from "~/src/components/DatePicker/DateComponent";

describe("Test DateComponent Component", () => {
  test("Component Renders with Default Props and No Errors", () => {
    render(<DateComponent year="2000" month="0" />);
    fireEvent.click(screen.queryAllByText("1")[0]);
  });

  test("January should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="0" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("February should have elements from 1 to 28", () => {
    render(<DateComponent year="2000" month="1" />);

    for (let i = 1; i <= 28; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Leap February should have elements from 1 to 29", () => {
    render(<DateComponent year="2004" month="1" />);

    for (let i = 1; i <= 29; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("March should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="2" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("April should have elements from 1 to 30", () => {
    render(<DateComponent year="2000" month="3" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("May should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="4" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("June should have elements from 1 to 30", () => {
    render(<DateComponent year="2000" month="5" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("July should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="6" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("August should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="7" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("September should have elements from 1 to 30", () => {
    render(<DateComponent year="2000" month="8" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("October should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="9" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("November should have elements from 1 to 30", () => {
    render(<DateComponent year="2000" month="10" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("December should have elements from 1 to 31", () => {
    render(<DateComponent year="2000" month="11" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Select day element should have 'selected' class name", () => {
    render(<DateComponent year="2000" month="0" select="2000-01-01" />);

    expect(screen.queryAllByText("1")[0]).toHaveClass("select");
  });

  test("If day element is the current day should have 'today' class name", () => {
    const d = new Date();
    const { container, rerender } = render(
      <DateComponent
        year={d.getFullYear().toString()}
        month={d.getMonth().toString()}
      />
    );

    expect(container.querySelector("ul.day li.today")).toHaveTextContent(
      d.getDate()
    );
  });

  test("Click element should trigger onSelect prop", () => {
    const mockFunc = jest.fn();
    render(<DateComponent year="2000" month="0" onSelect={mockFunc} />);

    fireEvent.click(screen.queryAllByText("1")[0]);
    expect(mockFunc).toBeCalledTimes(1);
  });
});
