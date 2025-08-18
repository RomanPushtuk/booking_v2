const truncate = (str: string, maxLength: number = 20) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
};

export { truncate };
