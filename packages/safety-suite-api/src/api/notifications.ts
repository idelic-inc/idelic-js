import {runApi} from '../runApi';
import {ApiOptions, Id} from '../types';

export type NotificationEventType =
  | 'CREATE'
  | 'DELETE'
  | 'UPDATE'
  | 'CHANGE'
  | 'DATE_DUE'
  | 'DAILY_ALERT'
  | 'WEEKLY_ALERT'
  | 'MONTHLY_ALERT'
  | 'WATCH_LIST';

export type NotificationPeriodicity =
  | 'INSTANT'
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY';

export interface NotificationType {
  /**
   * Which event will trigger notifications for subscriptions of this type.
   */
  eventType: NotificationEventType;
  /**
   * Unique DB ID.
   */
  id: Id;
  /**
   * Formatted display name.
   */
  name: string;
  /**
   * Period between the event and the notification being sent.
   */
  periodicity: NotificationPeriodicity;
}

export type NotificationSourceType = 'MODEL' | 'MONITOR' | 'DOCUMENT';

export interface FormatronColumn {
  field: string[];
  label?: string;
  relationNames?: string[];
  type?: string;
}

export type NotificationSubscriptionOption =
  | {
      label: string;
      changes: Record<string, unknown>;
      linkPath?: string;
      columns: FormatronColumn[];
      preUpdateColumns: FormatronColumn[];
    }
  | {
      label: string;
      value: number;
    };

export interface NotificationSubscription {
  /**
   * Unique DB ID.
   */
  id: Id;
  /**
   * ID of the source template, based on selected `notificationSourceType`
   *
   * E.g. if `notificationSourceType: 'MODEL'` then `notificationSourceId` would be a model template ID.
   */
  notificationSourceId: Id;
  /**
   * What type of source the events will come from.
   */
  notificationSourceType: NotificationSourceType;
  /**
   * ID of the notification type.
   */
  notificationTypeId: Id;
  /**
   * ID of the current user.
   */
  userId: Id;
  /**
   * Options typically pulled from the source template.
   */
  option?: NotificationSubscriptionOption;
}

export type InputNotificationSubscription = Omit<
  NotificationSubscription,
  'id' | 'userId'
>;

/**
 * Fetches a list of all notification types.
 *
 * @param apiOptions - Optional options for runApi.
 */
export const fetchNotificationTypes = (apiOptions?: ApiOptions) =>
  runApi<never, NotificationType[]>({
    method: 'GET',
    route: '/api/notifications/types',
    apiOptions
  });

/**
 * Fetches a list of all notification subscriptions for the current user.
 *
 * @param apiOptions - Optional options for runApi.
 */
export const fetchNotificationSubscriptions = (apiOptions?: ApiOptions) =>
  runApi<never, NotificationSubscription[]>({
    method: 'GET',
    route: '/api/notifications/subscriptions',
    apiOptions
  });

/**
 * Subscribes the current user to notifications for a specific event.
 *
 * @param subscription - Object with information about the subscription.
 * @param apiOptions - Optional options for runApi.
 */
export const createNotificationSubscription = (
  subscription: InputNotificationSubscription,
  apiOptions?: ApiOptions
) =>
  runApi<InputNotificationSubscription, NotificationSubscription>({
    method: 'POST',
    route: '/api/notifications/subscriptions',
    requestOptions: {
      body: subscription
    },
    apiOptions
  });

/**
 * Updates an existing notification subscription for the current user.
 *
 * @param subscription - Object with updated information about the subscription.
 * @param apiOptions - Optional options for runApi.
 */
export const updateNotificationSubscription = (
  subscription: NotificationSubscription,
  apiOptions?: ApiOptions
) =>
  runApi<NotificationSubscription, NotificationSubscription>({
    method: 'PUT',
    route: '/api/notifications/subscriptions',
    requestOptions: {
      body: subscription
    },
    apiOptions
  });

/**
 * Unsubscribes the current user from notifications for a specific event.
 *
 * @param subscriptionId - ID of the subscription to delete.
 * @param apiOptions - Optional options for runApi.
 */
export const deleteNotificationSubscription = (
  subscriptionId: Id,
  apiOptions?: ApiOptions
) =>
  runApi<never, number>({
    method: 'DELETE',
    route: `/api/notifications/subscriptions/${subscriptionId}`,
    apiOptions
  });
