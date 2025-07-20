export const getUserById = (id: string) => {
  return `SELECT id, role, deleted FROM users WHERE id = '${id}';`;
};
