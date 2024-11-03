import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import YearComponent from "~/src/components/DatePicker/YearComponent";

describe("Test YearComponent Component", () => {
  test("Component Renders with Default Props and No Errors", () => {
    render(<YearComponent start="2000" end="2009" />);
    fireEvent.click(screen.queryByText("2000"));
  });

  test("Props of start 2000, end 2009 should have 1999 - 2010 elements", () => {
    render(<YearComponent start="2000" end="2009" />);

    expect(screen.queryByText("1998")).not.toBeInTheDocument();
    for (let i = 1999; i <= 2010; i++) {
      expect(screen.queryByText(i.toString())).toBeInTheDocument();
    }
    expect(screen.queryByText("2011")).not.toBeInTheDocument();
  });

  test("Click active li element should trigger onSelect props including year info", () => {
    let selectedYear = "";
    const selectFunc = (year) => {
      selectedYear = year;
    };
    render(<YearComponent start="2000" end="2009" onSelect={selectFunc} />);
    fireEvent.click(screen.queryByText("2000"));
    expect(selectedYear).toBe(2000);
    fireEvent.click(screen.queryByText("2001"));
    expect(selectedYear).toBe(2001);
    fireEvent.click(screen.queryByText("2002"));
    expect(selectedYear).toBe(2002);
    fireEvent.click(screen.queryByText("2003"));
    expect(selectedYear).toBe(2003);
    fireEvent.click(screen.queryByText("2004"));
    expect(selectedYear).toBe(2004);
    fireEvent.click(screen.queryByText("2005"));
    expect(selectedYear).toBe(2005);
    fireEvent.click(screen.queryByText("2006"));
    expect(selectedYear).toBe(2006);
    fireEvent.click(screen.queryByText("2007"));
    expect(selectedYear).toBe(2007);
    fireEvent.click(screen.queryByText("2008"));
    expect(selectedYear).toBe(2008);
    fireEvent.click(screen.queryByText("2009"));
    expect(selectedYear).toBe(2009);
  });

  test("Click disabled li element should not trigger onSelect props", () => {
    const mockFunc = jest.fn();
    render(<YearComponent start="2000" end="2009" onSelect={mockFunc} />);

    expect(mockFunc).toBeCalledTimes(0);
    fireEvent.click(screen.queryByText("1999"));
    expect(mockFunc).toBeCalledTimes(0);
    fireEvent.click(screen.queryByText("2010"));
    expect(mockFunc).toBeCalledTimes(0);
  });

  test("Select of li element should have 'select' class name", () => {
    render(<YearComponent start="2000" end="2009" select="2001" />);

    expect(screen.getByText("2001")).toHaveClass("select");
  });

  test("Overflow li element should have 'disable' class name", () => {
    render(<YearComponent start="2000" end="2009" />);

    expect(screen.getByText("1999")).toHaveClass("disable");
    expect(screen.getByText("2010")).toHaveClass("disable");
  });
});
