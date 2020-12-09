import {Request, RequestOptions} from '@idelic/safety-net';
import {Set} from 'immutable';
import {Moment} from 'moment';

import {runApi} from '../../runApi';
import {EmptyRequest} from '../../types';

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
  requestOptions: RequestOptions<EmptyRequest, ModelDocument[]>
): Request<ModelDocument[]> {
  return runApi({
    method: 'GET',
    route: `/api/models/${modelId}/documents`,
    requestOptions
  });
}

export function downloadModelDocument(
  documentId: number,
  requestOptions: RequestOptions<EmptyRequest, ModelDocumentContent>
): Request<ModelDocumentContent> {
  return runApi({
    method: 'GET',
    route: `/api/models/documents/${documentId}/content`,
    requestOptions: {
      responseType: 'blob',
      ...requestOptions
    }
  });
}

export function createModelDocument(
  modelId: number,
  input: InputModelDocument,
  content: ModelDocumentContent,
  requestOptions: RequestOptions<any, ModelDocument>
): Request<ModelDocument> {
  const form = new FormData();
  form.append('file', content);
  form.append('name', input.name + input.extension);
  input.labels.forEach((label) => form.append('labels', label));
  form.append('protected', input.protected.toString());
  form.append('archived', input.archived.toString());

  return runApi({
    method: 'POST',
    route: `/api/models/${modelId}/documents`,
    notJson: true,
    requestOptions: {
      body: form,
      ...requestOptions
    }
  });
}

export function updateModelDocument(
  document: ModelDocument,
  requestOptions: RequestOptions<ModelDocument, ModelDocument>
): Request<ModelDocument> {
  return runApi({
    method: 'PUT',
    route: '/api/models/documents',
    requestOptions: {
      body: document,
      ...requestOptions
    }
  });
}

export function deleteModelDocument(
  document: ModelDocument,
  requestOptions: RequestOptions<EmptyRequest, number>
): Request<number> {
  return runApi({
    method: 'DELETE',
    route: `/api/models/documents/${document.id}`,
    requestOptions
  });
}
