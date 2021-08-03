import {ModelGroup, SafUser, User, UserPermission} from './api';
import {UserPermissions} from './api/permission';
import {BasicConfig} from './config';
import {
  LegacyPermissionsArgs,
  ModelTemplate,
  MonitorTemplate,
  PermissionsArgs,
  UserWithPermissions
} from './permissions';

const legacyConfig: BasicConfig = {
  services: {
    permission: {
      enabled: false
    },
    usermanagement: {
      enabled: false
    }
  }
} as BasicConfig;
const config: BasicConfig = {
  services: {
    permission: {
      enabled: true
    },
    usermanagement: {
      enabled: true
    }
  }
} as BasicConfig;
const customerId = 1;
const legacySafUser: SafUser = {
  admin: false,
  allowProtected: false,
  effectiveDate: '',
  email: '',
  fields: {},
  firstName: '',
  id: 1,
  identifier: '',
  lastName: '',
  lastUpdatedBy: '',
  readGroupPermissions: [1, 2, 3],
  readTemplatePermissions: [6, 7, 8],
  securableId: 1,
  userId: 1,
  writeGroupPermissions: [1, 2],
  writeTemplatePermissions: [6, 7]
};
const legacyUserPermissions: UserPermission = {
  customerId: 1,
  viewData: true,
  manageUsers: false
};
const legacyUser: User = {
  id: 1,
  email: '',
  firstName: '',
  lastName: '',
  admin: false,
  lockout: false,
  registered: true,
  active: true,
  permissions: [legacyUserPermissions]
};
const userPermissions: UserPermissions = {
  superAdmin: false,
  admin: false,
  modulePermissions: {
    view: {
      module1: [1, 2, 3],
      module2: [2, 3, 4, 5, 6]
    },
    viewConfidential: {},
    add: {},
    edit: {},
    delete: {}
  },
  reportPermissions: {report1: [2, 3, 4]},
  documentLibraryPermissions: {
    view: false,
    viewConfidential: false,
    edit: false,
    delete: false,
    upload: false,
    download: false
  }
};
const modelGroups: ModelGroup[] = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5}
] as ModelGroup[];
const modelTemplates: ModelTemplate[] = [
  {
    id: 6,
    alias: 'six',
    fields: {
      modules: ['module1']
    }
  },
  {
    id: 7,
    alias: 'seven',
    fields: {
      modules: ['module2']
    }
  },
  {
    id: 8,
    alias: 'eight',
    fields: {
      modules: ['module1', 'module2']
    }
  },
  {
    id: 9,
    alias: 'nine',
    fields: {
      modules: []
    }
  },
  {
    id: 10,
    alias: 'ten',
    fields: {
      modules: []
    }
  }
];
const monitorTemplates: MonitorTemplate[] = [
  {
    id: 11,
    alias: 'eleven',
    modules: ['module1']
  },
  {
    id: 12,
    alias: 'twelve',
    modules: ['module2']
  },
  {
    id: 13,
    alias: 'thirteen',
    modules: ['module1', 'module2']
  },
  {
    id: 14,
    alias: 'fourteen',
    modules: []
  },
  {
    id: 15,
    alias: 'fifteen',
    modules: []
  }
];

const legacyPermissionsArgs: LegacyPermissionsArgs = {
  config: legacyConfig,
  customerId,
  legacySafUser,
  legacyUser,
  modelGroups,
  modelTemplates,
  monitorTemplates
};
const permissionsArgs: PermissionsArgs = {
  config,
  customerId,
  userPermissions,
  modelGroups,
  modelTemplates,
  monitorTemplates,
  user: {} as any
};

describe('permissions constructor', () => {
  it('successfully constructs legacy permissions object', () => {
    expect(() => new UserWithPermissions(legacyPermissionsArgs)).not.toThrow();
  });
  it('successfully constructs new permissions object', () => {
    expect(() => new UserWithPermissions(permissionsArgs)).not.toThrow();
  });
  it('fails to construct a legacy permissions object when provided incorrect config', () => {
    expect(
      () =>
        new UserWithPermissions({
          ...legacyPermissionsArgs,
          config
        })
    ).toThrow();
  });
  it('fails to construct a new permissions object when provided incorrect config', () => {
    expect(
      () =>
        new UserWithPermissions({
          ...permissionsArgs,
          config: legacyConfig
        })
    ).toThrow();
  });
  it('fails to construct a legacy permissions object when provided incorrect legacyUser', () => {
    expect(
      () =>
        new UserWithPermissions({
          ...legacyPermissionsArgs,
          legacyUser: {...legacyUser, permissions: []}
        })
    ).toThrow();
  });
});

describe('permissions admin flags', () => {
  it('successfully sets legacy admin flag', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(false);
  });
  it('successfully sets legacy superAdmin flag', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacyUser: {...legacyUser, admin: true}
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(true);
  });
  it('successfully sets new admin flag', () => {
    const permissions = new UserWithPermissions({
      ...permissionsArgs,
      userPermissions: {
        ...userPermissions,
        admin: true
      }
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(false);
  });
  it('successfully sets new superAdmin flag', () => {
    const permissions = new UserWithPermissions({
      ...permissionsArgs,
      userPermissions: {
        ...userPermissions,
        superAdmin: true
      }
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(true);
  });
});

describe('permissions admin flags', () => {
  it('successfully sets legacy admin flag', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(false);
  });
  it('successfully sets legacy superAdmin flag', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacyUser: {...legacyUser, admin: true}
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(true);
  });
  it('successfully sets new admin flag', () => {
    const permissions = new UserWithPermissions({
      ...permissionsArgs,
      userPermissions: {
        ...userPermissions,
        admin: true
      }
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(false);
  });
  it('successfully sets new superAdmin flag', () => {
    const permissions = new UserWithPermissions({
      ...permissionsArgs,
      userPermissions: {
        ...userPermissions,
        superAdmin: true
      }
    });
    expect(permissions.admin).toBe(true);
    expect(permissions.superAdmin).toBe(true);
  });
});

describe('permissions groups by model template', () => {
  it('gets view groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(6, 'view')).toEqual(
      permissions.filterModelGroups(legacySafUser.readGroupPermissions)
    );
  });
  it('gets empty array for viewConfidential action without allowProtected (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(6, 'viewConfidential')).toEqual(
      []
    );
  });
  it('gets viewConfidential groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, allowProtected: true}
    });
    expect(permissions.getGroupsByModelTemplate(6, 'viewConfidential')).toEqual(
      permissions.filterModelGroups(legacySafUser.readGroupPermissions)
    );
  });
  it('gets edit groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(6, 'edit')).toEqual(
      permissions.filterModelGroups(legacySafUser.writeGroupPermissions)
    );
  });
  it('gets empty array for edit action for read-only template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(8, 'edit')).toEqual([]);
  });
  it('gets empty array for non-permitted template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(10, 'view')).toEqual([]);
  });
  it('gets all groups for any template when admin (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(permissions.getGroupsByModelTemplate(10, 'view')).toEqual(
      modelGroups
    );
  });
  it('gets empty array for non-existent template', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModelTemplate(11, 'view')).toEqual([]);
  });
  it('gets groups for template with single module', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByModelTemplate(6, 'view')).toEqual(
      permissions.filterModelGroups(
        userPermissions.modulePermissions.view.module1
      )
    );
  });
  it('gets groups for template with multiple modules', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByModelTemplate(8, 'view')).toEqual(
      permissions.filterModelGroups([
        ...userPermissions.modulePermissions.view.module1,
        ...userPermissions.modulePermissions.view.module2
      ])
    );
  });
});

describe('permissions groups by monitor template', () => {
  it('gets view groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByMonitorTemplate(11, 'view')).toEqual(
      permissions.filterModelGroups(legacySafUser.readGroupPermissions)
    );
  });
  it('gets empty array for viewConfidential action without allowProtected (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(
      permissions.getGroupsByMonitorTemplate(11, 'viewConfidential')
    ).toEqual([]);
  });
  it('gets viewConfidential groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, allowProtected: true}
    });
    expect(
      permissions.getGroupsByMonitorTemplate(11, 'viewConfidential')
    ).toEqual(
      permissions.filterModelGroups(legacySafUser.readGroupPermissions)
    );
  });
  it('gets edit groups for permitted template (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByMonitorTemplate(11, 'edit')).toEqual(
      permissions.filterModelGroups(legacySafUser.writeGroupPermissions)
    );
  });
  it('gets all groups for any template when admin (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(permissions.getGroupsByMonitorTemplate(15, 'view')).toEqual(
      modelGroups
    );
  });
  it('gets empty array for non-existent template', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByMonitorTemplate(16, 'view')).toEqual([]);
  });
  it('gets groups for template with single module', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByMonitorTemplate(11, 'view')).toEqual(
      permissions.filterModelGroups(
        userPermissions.modulePermissions.view.module1
      )
    );
  });
  it('gets groups for template with multiple modules', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByMonitorTemplate(13, 'view')).toEqual(
      permissions.filterModelGroups([
        ...userPermissions.modulePermissions.view.module1,
        ...userPermissions.modulePermissions.view.module2
      ])
    );
  });
});

describe('permissions groups by report', () => {
  it('gets view groups for any report (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    const groups = permissions.filterModelGroups(
      legacySafUser.readGroupPermissions
    );
    expect(permissions.getGroupsByReport('report1')).toEqual(groups);
    expect(permissions.getGroupsByReport('non-existent-report-alias')).toEqual(
      groups
    );
  });
  it('gets all groups for any report when admin', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(permissions.getGroupsByReport('report1')).toEqual(modelGroups);
  });
  it('gets groups for existent report', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByReport('report1')).toEqual(
      permissions.filterModelGroups(userPermissions.reportPermissions.report1)
    );
  });
  it('gets empty array for non-existent report', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByReport('non-existent-report-alias')).toEqual(
      []
    );
  });
});

describe('permissions document library', () => {
  it('gets viewConfidential permission with viewDocuments and allowProtected (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, allowProtected: true},
      legacyUser: {
        ...legacyUser,
        permissions: [{...legacyUserPermissions, viewDocuments: true}]
      }
    });
    expect(permissions.documentLibraryPermissions.viewConfidential).toBe(true);
  });
  it('does not get viewConfidential permission with viewDocuments but without allowProtected (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacyUser: {
        ...legacyUser,
        permissions: [{...legacyUserPermissions, viewDocuments: true}]
      }
    });
    expect(permissions.documentLibraryPermissions.viewConfidential).toBe(false);
  });
  it('does not get viewConfidential permission without viewDocuments but with allowProtected (legacy)', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, allowProtected: true}
    });
    expect(permissions.documentLibraryPermissions.viewConfidential).toBe(false);
  });
  it('gets all permissions when admin', () => {
    const permissions = new UserWithPermissions({
      ...legacyPermissionsArgs,
      legacySafUser: {...legacySafUser, admin: true}
    });
    expect(
      Object.values(permissions.documentLibraryPermissions).some(
        (permission) => !permission
      )
    ).toBe(false);
  });
  it('gets permissions passed into constructor', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.documentLibraryPermissions).toEqual(
      userPermissions.documentLibraryPermissions
    );
  });
});

describe('permissions groups by module', () => {
  it('gets all groups when getting any module (legacy)', () => {
    const permissions = new UserWithPermissions(legacyPermissionsArgs);
    expect(permissions.getGroupsByModule('module1', 'view')).toEqual(
      modelGroups
    );
    expect(
      permissions.getGroupsByModule('non-existent-module', 'view')
    ).toEqual(modelGroups);
  });
  it('gets groups for module', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.getGroupsByModule('module1', 'view')).toEqual(
      permissions.filterModelGroups(
        userPermissions.modulePermissions.view.module1
      )
    );
  });
  it('gets empty array for non-existent module', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(
      permissions.getGroupsByModule('non-existent-module', 'view')
    ).toEqual([]);
  });
  it('gets all groups when admin', () => {
    const permissions = new UserWithPermissions({
      ...permissionsArgs,
      userPermissions: {
        ...userPermissions,
        admin: true
      }
    });
    expect(permissions.getGroupsByModule('module1', 'view')).toEqual(
      modelGroups
    );
  });
});
