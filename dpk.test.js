const { deterministicPartitionKey } = require("./dpk");

const TOO_LONG_PARTITION_KEY =
  "d0297a140a3b4d9fb5b96e813837213f7e2ba7ae67655a1f2293d538528b078ffd4929b529f2ba582d662ad3e88543aaeb14c9fd08465653f73bc5a287bf1cc3d0297a140a3b4d9fd0297a140a3b4d9fb5b96e813837213f7e2ba7ae67655a1f2293d538528b078ffd4929b529f2ba582d662ad3e88543aaeb14c9fd08465653f73bc5a287bf1cc3d0297a140a3b4d9f";
const MOCK_PARTITION_KEY =
  "67655a1f2293d538528b078ffd4929b529f2ba582d662ad3e88543aaeb14c9fd08465653f73bc5a287bf1cc3d0297a140a3b4d9f";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a string with 256 characters or less when given event without partitionKey field", () => {
    const mockEvent = {
      foo: "bar",
      baz: false,
    };
    const partitionKey = deterministicPartitionKey(mockEvent);
    expect(typeof partitionKey).toBe("string");
    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });

  it("Returns value of field when given event with valid partitionKey field", () => {
    const mockEvent = {
      partitionKey: MOCK_PARTITION_KEY,
    };
    const partitionKey = deterministicPartitionKey(mockEvent);
    expect(partitionKey).toBe(MOCK_PARTITION_KEY);
  });

  it("Returns hashed key when given event with invalid partitionKey field", () => {
    const mockEvent = {
      partitionKey: TOO_LONG_PARTITION_KEY,
    };
    const partitionKey = deterministicPartitionKey(mockEvent);
    expect(typeof partitionKey).toBe("string");
    expect(partitionKey.length).toBeLessThanOrEqual(256);
  });
});
