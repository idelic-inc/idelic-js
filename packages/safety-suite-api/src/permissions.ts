import {ModelGroup, ModelTemplate} from './api';
import {
  DocumentLibraryPermissionActions,
  ModulePermissionActions,
  UserPermissions
} from './api/permission';
import {User} from './api/userManagement';
import {Alias, Id} from './types';
import {UserWrapper} from './user';

export interface MonitorTemplate {
  alias: Alias;
  id: Id;
  modules: Alias[];
}

export interface BasePermissionsArgs {
  customerId: Id;
  modelGroups: ModelGroup[];
  modelTemplates: ModelTemplate[];
  monitorTemplates: MonitorTemplate[];
}

export interface PermissionsArgs extends BasePermissionsArgs {
  user: User;
  userPermissions: UserPermissions;
}

export class UserWithPermissions extends UserWrapper {
  customerId: Id;

  modelGroups: ModelGroup[];

  modelTemplates: ModelTemplate[];

  monitorTemplates: MonitorTemplate[];

  userPermissions: UserPermissions;

  constructor(args: PermissionsArgs) {
    super(args.user);
    const {
      customerId,
      modelGroups,
      modelTemplates,
      monitorTemplates,
      userPermissions
    } = args;
    this.customerId = customerId;
    this.modelTemplates = modelTemplates;
    this.monitorTemplates = monitorTemplates;
    this.modelGroups = modelGroups;
    this.userPermissions = userPermissions;
  }

  filterModelGroups(ids: Id[]): ModelGroup[] {
    return this.modelGroups.filter(({id}) => ids.includes(id));
  }

  /**
   * If the user is a super-admin.
   */
  get superAdmin(): boolean {
    return this.userPermissions.superAdmin;
  }

  /**
   * If the user is an admin or super-admin.
   */
  get admin(): boolean {
    if (this.superAdmin) {
      return true;
    }
    return this.userPermissions.admin;
  }

  /**
   * If the user is an admin with an idelic email.
   */
  get idelicAdmin(): boolean {
    return this.admin && this.email.split('@')[1] === 'idelic.com';
  }

  get groupIds(): number[] {
    return this.modelGroups.map(({id}) => id);
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
    const modulePermissions = this.userPermissions.modulePermissions[action];
    const moduleGroupIds = template.fields.modules.reduce<number[]>(
      (ids, moduleAlias) => {
        const modulePermissionIds = modulePermissions[moduleAlias];
        return modulePermissionIds ? [...ids, ...modulePermissionIds] : ids;
      },
      []
    );
    return this.filterModelGroups(moduleGroupIds);
  }

  /**
   * Gets array of indirectly accessible groups by template and action.
   * @param idOrAlias ID or alias of the model template.
   * @param action Permitted action type.
   */
  getIndirectGroupsByModelTemplate(
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
    const modulePermissions = this.userPermissions.modulePermissions[action];
    const moduleGroupIds = template.fields.indirectModules.reduce<number[]>(
      (ids, moduleAlias) => {
        const modulePermissionIds = modulePermissions[moduleAlias];
        return modulePermissionIds ? [...ids, ...modulePermissionIds] : ids;
      },
      []
    );
    return this.filterModelGroups(moduleGroupIds);
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
    const modulePermissions = this.userPermissions.modulePermissions[action];
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
    const permissions = this.userPermissions.reportPermissions[alias];
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
    return this.userPermissions.documentLibraryPermissions;
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
    if (this.admin) {
      return this.modelGroups;
    }
    const moduleGroupIds = this.userPermissions.modulePermissions[action]?.[
      alias
    ];
    return moduleGroupIds ? this.filterModelGroups(moduleGroupIds) : [];
  }
}
