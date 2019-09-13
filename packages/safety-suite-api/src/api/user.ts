export type User = any;

export const getUser = {
  method: 'GET',
  url: '/api/userAccount'
};

export function saveUser(user: User) {
  return {
    method: 'PUT',
    url: '/api/userAccount',
    options: {body: user}
  };
}

