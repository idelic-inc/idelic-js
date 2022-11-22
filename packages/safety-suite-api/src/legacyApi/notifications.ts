import {Id} from '../types';
import {LegacyApi} from './types';

export type NotificationOption = any;
type NotificationSourceType = string;

/**
 * @deprecated Use `fetchNotificationTypes` instead.
 */
export const getNotificationsTypes: LegacyApi = {
  method: 'GET',
  route: '/api/notifications/types'
};

/**
 * @deprecated Use `fetchNotificationSubscriptions` instead.
 */
export const getSubscriptions: LegacyApi = {
  method: 'GET',
  route: '/api/notifications/subscriptions'
};

/**
 * @deprecated Use `createNotificationSubscription` instead.
 */
export function createSubscription(
  notificationTypeId: Id,
  notificationSourceType: NotificationSourceType,
  notificationSourceId: Id,
  option: NotificationOption
): LegacyApi {
  return {
    method: 'POST',
    route: '/api/notifications/subscriptions/',
    requestOptions: {
      body: {
        notificationTypeId,
        notificationSourceType,
        notificationSourceId,
        option
      }
    }
  };
}

/**
 * @deprecated Use `updateNotificationSubscription` instead.
 */
export function updateSubscription(
  id: Id,
  userId: Id,
  notificationTypeId: Id,
  notificationSourceType: NotificationSourceType,
  notificationSourceId: Id,
  option: NotificationOption
): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/notifications/subscriptions/',
    requestOptions: {
      body: {
        id,
        userId,
        notificationTypeId,
        notificationSourceType,
        notificationSourceId,
        option
      }
    }
  };
}

/**
 * @deprecated Use `deleteNotificationSubscription` instead.
 */
export function removeSubscription(subscriptionId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/notifications/subscriptions/${subscriptionId}`
  };
}
