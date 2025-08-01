export const getAllClients = () => {
  return `select clients.*, users.role, users.deleted from \`clients\` join \`users\` on clients.id = users.id;`;
};
