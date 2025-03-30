export const getHostById = (id: string): string => {
  return `SELECT * FROM \`hosts\` WHERE \`id\` = '${id}';`;
};
