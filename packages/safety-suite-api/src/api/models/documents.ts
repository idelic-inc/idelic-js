import {Request, RequestOptions} from 'idelic-safety-net';
import {Set} from 'immutable';
import {Moment} from 'moment';

import {runCancellableApi} from 'src/runApi';

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
}

export type InputModelDocument = {
  file: ModelDocumentContent;
  name: string;
  labels: Set<string>;
  protected: boolean;
  archived: boolean;
  extension: string;
}

export type ModelDocumentContent = Blob;

export default {
  ['get']: getModelDocuments,
  download: downloadModelDocument,
  create: createModelDocument,
  update: updateModelDocument,
  ['delete']: deleteModelDocument
};

export function getModelDocuments(modelId: number, options: RequestOptions): Request<ModelDocument[]> {
  return runCancellableApi({
    method: 'GET',
    url: `/api/models/${modelId}/documents`,
    options
  });
}

export function downloadModelDocument(documentId: number, options: RequestOptions): Request<ModelDocumentContent> {
  return runCancellableApi({
    method: 'GET',
    url: `/api/models/documents/${documentId}/content`,
    options: {
      responseType: 'blob',
      ...options
    }
  });
}

export function createModelDocument(modelId: number, input: InputModelDocument, content: ModelDocumentContent, options: RequestOptions): Request<ModelDocument> {
  const form = new FormData();
  form.append('file', content);
  form.append('name', input.name + input.extension);
  input.labels.forEach(label => form.append('labels', label));
  form.append('protected', input.protected.toString());
  form.append('archived', input.archived.toString());

  return runCancellableApi({
    method: 'POST',
    url: `/api/models/${modelId}/documents`,
    notJson: true,
    options: {
      body: form,
      ...options
    }
  });
}

export function updateModelDocument(document: ModelDocument, options: RequestOptions): Request<ModelDocument> {
  return runCancellableApi({
    method: 'PUT',
    url: '/api/models/documents',
    options: {
      body: document,
      ...options
    }
  });
}

export function deleteModelDocument(document: ModelDocument, options: RequestOptions): Request<number> {
  return runCancellableApi({
    method: 'DELETE',
    url: `/api/models/documents/${document.id}`,
    options
  });
}
