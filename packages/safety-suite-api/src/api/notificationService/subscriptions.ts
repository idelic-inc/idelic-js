import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {Alias, ApiOptions, Id} from '../../types';
import {
  NotificationSubscriptionRequest,
  NotificationSubscriptionResponse,
  NotificationType
} from './types';

export const getNotificationServiceSubscriptionsByUserId = (
  userId: Id,
  customerAlias: Alias,
  apiOptions: ApiOptions = {}
): Request<NotificationSubscriptionResponse[]> =>
  runApi({
    method: 'GET',
    urlRoot: 'notificationServiceUrlRoot',
    route: `/api/notification-subscriptions/${userId}/${customerAlias}`,
    apiOptions
  });

export const getNotificationServiceSubscriptionsByNotificationType = (
  notificationType: NotificationType,
  apiOptions: ApiOptions = {}
): Request<NotificationSubscriptionResponse[]> =>
  runApi({
    method: 'GET',
    urlRoot: 'notificationServiceUrlRoot',
    route: `/api/notification-subscriptions/${notificationType}`,
    apiOptions
  });

export const updateNotificationServiceSubscription = (
  body: NotificationSubscriptionRequest,
  apiOptions: ApiOptions = {}
): Request<NotificationSubscriptionResponse> =>
  runApi({
    method: 'PUT',
    urlRoot: 'notificationServiceUrlRoot',
    route: '/api/notification-subscriptions',
    apiOptions,
    requestOptions: {
      body
    }
  });
