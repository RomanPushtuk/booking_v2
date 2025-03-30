export const saveClient = (clientModel: {
  id: string;
  deleted: boolean;
}): string => {
  const { id, deleted } = clientModel;
  return `INSERT OR REPLACE INTO \`clients\` (\`id\`, \`deleted\`) VALUES ('${id}', ${deleted});`;
};
