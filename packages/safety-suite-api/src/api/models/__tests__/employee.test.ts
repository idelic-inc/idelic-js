import {EmployeeModel, EmployeeComputations} from '..';

const employeeJson = {
  id: 1,
  templateId: 1,
  groupId: 2,
  sourceIds: {},
  fields: {
    employeeNumber: '1234',
    firstName: 'Bob',
    lastName: 'Trucker'
  },
  relations: {
    accidents: [1, 2],
    supervisor: 3
  },
  relationModels: {
    accidents: [],
    supervisor: null
  },
  computations: {
    fullName: 'Test User'
    // Let's not waste time filling out a billion fields...
  } as EmployeeComputations,
  createdBy: '',
  createdDate: '',
  lastUpdatedBy: '',
  lastUpdatedDate: ''
};

describe('Employee Model', () => {
  it('compiles', () => {
    const employee: EmployeeModel = employeeJson;

    expect(employee.id).toBe(1);
    expect(employee.fields.employeeNumber).toBe('1234');

    expect(employee.relations?.accidents).toStrictEqual([1, 2]);
    expect(employee.relations?.supervisor).toBe(3);
  });
});
