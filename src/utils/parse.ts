export function parseNetWorth(value: string) {
  const match = value.match(/^\$?([\d.]+)([TBMk]?)$/i);
  console.log(match);
  if (!match) {
    throw new Error(`Invalid value format: ${value}`);
  }

  const [_, num, suffix] = match;
  let multiplier = 1;

  switch (suffix.toUpperCase()) {
    case "T":
      multiplier = 1_000_000_000_000;
      break;
    case "B":
      multiplier = 1_000_000_000;
      break;
    case "M":
      multiplier = 1_000_000;
      break;
    case "K":
      multiplier = 1_000;
      break;
    default:
      multiplier = 1;
  }

  const numericValue = parseFloat(num) * multiplier;

  return {
    number: numericValue,
    formatted: numericValue.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    }),
    currency: numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
  };
}
