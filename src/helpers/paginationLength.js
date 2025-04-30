export const setPaginationLength = (count, size) => {
  return Math.ceil(Number(count) / (Number(size) || 1)) + "0";
};
