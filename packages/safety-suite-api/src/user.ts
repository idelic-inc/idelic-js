import {User} from './api/userManagement';
import {Id} from './types';

export class UserWrapper {
  constructor(public user: User) {}

  /**
   * If this object was constructed with legacy user management.
   */
  isLegacy(): boolean {
    return false;
  }

  /**
   * The unique User ID.
   */
  get id(): Id {
    return this.user.id;
  }

  /**
   * User's email.
   */
  get email(): string {
    return this.user.email;
  }

  /**
   * User's first name.
   */
  get firstName(): string {
    return this.user.firstName;
  }

  /**
   * User's last name.
   */
  get lastName(): string {
    return this.user.lastName;
  }

  /**
   * User's full name.
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Flag which determines whether User is registered.
   */
  get registered(): boolean {
    return this.user.registered;
  }

  /**
   * Flag which determines whether User is active.
   */
  get active(): boolean {
    return this.user.active;
  }

  /**
   * String to identify the ToS version agreed to by the user.
   */
  get termsOfServiceVersion(): string | undefined {
    return this.user.termsOfServiceVersion;
  }
}
