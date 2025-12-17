import { formatCurrency } from "../amazon-project/scripts/utils/money.js";

describe("Test Suite: formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
});
