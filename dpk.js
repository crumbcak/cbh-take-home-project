const crypto = require("crypto");

const hashDigest = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  // Default value if no event passed
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    // Get data from event
    candidate =
      JSON.stringify(event.partitionKey) || hashDigest(JSON.stringify(event));
  }

  // Hash candidate if it's too long
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashDigest(candidate);
  }

  return candidate;
};
