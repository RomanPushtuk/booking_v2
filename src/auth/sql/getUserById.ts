export const getUserById = (data: { id: string }): string => {
  const { id } = data;
  return `SELECT * FROM \`users\` WHERE \`id\` = '${id}';`;
};
