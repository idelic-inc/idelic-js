import {Alias, CreatedBy, Id, LastUpdatedBy} from '../../types';

export interface Created extends CreatedBy {
  /**
   * Full name of the user who has created this role.
   */
  createdByName?: string;
  /**
   * Unix timestamp of role creation.
   */
  createdDate: number;
}

export interface LastUpdated extends LastUpdatedBy {
  /**
   * Full name of the user who was the last to update this role.
   */
  lastUpdatedByName?: string;
  /**
   * Unix timestamp of the last time when this role was updated.
   */
  lastUpdatedDate: number;
}

export enum RoleType {
  superAdmin = 'SUPERADMIN',
  admin = 'ADMIN',
  user = 'USER'
}

export interface Role extends Created, LastUpdated {
  /**
   * The unique Role ID.
   */
  id: Id;
  /**
   * Role alias.
   */
  alias: Alias;
  /**
   * Role name.
   */
  name: string;
  /**
   * Role description.
   */
  description: string;
  /**
   * Role type.
   */
  roleType: RoleType;
  /**
   * Customer alias.
   */
  customerAlias: string;
  /**
   * true if this role can be edited, false otherwise.
   */
  editable: boolean;
  /**
   * true if this role can be deleted, false otherwise.
   */
  deletable: boolean;
  /**
   * Array of module permission ids granted to this role.
   */
  modulePermissions: Id[];
}

export type InputRole = Pick<
  Role,
  'name' | 'description' | 'modulePermissions'
>;

export interface Grant {
  /**
   * The unique Grant ID.
   */
  id: number;
  /**
   * The related User ID.
   */
  userId: number;
  /**
   * The related Role ID.
   */
  roleId: number;
  /**
   * Array of group IDs.
   */
  groupIds: number[];
  /**
   * The ID of the User which created this grant.
   */
  grantedBy: number;
  /**
   * The unix timestamp when this grant was created.
   */
  grantedDate: number;
  /**
   * The ID of the User which last updated this grant.
   */
  lastUpdatedBy: number;
  /**
   * The unix timestamp when this grant was last updated.
   */
  lastUpdatedDate: number;
  /**
   * The alias of the customer which this grant is for.
   */
  customerAlias: string;
}

export type InputGrant = Pick<Grant, 'userId' | 'roleId' | 'groupIds'>;

export type GrantDTO = Pick<
  Grant,
  'id' | 'userId' | 'roleId' | 'groupIds' | 'customerAlias'
>;

export interface UserPermissions {
  /**
   * If the user has the `superAdmin` role.
   */
  superAdmin: boolean;
  /**
   * If the user has the `admin` role.
   */
  admin: boolean;
  /**
   * If the user is not an admin, this will contain a key value map where the key is a module name
   * and the value is another map with a permission name key and a list of id as the value.
   */
  permissions: Record<string, Record<string, number[]>>;
}

export interface Module {
  /**
   * The unique Module ID.
   */
  id: Id;
  /**
   * Module alias.
   */
  alias: Alias;
  /**
   * Module name.
   */
  name: string;
  /**
   * Module description.
   */
  description: string;
}

export interface ModulePermission {
  /**
   * The unique ModulePermission ID.
   */
  id: Id;
  /**
   * ModulePermission alias.
   */
  alias: Alias;
  /**
   * ModulePermission name.
   */
  name: string;
  /**
   * The related Module ID.
   */
  moduleId: Id;
}

export interface DeleteResponse {
  /**
   * Id of the record which was successfully deleted.
   */
  id: Id;
}
