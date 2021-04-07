import {Id} from '../types';
import {LegacyApi} from './types';

export type NotificationOption = any;
export type NotificationSourceType = string;

export const getNotificationsTypes: LegacyApi = {
  method: 'GET',
  route: '/api/notifications/types'
};

export const getSubscriptions: LegacyApi = {
  method: 'GET',
  route: '/api/notifications/subscriptions'
};

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

export function removeSubscription(subscriptionId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/notifications/subscriptions/${subscriptionId}`
  };
}
