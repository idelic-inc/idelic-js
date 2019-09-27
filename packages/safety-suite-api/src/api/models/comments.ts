import {Id} from '../../baseTypes';

export type Comment = any;

export const createModelComment = (modelId: Id, comment: Comment) => ({
  method: 'POST',
  url: `/api/models/${modelId}/comments`,
  options: {
    body: comment
  }
});

export const deleteModelComment = (commentId: Id) => ({
  method: 'DELETE',
  url: `/api/models/comments/${commentId}`
});
