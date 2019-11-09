import {Id} from '../../types';
import {LegacyApi} from '../types';

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getProfilePicture(modelId: Id): LegacyApi {
  return {
    method: 'GET',
    route: `/api/models/${modelId}/profilePicture`
  };
}

export function uploadProfilePicture(
  modelId: Id,
  profilePicture: File,
  cropData: CropData
): LegacyApi {
  const form = new FormData();
  form.append('file', profilePicture);
  form.append('x', cropData.x.toString());
  form.append('y', cropData.y.toString());
  form.append('height', cropData.height.toString());
  form.append('width', cropData.width.toString());

  return {
    method: 'POST',
    route: `/api/models/${modelId}/profilePicture`,
    notJson: true,
    requestOptions: {body: form}
  };
}

export function deleteProfilePicture(modelId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/models/${modelId}/profilePicture`
  };
}
