import {Id} from '../baseTypes';

export type NotificationOption = any;
export type NotificationSourceType = string;

export const getNotificationsTypes = {
  method: 'GET',
  route: '/api/notifications/types'
};

export const getSubscriptions = {
  method: 'GET',
  route: '/api/notifications/subscriptions'
};

export function createSubscription(
  notificationTypeId: Id,
  notificationSourceType: NotificationSourceType,
  notificationSourceId: Id,
  option: NotificationOption
) {
  return {
    method: 'POST',
    route: '/api/notifications/subscriptions/',
    options: {
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
  userAccountId: Id,
  notificationTypeId: Id,
  notificationSourceType: NotificationSourceType,
  notificationSourceId: Id,
  option: NotificationOption
) {
  return {
    method: 'PUT',
    route: '/api/notifications/subscriptions/',
    options: {
      body: {
        id,
        userAccountId,
        notificationTypeId,
        notificationSourceType,
        notificationSourceId,
        option
      }
    }
  };
}

export function removeSubscription(subscriptionId: Id) {
  return {
    method: 'DELETE',
    route: `/api/notifications/subscriptions/${subscriptionId}`
  };
}
