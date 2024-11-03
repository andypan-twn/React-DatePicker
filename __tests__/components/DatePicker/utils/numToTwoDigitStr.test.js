import numToTwoDigitStr from "~/src/components/DatePicker/utils/numToTwoDigitStr";

describe("Test numToTwoDigitStr utils", () => {
  test("0 return '00'", () => {
    expect(numToTwoDigitStr(0)).toBe("00");
  });
  test("10 return '10'", () => {
    expect(numToTwoDigitStr(10)).toBe("10");
  });
});
