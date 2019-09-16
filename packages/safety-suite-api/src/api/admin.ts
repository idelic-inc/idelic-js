import {Id} from '../baseTypes';

export type Account = any;
export type PermissionType = 'read' | 'write';
export type Role = any;

export const getAccounts = {
  method: 'GET',
  url: '/api/admin/userAccount'
};

export function inviteUser(email: string) {
  return {
    method: 'POST',
    url: '/api/admin/userAccount',
    options: {
      body: {email}
    }
  };
}

export function updateAccount(account: Account) {
  return {
    method: 'PUT',
    url: '/api/admin/userAccount',
    options: {body: account}
  };
}

export const getRoles = {
  method: 'GET',
  url: '/api/admin/userRole'
};

export function createRole(name: string) {
  return {
    method: 'POST',
    url: '/api/userRole',
    options: {
      body: {
        id: -1,
        name,
        identifier: '',
        effectiveDate: 0,
        lastUpdatedBy: '',
        fields: {},
        fieldsHashCode: 0
      }
    }
  };
}

export function updateRole(role: Role) {
  return {
    method: 'PUT',
    url: '/api/userRole',
    options: {body: role}
  };
}

export function getAccountRoles(accountId: Id) {
  return {
    method: 'GET',
    url: `/api/userAccount/${accountId}/role`
  };
}

export function addAccountRole(accountId: Id, roleId: Id) {
  return {
    method: 'POST',
    url: '/api/userAccountRole',
    options: {
      body: {
        id: -1,
        userAccountId: accountId,
        roleId,
        effectiveDate: 0,
        lastUpdatedBy: '',
        admin: false
      }
    }
  };
}

export function removeAccountRole(accountRoleId: Id) {
  return {
    method: 'DELETE',
    url: `/api/userAccountRole/${accountRoleId}`
  };
}

export function getRolePermissions(roleId: Id) {
  return {
    method: 'GET',
    url: `/api/userRole/${roleId}/permission?objectType=model_group`
  };
}

export function addRolePermission(
  roleId: Id,
  securableId: Id,
  permissionType: PermissionType
) {
  return {
    method: 'POST',
    url: '/api/userRolePermission',
    options: {
      body: {
        id: -1,
        userRoleId: roleId,
        securableId,
        permissions: permissionType
      }
    }
  };
}

export function removeRolePermission(permissionId: Id) {
  return {
    method: 'DELETE',
    url: `/api/userRolePermission/${permissionId}`
  };
}
