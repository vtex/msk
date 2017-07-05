const msk = require("./index");

test("should mask numbers", function() {
  const value = "123";
  const mask = "9 9 9";

  const result = msk(value, mask);

  expect(result).toBe("1 2 3");
});

test("should mask alpha characters", function() {
  const value = "abc";
  const mask = "A A A";

  const result = msk(value, mask);

  expect(result).toBe("a b c");
});

test("should mask alphaanumeric characters", function() {
  const value = "abc123";
  const mask = "S S SS SS";

  const result = msk(value, mask);

  expect(result).toBe("a b c1 23");
});

test("should mask any characters", function() {
  const value = "-.1a";
  const mask = "* * * *";

  const result = msk(value, mask);

  expect(result).toBe("- . 1 a");
});

test("should return empty string if input is empty", function() {
  const value = "-.1a";
  const mask = "* * * *";

  const resultFirstArgument = msk("", mask);
  const resultSecondArgument = msk(value, "");

  expect(resultFirstArgument).toBe("");
  expect(resultSecondArgument).toBe("");
});

test("should remove exceeding characters", function() {
  const value = "22250-040ops";
  const mask = "99999-999";

  const result = msk.fit(value, mask);

  expect(result).toBe("22250-040");
});

describe("README examples", function() {
  it("should mask the phone example properly", function() {
    const value = "552122222222";
    const mask = "+99 (99) 9999-9999";

    const result = msk(value, mask);

    expect(result).toBe("+55 (21) 2222-2222");
  });

  it("should mask the Canadian postal code example properly", function() {
    const value = "V6G1C9";
    const mask = "A9A 9A9";

    const result = msk(value, mask);

    expect(result).toBe("V6G 1C9");
  });

  it("should mask the anything symbol example properly", function() {
    const value = "I love msk";
    const mask = "*-****-***";

    const result = msk(value, mask);

    expect(result).toBe("I-love-msk");
  });

  it("should mask removing exceeding characters example properly", function() {
    const value = "22231-0004131";
    const mask = "99999-999";

    const result = msk.fit(value, mask);

    expect(result).toBe("22231-000");
  });
});
