import {Id} from '../../baseTypes';

export type Comment = any;

export const createModelComment = (modelId: Id, comment: Comment) => ({
  method: 'POST',
  route: `/api/models/${modelId}/comments`,
  options: {
    body: comment
  }
});

export const deleteModelComment = (commentId: Id) => ({
  method: 'DELETE',
  route: `/api/models/comments/${commentId}`
});
