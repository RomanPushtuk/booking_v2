export const getUserById = (data: { id: string }): string => {
  const { id } = data;
  return `SELECT * фы FROM \`users\` WHERE \`id\` = '${id}';`;
};
