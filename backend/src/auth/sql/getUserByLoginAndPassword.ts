export const getUserByLoginAndPassword = (data: {
  login: string;
  password: string;
}): string => {
  const { login, password } = data;
  return `select * from \`users\` where \`login\` = '${login}' and \`password\` = '${password}';`;
};
