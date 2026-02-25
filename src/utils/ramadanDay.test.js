import { describe, it, expect } from "vitest";
import { getRamadanDay } from "./ramadanDay";

describe("getRamadanDay", () => {
  it("returns day 1 for the first day", () => {
    const start = new Date("2025-02-19");
    const current = new Date("2025-02-19");
    expect(getRamadanDay(start, current)).toBe(1);
  });
});