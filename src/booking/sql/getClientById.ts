export const getClientById = (id: string): string => {
  return `SELECT * from \`clients\` WHERE \`id\` = '${id}';`;
};
