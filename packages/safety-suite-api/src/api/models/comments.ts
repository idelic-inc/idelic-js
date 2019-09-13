import {Id} from 'src/baseTypes';

export type Comment = any;

export const createModelComment = (modelId: Id, comment: Comment) => {
  return {
    method: 'POST',
    url: `/api/models/${modelId}/comments`,
    options: {
      body: comment
    }
  }
};

export const deleteModelComment = (commentId: Id) => {
  return {
    method: 'DELETE',
    url: `/api/models/comments/${commentId}`
  }
};
