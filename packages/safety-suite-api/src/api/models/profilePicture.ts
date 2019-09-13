import {Id} from 'src/baseTypes';

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getProfilePicture(modelId: Id) {
  return {
    method: 'GET',
    url: `/api/models/${modelId}/profilePicture`
  };
}

export function uploadProfilePicture(
  modelId: Id,
  profilePicture: File,
  cropData: CropData
) {
  const form = new FormData();
  form.append('file', profilePicture);
  form.append('x', cropData.x.toString());
  form.append('y', cropData.y.toString());
  form.append('height', cropData.height.toString());
  form.append('width', cropData.width.toString());

  return {
    method: 'POST',
    url: `/api/models/${modelId}/profilePicture`,
    notJson: true,
    options: {body: form}
  };
}
