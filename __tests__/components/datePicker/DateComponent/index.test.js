import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateComponent from "~/src/components/datePicker/DateComponent";

describe("Test DateComponent", () => {
  test("have default props and no error", () => {
    render(<DateComponent year="2000" month="0" />);
    fireEvent.click(screen.queryAllByText("1")[0]);
  });

  test("Jan should have 1 - 31", () => {
    render(<DateComponent year="2000" month="0" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("february should have 1 - 28", () => {
    render(<DateComponent year="2000" month="1" />);

    for (let i = 1; i <= 28; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("leap february should have 1 - 29", () => {
    render(<DateComponent year="2004" month="1" />);

    expect(screen.getByText("29")).not.toHaveClass("disable");
  });

  test("Mar should have 1 - 31", () => {
    render(<DateComponent year="2000" month="2" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Apr should have 1 - 30", () => {
    render(<DateComponent year="2000" month="3" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("May should have 1 - 31", () => {
    render(<DateComponent year="2000" month="4" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Jun should have 1 - 30", () => {
    render(<DateComponent year="2000" month="5" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Jul should have 1 - 31", () => {
    render(<DateComponent year="2000" month="6" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Aug should have 1 - 31", () => {
    render(<DateComponent year="2000" month="7" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Sep should have 1 - 30", () => {
    render(<DateComponent year="2000" month="8" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Oct should have 1 - 31", () => {
    render(<DateComponent year="2000" month="9" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Nov should have 1 - 30", () => {
    render(<DateComponent year="2000" month="10" />);

    for (let i = 1; i <= 30; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("Dec should have 1 - 31", () => {
    render(<DateComponent year="2000" month="11" />);

    for (let i = 1; i <= 31; i++) {
      expect(screen.queryAllByText(i.toString())[0]).toBeInTheDocument();
    }
  });

  test("select item should have selected class", () => {
    render(<DateComponent year="2000" month="0" select="2000-01-01" />);

    expect(screen.queryAllByText("1")[0]).toHaveClass("select");
  });

  test("today should have today class", () => {
    const d = new Date();
    const { container, rerender } = render(
      <DateComponent
        year={d.getFullYear().toString()}
        month={d.getMonth().toString()}
      />
    );

    expect(container.querySelector("ul.day li.today")).toHaveClass("today");
  });

  test("click item should trigger onSelect", () => {
    const mockFunc = jest.fn();
    render(<DateComponent year="2000" month="0" onSelect={mockFunc} />);

    fireEvent.click(screen.queryAllByText("1")[0]);
    expect(mockFunc).toBeCalledTimes(1);
  });
});
