import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HeaderComponent from "~/src/components/DatePicker/HeaderComponent";

describe("Test HeaderComponent Component", () => {
  test("Props of displayState is 0 should display {month} {year} string", () => {
    render(
      <HeaderComponent
        displayState={0}
        start="2000"
        end="2009"
        year="2000"
        month="0"
      />
    );

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
  });

  test("Props of displayState is 1 should display {year} string", () => {
    render(
      <HeaderComponent
        displayState={1}
        start="2000"
        end="2009"
        year="2000"
        month="1"
      />
    );

    expect(screen.queryByText("2000")).toBeInTheDocument();
  });

  test("Props of displayState is 2 should display {start} - {end} string", () => {
    render(
      <HeaderComponent
        displayState={2}
        start="2000"
        end="2009"
        year="2000"
        month="1"
      />
    );

    expect(screen.queryByText("2000 - 2009")).toBeInTheDocument();
  });
});
