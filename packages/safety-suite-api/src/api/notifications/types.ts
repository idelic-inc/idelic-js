import {Alias, Id} from '../../types';

export enum NotificationType {
  PDP_TASK_DUE_WITHIN_2_DAY = 'PDP_TASK_DUE_WITHIN_2_DAY',
  PDP_NEW_TASK_ASSIGNED = 'PDP_NEW_TASK_ASSIGNED',
  PDP_TASK_PAST_DUE = 'PDP_TASK_PAST_DUE'
}

export interface NotificationSubscription {
  customerAlias: Alias;
  notificationSubscriptionName: NotificationType;
  enabled: boolean;
}

export interface NotificationSubscriptionRequest
  extends NotificationSubscription {
  userLegacyId: Id;
}

export interface NotificationSubscriptionResponse
  extends NotificationSubscription {
  id: Id;
  userId: Id;
  lastUpdated: string;
}
