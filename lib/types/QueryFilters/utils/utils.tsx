/**
 *
 * @returns Midnight UTC of the current local Date.
 */
export const createISOTimestamp = () => {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString();
};

export const bigIntReplacer = (key: any, value: any) =>
  typeof value === "bigint" ? value.toString() : value;
