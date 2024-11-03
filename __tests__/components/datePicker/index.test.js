import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DatePicker from "~/src/components/datePicker";

describe("Test DatePicker component", () => {
  test("have default props and no error", () => {
    const { container, rerender } = render(<DatePicker />);
    expect(container.querySelector("section")).toHaveClass("date-picker");
  });

  test("set selectDate have select class name", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
    expect(screen.queryAllByText("1")[0]).toHaveClass("select");
  });

  test("click element and return date string", () => {
    let selectDate = "";
    const handleSelect = (date) => {
      selectDate = date;
    };
    render(<DatePicker selectDate="2000-01-01" onSelect={handleSelect} />);

    fireEvent.click(screen.queryAllByText("2")[0]);
    expect(selectDate).toBe("2000-01-02");
  });

  test("click previous element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("Dec 1999")).toBeInTheDocument();
  });

  test("click next element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("Feb 2000")).toBeInTheDocument();
  });

  test("click next element", () => {
    render(<DatePicker selectDate="2000-12-01" />);

    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("Jan 2001")).toBeInTheDocument();
  });

  test("click year element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    expect(screen.queryByText("2000")).toBeInTheDocument();

    fireEvent.click(screen.getByText("2000"));
    expect(screen.queryByText("2000 - 2009")).toBeInTheDocument();
  });

  test("change month of select", () => {
    let selectDate = "";
    const handleSelect = (date) => {
      selectDate = date;
    };
    render(<DatePicker selectDate="2000-01-01" onSelect={handleSelect} />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("Nov"));
    fireEvent.click(screen.getAllByText("1")[0]);
    expect(selectDate).toBe("2000-11-01");
  });

  test("change year of select", () => {
    let selectDate = "";
    const handleSelect = (date) => {
      selectDate = date;
    };
    render(<DatePicker selectDate="2000-01-01" onSelect={handleSelect} />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("2000"));
    fireEvent.click(screen.getByText("2005"));
    fireEvent.click(screen.getByText("Jan"));
    fireEvent.click(screen.getAllByText("1")[0]);
    expect(selectDate).toBe("2005-01-01");
  });

  test("click previous element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1999")).toBeInTheDocument();
  });

  test("click next element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("2001")).toBeInTheDocument();
  });

  test("click previous element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("2000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1990 - 1999")).toBeInTheDocument();
  });

  test("click next element", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("2000"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("2010 - 2019")).toBeInTheDocument();
  });

  test("click previous element", () => {
    render(<DatePicker selectDate="1000-01-01" />);

    fireEvent.click(screen.getByText("Jan 1000"));
    fireEvent.click(screen.getByText("1000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1000 - 1009")).toBeInTheDocument();
  });
});
