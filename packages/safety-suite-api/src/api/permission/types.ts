import {Alias, CreatedBy, Id, LastUpdatedBy} from '../../types';

export interface Created extends CreatedBy {
  /**
   * Full name of the user who has created this role.
   */
  createdByName?: string;
  /**
   * ISO timestamp of role creation.
   */
  createdDate: string;
}

export interface LastUpdated extends LastUpdatedBy {
  /**
   * Full name of the user who was the last to update this role.
   */
  lastUpdatedByName?: string;
  /**
   * ISO timestamp of the last time when this role was updated.
   */
  lastUpdatedDate: string;
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
  /**
   * The count of users assigned to this role.
   */
  usersCount?: number;
  /**
   * Sort order for roles
   */
  sortOrder?: number;
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

export type ModulePermissionActions =
  | 'view'
  | 'viewConfidential'
  | 'add'
  | 'edit'
  | 'delete';
export type DocumentLibraryPermissionActions =
  | Exclude<ModulePermissionActions, 'add'>
  | 'upload'
  | 'download';

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
   * Record of module permissions where the key is
   * the action and the value is a record where the key is
   * the module alias and the value is an array of group ids.
   */
  modulePermissions: Record<ModulePermissionActions, Record<Alias, Id[]>>;
  /**
   * Record of canned report permissions where the key is
   * the report alias and the value is an array of group ids.
   */
  reportPermissions: Record<Alias, Id[]>;
  /**
   * Record of document library permissions where the key is
   * the action and the value is a boolean.
   */
  documentLibraryPermissions: Record<DocumentLibraryPermissionActions, boolean>;
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
  /**
   * The unique Module Parent ID.
   */
  parentId?: Id;
  /**
   * Information message for tooltip
   */
  infoMessage?: string;
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
