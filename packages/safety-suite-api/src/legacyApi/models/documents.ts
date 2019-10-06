import {Request, RequestOptions} from 'idelic-safety-net';
import {Set} from 'immutable';
import {Moment} from 'moment';

import {runApi} from '../../runApi';

export type ModelDocumentType = 'DOCUMENT' | 'PROFILE_PICTURE';
export type ModelDocumentStorageType = 'DATABASE' | 'LOCAL_FILESYSTEM' | 'AWS';

export type ModelDocument = {
  id: number;
  documentType: ModelDocumentType;
  storageType: ModelDocumentStorageType;
  createdBy: string;
  createdDate: Moment;
  lastUpdatedBy: string;
  lastUpdatedDate: Moment;
  mimeType: string;
  uri: string;
  modelId: number;
  labels: Set<string>;
  name: string;
  protected: boolean;
  archived: boolean;
};

export type InputModelDocument = {
  file: ModelDocumentContent;
  name: string;
  labels: Set<string>;
  protected: boolean;
  archived: boolean;
  extension: string;
};

export type ModelDocumentContent = Blob;

export function getModelDocuments(
  modelId: number,
  options: RequestOptions<ModelDocument[]>
): Request<ModelDocument[]> {
  return runApi({
    method: 'GET',
    route: `/api/models/${modelId}/documents`,
    options
  });
}

export function downloadModelDocument(
  documentId: number,
  options: RequestOptions<ModelDocumentContent>
): Request<ModelDocumentContent> {
  return runApi({
    method: 'GET',
    route: `/api/models/documents/${documentId}/content`,
    options: {
      responseType: 'blob',
      ...options
    }
  });
}

export function createModelDocument(
  modelId: number,
  input: InputModelDocument,
  content: ModelDocumentContent,
  options: RequestOptions<ModelDocument>
): Request<ModelDocument> {
  const form = new FormData();
  form.append('file', content);
  form.append('name', input.name + input.extension);
  input.labels.forEach(label => form.append('labels', label));
  form.append('protected', input.protected.toString());
  form.append('archived', input.archived.toString());

  return runApi({
    method: 'POST',
    route: `/api/models/${modelId}/documents`,
    notJson: true,
    options: {
      body: form,
      ...options
    }
  });
}

export function updateModelDocument(
  document: ModelDocument,
  options: RequestOptions<ModelDocument>
): Request<ModelDocument> {
  return runApi({
    method: 'PUT',
    route: '/api/models/documents',
    options: {
      body: document,
      ...options
    }
  });
}

export function deleteModelDocument(
  document: ModelDocument,
  options: RequestOptions<number>
): Request<number> {
  return runApi({
    method: 'DELETE',
    route: `/api/models/documents/${document.id}`,
    options
  });
}
