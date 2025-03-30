export const saveUser = (userModel: {
  id: string;
  login: string;
  password: string;
  role: string;
  deleted: boolean;
}): string => {
  const { id, login, password, role, deleted } = userModel;
  return `INSERT OR REPLACE INTO users (
    id, login, password, role, deleted
  ) values ('${id}', '${login}', '${password}', '${role}', ${Number(deleted)});`;
};
