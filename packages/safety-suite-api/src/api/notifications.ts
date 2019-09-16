import {Id} from '../baseTypes';

export type NotificationOption = any;
export type NotificationSourceType = string;

export const getNotificationsTypes = {
  method: 'GET',
  url: '/api/notifications/types'
};

export const getSubscriptions = {
  method: 'GET',
  url: '/api/notifications/subscriptions'
};

export function createSubscription(
  notificationTypeId: Id,
  notificationSourceType: NotificationSourceType,
  notificationSourceId: Id,
  option: NotificationOption
) {
  return {
    method: 'POST',
    url: '/api/notifications/subscriptions/',
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
    url: '/api/notifications/subscriptions/',
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
    url: `/api/notifications/subscriptions/${subscriptionId}`
  };
}
