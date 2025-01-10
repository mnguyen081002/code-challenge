type RoleRights = string[];

interface RoleDefinition {
  [key: string]: RoleRights;
}

const allRoles: RoleDefinition = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map<string, RoleRights>(Object.entries(allRoles));

export { roles, roleRights, RoleRights, RoleDefinition }; 