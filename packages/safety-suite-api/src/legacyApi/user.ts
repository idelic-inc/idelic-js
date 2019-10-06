export type UserAccount = any;

export function save(user: UserAccount) {
  return {
    method: 'PUT',
    route: '/api/userAccount',
    options: {body: user}
  };
}
