import {ModelGroup} from './api';
import {UserPermissions} from './api/permission';
import {
  ModelTemplate,
  MonitorTemplate,
  PermissionsArgs,
  UserWithPermissions
} from './permissions';

const customerId = 1;
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
      modules: ['module1'],
      indirectModules: []
    }
  },
  {
    id: 7,
    alias: 'seven',
    fields: {
      modules: ['module2'],
      indirectModules: []
    }
  },
  {
    id: 8,
    alias: 'eight',
    fields: {
      modules: ['module1', 'module2'],
      indirectModules: []
    }
  },
  {
    id: 9,
    alias: 'nine',
    fields: {
      modules: [],
      indirectModules: []
    }
  },
  {
    id: 10,
    alias: 'ten',
    fields: {
      modules: [],
      indirectModules: []
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

const permissionsArgs: PermissionsArgs = {
  customerId,
  userPermissions,
  modelGroups,
  modelTemplates,
  monitorTemplates,
  user: {} as any
};

describe('permissions constructor', () => {
  it('successfully constructs new permissions object', () => {
    expect(() => new UserWithPermissions(permissionsArgs)).not.toThrow();
  });
});

describe('permissions admin flags', () => {
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
  it('gets permissions passed into constructor', () => {
    const permissions = new UserWithPermissions(permissionsArgs);
    expect(permissions.documentLibraryPermissions).toEqual(
      userPermissions.documentLibraryPermissions
    );
  });
});

describe('permissions groups by module', () => {
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
