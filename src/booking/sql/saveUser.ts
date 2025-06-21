export type UserDbModel = {
  id: string;
  role: string;
  deleted: boolean;
};

export const saveUser = (data: UserDbModel) => {
  const { id, role, deleted } = data;
  return `
		INSERT OR REPLACE INTO users
		(id, "role", deleted)
		VALUES('${id}', '${role}', ${Number(deleted)});
	`;
};
