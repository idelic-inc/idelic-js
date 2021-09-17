/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {SafUser, User as LegacyUser} from './api';
import {User} from './api/userManagement';
import {BasicConfig} from './config';
import {Id} from './types';

export interface BaseUserArgs {
  config: BasicConfig;
}
export interface LegacyUserArgs extends BaseUserArgs {
  legacySafUser: SafUser;
  legacyUser: LegacyUser;
  user?: never;
}
export interface UserArgs extends BaseUserArgs {
  legacySafUser?: never;
  legacyUser?: never;
  user: User;
}

export class UserWrapper {
  protected legacy: boolean;

  legacySafUser?: SafUser;

  legacyUser?: LegacyUser;

  user?: User;

  constructor({
    config,
    legacySafUser,
    legacyUser,
    user
  }: LegacyUserArgs | UserArgs) {
    this.legacy =
      !config.services.permission.enabled ||
      !config.services.usermanagement.enabled;
    if (this.legacy) {
      if (!legacySafUser || !legacyUser) {
        throw new Error(
          'When using legacy user management `legacySafUser` and `legacyUser` are required in args.'
        );
      }
      this.legacySafUser = legacySafUser;
      this.legacyUser = legacyUser;
    } else {
      if (!user) {
        throw new Error(
          'When using new user management `user` is required in args.'
        );
      }
      this.user = user;
    }
  }

  /**
   * If this object was constructed with legacy user management.
   */
  isLegacy(): this is {
    legacySafUser: SafUser;
    legacyUser: LegacyUser;
    user: undefined;
  } {
    return this.legacy;
  }

  /**
   * The unique User ID.
   */
  get id(): Id {
    return this.isLegacy() ? this.legacyUser.id : this.user!.id;
  }

  /**
   * User's email.
   */
  get email(): string {
    return this.isLegacy() ? this.legacyUser.email : this.user!.email;
  }

  /**
   * User's first name.
   */
  get firstName(): string {
    return this.isLegacy() ? this.legacyUser.firstName : this.user!.firstName;
  }

  /**
   * User's last name.
   */
  get lastName(): string {
    return this.isLegacy() ? this.legacyUser.lastName : this.user!.lastName;
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
    return this.isLegacy() ? this.legacyUser.registered : this.user!.registered;
  }

  /**
   * Flag which determines whether User is active.
   */
  get active(): boolean {
    return this.isLegacy() ? this.legacyUser.active : this.user!.active;
  }

  /**
   * String to identify the ToS version agreed to by the user.
   */
  get termsOfServiceVersion(): string | undefined {
    return this.isLegacy()
      ? this.legacyUser.termsOfServiceVersion
      : this.user!.termsOfServiceVersion;
  }
}
