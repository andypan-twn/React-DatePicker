import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DatePicker from "~/src/components/DatePicker";

describe("Test DatePicker Component", () => {
  test("Component Renders with Default Props and No Errors", () => {
    const { container, rerender } = render(<DatePicker />);
    expect(container.querySelector("section")).toHaveClass("date-picker");
  });

  test("Set selectDate Prop and Check Selected Element Class Name", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
    expect(screen.queryAllByText("1")[0]).toHaveClass("select");
  });

  test("Click Element and Return Date String", () => {
    let selectDate = "";
    const handleSelect = (date) => {
      selectDate = date;
    };
    render(<DatePicker selectDate="2000-01-01" onSelect={handleSelect} />);

    fireEvent.click(screen.queryAllByText("2")[0]);
    expect(selectDate).toBe("2000-01-02");
  });

  test("Click '<' Element and Return Previous Month", () => {
    render(<DatePicker selectDate="2000-02-01" />);

    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
  });

  test("Click '>' Element and Return Next Month", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("Feb 2000")).toBeInTheDocument();
  });

  test("Click '<' Element and Return Previous Year of December when Month is January", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("Dec 1999")).toBeInTheDocument();
  });

  test("Click '>' Element and Return Next Year of January when Month is December", () => {
    render(<DatePicker selectDate="2000-12-01" />);

    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("Jan 2001")).toBeInTheDocument();
  });

  test("Click Header Element and Display Previous Level", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    expect(screen.queryByText("2000")).toBeInTheDocument();

    fireEvent.click(screen.getByText("2000"));
    expect(screen.queryByText("2000 - 2009")).toBeInTheDocument();
  });

  test("Change Month of Select", () => {
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

  test("Change Year of Select", () => {
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

  test("Click '<' Element When Month Level and Display Previous Year", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1999")).toBeInTheDocument();
  });

  test("Click '>' Element When Month Level and Display Next Year", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("2001")).toBeInTheDocument();
  });

  test("Click '<' Element When Year Level and Display Previous 10 Year", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("2000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1990 - 1999")).toBeInTheDocument();
  });

  test("Click '>' Element When Year Level and Display Next 10 Years", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    fireEvent.click(screen.getByText("Jan 2000"));
    fireEvent.click(screen.getByText("2000"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("2010 - 2019")).toBeInTheDocument();
  });

  test("Click '<' Element When Year Level is 1000 - 1009 and Don't Do Anything", () => {
    render(<DatePicker selectDate="1000-01-01" />);

    fireEvent.click(screen.getByText("Jan 1000"));
    fireEvent.click(screen.getByText("1000"));
    fireEvent.click(screen.getByText("<"));
    expect(screen.queryByText("1000 - 1009")).toBeInTheDocument();
  });

  test("Click '>' Element When Year Level is 9990 - 9999 and Don't Do Anything", () => {
    render(<DatePicker selectDate="9999-01-01" />);

    fireEvent.click(screen.getByText("Jan 9999"));
    fireEvent.click(screen.getByText("9999"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("9990 - 9999")).toBeInTheDocument();
  });

  test("Selected element should remain selected at all times", () => {
    render(<DatePicker selectDate="2000-01-01" />);

    // Go to Month Level
    fireEvent.click(screen.getByText("Jan 2000"));
    expect(screen.queryByText("Jan")).toHaveClass("select");

    // Previous and next btn on Month Level
    fireEvent.click(screen.getByText("<"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("Jan")).toHaveClass("select");

    // Go to Year Level
    fireEvent.click(screen.getByText("2000"));
    expect(screen.queryByText("2000")).toHaveClass("select");

    // Previous and next btn on Year Level
    fireEvent.click(screen.getByText("<"));
    fireEvent.click(screen.getByText(">"));
    expect(screen.queryByText("2000")).toHaveClass("select");

    // Go to Month Level
    fireEvent.click(screen.getByText("2000"));
    expect(screen.queryByText("Jan")).toHaveClass("select");

    // Go to Date Level
    fireEvent.click(screen.getByText("Jan"));
    expect(screen.queryAllByText("1")[0]).toHaveClass("select");
  });
});
