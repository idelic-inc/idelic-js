import {Id} from '../../types';
import {LegacyApi} from '../types';

export type Comment = any;

export const getModelComments = (modelId: Id): LegacyApi => ({
  method: 'GET',
  route: `/api/models/${modelId}/comments`
});

export const createModelComment = (
  modelId: Id,
  comment: Comment
): LegacyApi => ({
  method: 'POST',
  route: `/api/models/${modelId}/comments`,
  requestOptions: {
    body: comment
  }
});

export const deleteModelComment = (commentId: Id): LegacyApi => ({
  method: 'DELETE',
  route: `/api/models/comments/${commentId}`
});
