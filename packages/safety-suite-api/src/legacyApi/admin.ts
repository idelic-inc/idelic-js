import {Id} from '../types';
import {LegacyApi} from './types';

export type Account = any;
export type PermissionType = 'read' | 'write';
export type Role = any;

export const getAccounts: LegacyApi = {
  method: 'GET',
  route: '/api/admin/userAccount'
};

export function inviteUser(email: string): LegacyApi {
  return {
    method: 'POST',
    route: '/api/admin/userAccount',
    requestOptions: {
      body: {email}
    }
  };
}

export function updateAccount(account: Account): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/admin/userAccount',
    requestOptions: {body: account}
  };
}

export const getRoles: LegacyApi = {
  method: 'GET',
  route: '/api/admin/userRole'
};

export function createRole(name: string): LegacyApi {
  return {
    method: 'POST',
    route: '/api/userRole',
    requestOptions: {
      body: {
        id: -1,
        name,
        identifier: '',
        effectiveDate: 0,
        lastUpdatedBy: -1,
        fields: {},
        fieldsHashCode: 0
      }
    }
  };
}

export function updateRole(role: Role): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/userRole',
    requestOptions: {body: role}
  };
}

export function getAccountRoles(accountId: Id): LegacyApi {
  return {
    method: 'GET',
    route: `/api/userAccount/${accountId}/role`
  };
}

export function addAccountRole(accountId: Id, roleId: Id): LegacyApi {
  return {
    method: 'POST',
    route: '/api/userAccountRole',
    requestOptions: {
      body: {
        id: -1,
        userAccountId: accountId,
        roleId,
        effectiveDate: 0,
        lastUpdatedBy: -1,
        admin: false
      }
    }
  };
}

export function removeAccountRole(accountRoleId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/userAccountRole/${accountRoleId}`
  };
}

export function getRolePermissions(roleId: Id): LegacyApi {
  return {
    method: 'GET',
    route: `/api/userRole/${roleId}/permission?objectType=model_group`
  };
}

export function addRolePermission(
  roleId: Id,
  securableId: Id,
  permissionType: PermissionType
): LegacyApi {
  return {
    method: 'POST',
    route: '/api/userRolePermission',
    requestOptions: {
      body: {
        id: -1,
        userRoleId: roleId,
        securableId,
        permissions: permissionType
      }
    }
  };
}

export function removeRolePermission(permissionId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/userRolePermission/${permissionId}`
  };
}
