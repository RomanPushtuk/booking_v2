export type ClientDbModel = {
  id: string;
}

export const saveClient = (clientModel: ClientDbModel): string => {
  const { id } = clientModel;
  return `INSERT OR REPLACE INTO \`clients\` (\`id\`) VALUES ('${id}');`;
};
