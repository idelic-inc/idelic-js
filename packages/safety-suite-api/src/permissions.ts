/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {ModelGroup, SafUser, User, UserPermission} from './api';
import {
  DocumentLibraryPermissionActions,
  ModulePermissionActions,
  UserPermissions
} from './api/permission';
import {BasicConfig} from './config';
import {Alias, Id} from './types';

export interface ModelTemplate {
  alias: Alias;
  id: Id;
  fields: {
    modules: Alias[];
  };
}
export interface MonitorTemplate {
  alias: Alias;
  id: Id;
  modules: Alias[];
}

export interface BasePermissionsArgs {
  config: BasicConfig;
  customerId: Id;
  modelGroups: ModelGroup[];
  modelTemplates: ModelTemplate[];
  monitorTemplates: MonitorTemplate[];
}
export interface LegacyPermissionsArgs extends BasePermissionsArgs {
  legacySafUser: SafUser;
  legacyUser: User;
  userPermissions?: never;
}
export interface PermissionsArgs extends BasePermissionsArgs {
  legacySafUser?: never;
  legacyUser?: never;
  userPermissions: UserPermissions;
}

export class Permissions {
  private legacy: boolean;

  private static readActions: ModulePermissionActions[] = [
    'view',
    'viewConfidential'
  ];

  customerId: Id;

  modelGroups: ModelGroup[];

  modelTemplates: ModelTemplate[];

  monitorTemplates: MonitorTemplate[];

  legacySafUser?: SafUser;

  legacyUser?: User;

  legacyUserPermissions?: UserPermission;

  userPermissions?: UserPermissions;

  constructor({
    config,
    customerId,
    legacySafUser,
    legacyUser,
    modelGroups,
    modelTemplates,
    monitorTemplates,
    userPermissions
  }: LegacyPermissionsArgs | PermissionsArgs) {
    this.customerId = customerId;
    this.legacy =
      !config.services.permission.enabled ||
      !config.services.usermanagement.enabled;
    this.modelTemplates = modelTemplates;
    this.monitorTemplates = monitorTemplates;
    this.modelGroups = modelGroups;
    if (this.legacy) {
      if (!legacySafUser || !legacyUser) {
        throw new Error(
          'When using legacy permissions `legacySafUser` and `legacyUser` are required in args.'
        );
      }
      const legacyUserPermissions = legacyUser.permissions.find(
        (permission) => permission.customerId === customerId
      );
      if (!legacyUserPermissions) {
        throw new Error(
          `No permissions found in "legacyUser" for customer with id "${this.customerId}"`
        );
      }
      this.legacySafUser = legacySafUser;
      this.legacyUser = legacyUser;
      this.legacyUserPermissions = legacyUserPermissions;
    } else {
      if (!userPermissions) {
        throw new Error(
          'When using new permissions `userPermissions` is required in args.'
        );
      }
      this.userPermissions = userPermissions;
    }
  }

  filterModelGroups(ids: Id[]): ModelGroup[] {
    return this.modelGroups.filter(({id}) => ids.includes(id));
  }

  /**
   * If the user is a super-admin.
   */
  get superAdmin(): boolean {
    if (this.isLegacy()) {
      return this.legacyUser.admin;
    }
    return this.userPermissions!.superAdmin;
  }

  /**
   * If the user is an admin or super-admin.
   */
  get admin(): boolean {
    if (this.superAdmin) {
      return true;
    }
    if (this.isLegacy()) {
      return this.legacySafUser.admin;
    }
    return this.userPermissions!.admin;
  }

  get groupIds(): number[] {
    return this.modelGroups.map(({id}) => id);
  }

  /**
   * If this object was constructed with legacy permissions.
   */
  isLegacy(): this is {
    legacySafUser: SafUser;
    legacyUser: User;
    legacyUserPermissions: UserPermission;
    userPermissions: undefined;
  } {
    return this.legacy;
  }

  /**
   * Gets array of groups by template and action.
   * @param idOrAlias ID or alias of the model template.
   * @param action Permitted action type.
   */
  getGroupsByModelTemplate(
    idOrAlias: Alias | Id,
    action: ModulePermissionActions
  ): ModelGroup[] {
    const template = this.modelTemplates.find(
      ({alias, id}) => idOrAlias === alias || idOrAlias === id
    );
    if (!template) {
      return [];
    }
    if (this.admin) {
      return this.modelGroups;
    }
    if (this.isLegacy()) {
      if (action === 'viewConfidential' && !this.legacySafUser.allowProtected) {
        return [];
      }
      const isReadAction = Permissions.readActions.includes(action);
      const legacyGroupIds = isReadAction
        ? this.legacySafUser.readGroupPermissions
        : this.legacySafUser.writeGroupPermissions;
      const templateIds = isReadAction
        ? this.legacySafUser.readTemplatePermissions
        : this.legacySafUser.writeTemplatePermissions;
      if (templateIds.includes(template.id)) {
        return this.filterModelGroups(legacyGroupIds);
      }
    } else {
      const modulePermissions = this.userPermissions!.modulePermissions[action];
      const moduleGroupIds = template.fields.modules.reduce<number[]>(
        (ids, moduleAlias) => {
          const modulePermissionIds = modulePermissions[moduleAlias];
          return modulePermissionIds ? [...ids, ...modulePermissionIds] : ids;
        },
        []
      );
      return this.filterModelGroups(moduleGroupIds);
    }
    return [];
  }

  /**
   * Gets array of groups by template and action.
   * @param idOrAlias ID or alias of the monitor template.
   * @param action Permitted action type.
   */
  getGroupsByMonitorTemplate(
    idOrAlias: Alias | Id,
    action: ModulePermissionActions
  ): ModelGroup[] {
    const template = this.monitorTemplates.find(
      ({alias, id}) => idOrAlias === alias || idOrAlias === id
    );
    if (!template) {
      return [];
    }
    if (this.admin) {
      return this.modelGroups;
    }
    if (this.isLegacy()) {
      if (action === 'viewConfidential' && !this.legacySafUser.allowProtected) {
        return [];
      }
      const isReadAction = Permissions.readActions.includes(action);
      return this.filterModelGroups(
        isReadAction
          ? this.legacySafUser.readGroupPermissions
          : this.legacySafUser.writeGroupPermissions
      );
    }
    const modulePermissions = this.userPermissions!.modulePermissions[action];
    const moduleGroupIds = template.modules.reduce<number[]>(
      (ids, moduleAlias) => {
        const modulePermissionIds = modulePermissions[moduleAlias];
        return modulePermissionIds ? [...ids, ...modulePermissionIds] : ids;
      },
      []
    );
    return this.filterModelGroups(moduleGroupIds);
  }

  /**
   * Gets array of groups by report alias.
   * @param alias Alias of the canned report.
   */
  getGroupsByReport(alias: Alias): ModelGroup[] {
    if (this.admin) {
      return this.modelGroups;
    }
    if (this.isLegacy()) {
      return this.filterModelGroups(this.legacySafUser.readGroupPermissions);
    }
    const permissions = this.userPermissions!.reportPermissions[alias];
    return permissions ? this.filterModelGroups(permissions) : [];
  }

  /**
   * Object of permissions for document library where
   * the key is the action type and the value is
   * if the action is permitted.
   */
  get documentLibraryPermissions(): Record<
    DocumentLibraryPermissionActions,
    boolean
  > {
    if (this.admin) {
      return {
        view: true,
        viewConfidential: true,
        upload: true,
        delete: true,
        edit: true,
        download: true
      };
    }
    if (this.isLegacy()) {
      const permissions = this.legacyUserPermissions;
      const view = permissions.viewDocuments ?? false;
      return {
        view,
        viewConfidential: view && this.legacySafUser.allowProtected,
        upload: permissions.uploadDocuments ?? false,
        delete: permissions.deleteDocuments ?? false,
        edit: permissions.editDocuments ?? false,
        download: permissions.downloadDocuments ?? false
      };
    }
    return this.userPermissions!.documentLibraryPermissions;
  }

  /**
   * Gets array of groups by module alias.
   * @param alias Alias of the module.
   * @param action Permitted action type.
   */
  getGroupsByModule(
    alias: Alias,
    action: ModulePermissionActions
  ): ModelGroup[] {
    if (this.admin || this.isLegacy()) {
      return this.modelGroups;
    }
    const moduleGroupIds = this.userPermissions!.modulePermissions[action]?.[
      alias
    ];
    return moduleGroupIds ? this.filterModelGroups(moduleGroupIds) : [];
  }
}
