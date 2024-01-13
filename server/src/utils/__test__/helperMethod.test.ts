import { Request, Response, NextFunction } from "express";
import { loggerString, postRequestValidator } from "../helperMethods";

describe("loggerString", () => {
  it("should return an empty string when no arguments are provided", () => {
    const result = loggerString();
    expect(result).toEqual("");
  });

  it("should concatenate string arguments with a colon separator", () => {
    const result = loggerString("one", "two", "three");
    expect(result).toEqual("one: two: three");
  });

  it("should stringify and concatenate object arguments with a colon separator", () => {
    const result = loggerString({ key1: "value1" }, { key2: "value2" });
    expect(result).toEqual('{"key1":"value1"}: {"key2":"value2"}');
  });

  it("should handle a mix of string and object arguments", () => {
    const result = loggerString("one", { key: "value" }, "three");
    expect(result).toEqual('one: {"key":"value"}: three');
  });

  it("should handle various types of arguments", () => {
    const result = loggerString("string", 123, true, null);
    expect(result).toEqual("string: 123: true: null");
  });
});
