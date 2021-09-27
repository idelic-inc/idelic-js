import {Id} from '../../types';

export interface User {
  /**
   * The unique User ID.
   */
  id: Id;
  /**
   * User's email.
   */
  email: string;
  /**
   * User's first name.
   */
  firstName: string;
  /**
   * User's last name.
   */
  lastName: string;
  /**
   * Flag which determines whether User is registered.
   */
  registered: boolean;
  /**
   * Flag which determines whether User is active.
   */
  active: boolean;
  /**
   * String to identify the ToS version agreed to by the user.
   */
  termsOfServiceVersion?: string;
}

export interface UserWithRoleNames {
  /**
   * `User` object.
   */
  user: User;
  /**
   * Array of `Role` names which are granted to the included `User`
   */
  roleNames: string[];
  /**
   * Array of customer aliases which user has access to.
   */
  customerAliases?: string[];
}

export type InputUser = Pick<User, 'email' | 'firstName' | 'lastName'>;
