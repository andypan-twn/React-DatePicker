import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HeaderComponent from "~/src/components/datePicker/HeaderComponent";

describe("Test HeaderComponent", () => {
  test("displayState is 1 should have {year}", () => {
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

  test("displayState is 2 should have {start} - {end}", () => {
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

  test("displayState is 3 should have {month} {year}", () => {
    render(
      <HeaderComponent
        displayState={3}
        start="2000"
        end="2009"
        year="2000"
        month="0"
      />
    );

    expect(screen.queryByText("Jan 2000")).toBeInTheDocument();
  });
});
