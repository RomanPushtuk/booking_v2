interface ClientDbModel {
  id: string;
  deleted: boolean;
}

export const saveClient = (clientModel: ClientDbModel): string => {
  const { id, deleted } = clientModel;
  return `INSERT OR REPLACE INTO \`clients\` (\`id\`, \`deleted\`) VALUES ('${id}', ${deleted});`;
};
