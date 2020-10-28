import {Request} from 'idelic-safety-net';
import {List, Record} from 'immutable';

import {runApi} from '../runApi';
import {ApiOptions, ApiResponse, Id, UnixTime} from '../types';
import {
  createListApiResponseFactory,
  createRecordApiResponseFactory,
  createRecordListApiResponseFactory,
  createRecordRequestTransformer,
  createRecordResponseTransformer,
  createRecordTransformers
} from '../utils';

export interface DocumentQuery {
  customerId: number;
}

export type UploadDocumentProperties =
  | 'confidential'
  | 'fileName'
  | 'fileExtension'
  | 'labels';

export interface UploadDocument
  extends Pick<DocumentProperty, UploadDocumentProperties> {
  file: Blob;
}

export interface DocumentProperty {
  id: number;
  fileName: string;
  fileType: string;
  labels: string[];
  confidential: boolean;
  archived: boolean;
  fileExtension: string;
  uploadedDate: string;
  uploadedBy: number;
  uploadedByName?: string;
}

export interface DeletedDownloads {
  deleteCount: number;
}

export interface DownloadStatus {
  id: number;
  fileName: string;
  status: 'ready' | 'preparing';
}

export interface DocumentErrorMessage {
  id: number;
  message: string;
}

export type ProtectedDocumentProperties =
  | 'fileType'
  | 'uploadedDate'
  | 'uploadedBy'
  | 'uploadedByName'
  | 'fileExtension';

export type UpdateDocumentProperty = Omit<
  DocumentProperty,
  ProtectedDocumentProperties
>;

export interface ImDocumentProperty extends Omit<DocumentProperty, 'labels'> {
  labels: List<string>;
}

export interface ImUploadDocument
  extends Pick<ImDocumentProperty, UploadDocumentProperties> {
  file: Blob;
}

export type ImUpdateDocumentProperty = Omit<
  ImDocumentProperty,
  ProtectedDocumentProperties
>;

export interface GetDocumentIdsQuery extends DocumentQuery {
  fileName?: string;
  labels?: string[];
  startDate?: UnixTime;
  endDate?: UnixTime;
  confidential?: boolean;
  archived?: boolean;
  sortColumn?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export interface BulkRequest {
  documentIds: number[];
}

export interface ImBulkRequest extends Omit<BulkRequest, 'documentIds'> {
  documentIds: List<number>;
}

export interface BulkLabelsRequest {
  documentIds: number[];
  labelsToAppend: string[];
  labelsToDelete: string[];
}

export interface ImBulkLabelsRequest
  extends Omit<
    BulkLabelsRequest,
    'documentIds' | 'labelsToAppend' | 'labelsToDelete'
  > {
  documentIds: List<number>;
  labelsToAppend: List<string>;
  labelsToDelete: List<string>;
}

export interface DocumentActionStatus {
  successIds: number[];
  errors: DocumentErrorMessage[];
}

export interface ImDocumentActionStatus
  extends Omit<DocumentActionStatus, 'successIds' | 'errors'> {
  successIds: List<number>;
  errors: List<Record<DocumentErrorMessage>>;
}

export interface RotateImageRequest {
  id: number;
}

export const DeletedDownloadsRecord = Record<DeletedDownloads>({
  deleteCount: -1
});

export const DownloadStatusRecord = Record<DownloadStatus>({
  id: -1,
  fileName: '',
  status: 'preparing'
});

export const RotateImageRequestRecord = Record<RotateImageRequest>({
  id: -1
});

export const BulkLabelsRequestRecord = Record<ImBulkLabelsRequest>({
  documentIds: List<number>(),
  labelsToAppend: List<string>(),
  labelsToDelete: List<string>()
});

export const DocumentActionStatusRecord = Record<ImDocumentActionStatus>({
  successIds: List<number>(),
  errors: List<Record<DocumentErrorMessage>>()
});

export const UploadDocumentRecord = Record<ImUploadDocument>({
  confidential: false,
  file: new Blob([]),
  fileName: '',
  fileExtension: '',
  labels: List<string>()
});

export const DocumentPropertyRecord = Record<ImDocumentProperty>({
  id: -1,
  fileName: '',
  fileType: '',
  labels: List<string>(),
  confidential: false,
  archived: false,
  fileExtension: '',
  uploadedDate: '',
  uploadedBy: -1
});

export const UpdateDocumentPropertyRecord = Record<ImUpdateDocumentProperty>({
  id: -1,
  fileName: '',
  labels: List<string>(),
  confidential: false,
  archived: false
});

export const UploadDocumentResponseRecord = createRecordApiResponseFactory(
  DocumentPropertyRecord
);

export const GetDocumentIdsResponseRecord = createListApiResponseFactory<Id>();

export const GetCommonLabelsResponseRecord = createListApiResponseFactory<
  string
>();

export const BulkRequestRecord = Record<ImBulkRequest>({
  documentIds: List<number>()
});

export const DeletedDownloadsResponseRecord = createRecordApiResponseFactory<
  DeletedDownloads
>(DeletedDownloadsRecord);

export const DownloadStatusResponseRecord = createRecordApiResponseFactory<
  DownloadStatus
>(DownloadStatusRecord);

export const DocumentActionStatusResponseRecord = createRecordApiResponseFactory<
  ImDocumentActionStatus
>(DocumentActionStatusRecord);

export const UpdateDocumentPropertiesResponseRecord = createRecordApiResponseFactory<
  ImDocumentProperty
>(DocumentPropertyRecord);

export const GetDocumentPropertiesResponseRecord = createRecordListApiResponseFactory<
  ImDocumentProperty
>(DocumentPropertyRecord);

export function uploadDocument(
  upload: UploadDocument,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentProperty>>;
export function uploadDocument(
  upload: Record<UploadDocument>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<ImDocumentProperty>>>>;
export function uploadDocument(
  upload: UploadDocument | Record<UploadDocument>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
):
  | Request<ApiResponse<DocumentProperty>>
  | Request<Record<ApiResponse<Record<ImDocumentProperty>>>> {
  const buildForm = (data: UploadDocument): FormData => {
    const form = new FormData();
    form.append('file', data.file);
    form.append('confidential', data.confidential.toString());
    form.append('fileName', data.fileName);
    form.append('fileExtension', data.fileExtension);
    data.labels.forEach((label) => {
      form.append('labels', label);
    });

    return form;
  };

  const body = buildForm(
    apiOptions.useImmutable
      ? (upload as Record<UploadDocument>).toJSON()
      : (upload as UploadDocument)
  );

  const transformers = createRecordResponseTransformer<
    ApiResponse<Record<ImDocumentProperty>>
  >(apiOptions.useImmutable, UploadDocumentResponseRecord);

  return runApi({
    method: 'POST',
    urlRoot: 'documentLibraryUrlRoot',
    route: `/api/documents`,
    notJson: true,
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function getDocumentIds(
  query: GetDocumentIdsQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<Id[]>>;
export function getDocumentIds(
  query: GetDocumentIdsQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<List<Id>>>>;
export function getDocumentIds(
  query: GetDocumentIdsQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<Id[]> | Record<ApiResponse<List<Id>>>> {
  const transformers = createRecordResponseTransformer<ApiResponse<List<Id>>>(
    apiOptions.useImmutable,
    GetDocumentIdsResponseRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/ids',
    apiOptions,
    requestOptions: {query, transformers}
  });
}

export function getDocumentProperties(
  body: BulkRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentProperty[]>>;
export function getDocumentProperties(
  body: Record<BulkRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<List<Record<ImDocumentProperty>>>>>;
export function getDocumentProperties(
  body: BulkRequest | Record<BulkRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  | ApiResponse<DocumentProperty[]>
  | Record<ApiResponse<List<Record<ImDocumentProperty>>>>
> {
  const transformers = createRecordTransformers<
    BulkRequest,
    ApiResponse<List<Record<ImDocumentProperty>>>
  >(apiOptions.useImmutable, GetDocumentPropertiesResponseRecord);
  return runApi({
    method: 'POST',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/properties/get',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function updateDocumentProperties(
  body: UpdateDocumentProperty,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentProperty>>;
export function updateDocumentProperties(
  body: Record<ImUpdateDocumentProperty>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<ImDocumentProperty>>>>;
export function updateDocumentProperties(
  body: UpdateDocumentProperty | Record<ImUpdateDocumentProperty>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  | ApiResponse<DocumentProperty>
  | Record<ApiResponse<Record<ImDocumentProperty>>>
> {
  const transformers = createRecordTransformers<
    ImUpdateDocumentProperty,
    ApiResponse<Record<ImDocumentProperty>>
  >(apiOptions.useImmutable, UpdateDocumentPropertiesResponseRecord);
  return runApi({
    method: 'PUT',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/properties',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function getDocumentContent(
  documentId: number,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<Blob> {
  return runApi({
    method: 'GET',
    urlRoot: 'documentLibraryUrlRoot',
    route: `/api/documents/content/${documentId}`,
    apiOptions,
    requestOptions: {
      query,
      responseType: 'blob'
    }
  });
}

export function archiveDocuments(
  body: BulkRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentActionStatus>>;
export function archiveDocuments(
  body: Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<ImDocumentActionStatus>>>>;
export function archiveDocuments(
  body: BulkRequest | Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  | ApiResponse<DocumentActionStatus>
  | Record<ApiResponse<Record<ImDocumentActionStatus>>>
> {
  const transformers = createRecordTransformers<
    ImBulkRequest,
    ApiResponse<Record<ImDocumentActionStatus>>
  >(apiOptions.useImmutable, DocumentActionStatusResponseRecord);
  return runApi({
    method: 'PUT',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/archive',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function deleteDocuments(
  body: BulkRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentActionStatus>>;
export function deleteDocuments(
  body: Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<ImDocumentActionStatus>>>>;
export function deleteDocuments(
  body: BulkRequest | Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  | ApiResponse<DocumentActionStatus>
  | Record<ApiResponse<Record<ImDocumentActionStatus>>>
> {
  const transformers = createRecordTransformers<
    ImBulkRequest,
    ApiResponse<Record<ImDocumentActionStatus>>
  >(apiOptions.useImmutable, DocumentActionStatusResponseRecord);
  return runApi({
    method: 'DELETE',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function prepareBulkDownload(
  body: BulkRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DownloadStatus>>;
export function prepareBulkDownload(
  body: Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<DownloadStatus>>>>;
export function prepareBulkDownload(
  body: BulkRequest | Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  ApiResponse<DownloadStatus> | Record<ApiResponse<Record<DownloadStatus>>>
> {
  const transformers = createRecordTransformers<
    ImBulkRequest,
    ApiResponse<Record<DownloadStatus>>
  >(apiOptions.useImmutable, DownloadStatusResponseRecord);
  return runApi({
    method: 'POST',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/downloads',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function deleteExpiredDownloads(
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  ApiResponse<DeletedDownloads> | Record<ApiResponse<Record<DeletedDownloads>>>
> {
  const transformers = createRecordResponseTransformer<
    ApiResponse<Record<DeletedDownloads>>
  >(apiOptions.useImmutable, DeletedDownloadsResponseRecord);
  return runApi({
    method: 'DELETE',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/downloads/expired',
    apiOptions,
    requestOptions: {
      query,
      transformers
    }
  });
}

export function getDownloadStatus(
  downloadId: number,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  ApiResponse<DownloadStatus> | Record<ApiResponse<Record<DownloadStatus>>>
> {
  const transformers = createRecordResponseTransformer<
    ApiResponse<Record<DownloadStatus>>
  >(apiOptions.useImmutable, DownloadStatusResponseRecord);
  return runApi({
    method: 'GET',
    urlRoot: 'documentLibraryUrlRoot',
    route: `/api/documents/downloads/status/${downloadId}`,
    apiOptions,
    requestOptions: {
      query,
      transformers
    }
  });
}

export function getReadyDownload(
  downloadId: number,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<Blob> {
  return runApi({
    method: 'GET',
    urlRoot: 'documentLibraryUrlRoot',
    route: `/api/documents/downloads/content/${downloadId}`,
    apiOptions,
    requestOptions: {
      query,
      responseType: 'blob'
    }
  });
}

export function modifyDocumentLabels(
  body: BulkLabelsRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DocumentActionStatus>>;
export function modifyDocumentLabels(
  body: Record<ImBulkLabelsRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<Record<ImDocumentActionStatus>>>>;
export function modifyDocumentLabels(
  body: BulkLabelsRequest | Record<ImBulkLabelsRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<
  | ApiResponse<DocumentActionStatus>
  | Record<ApiResponse<Record<ImDocumentActionStatus>>>
> {
  const transformers = createRecordTransformers<
    ImBulkLabelsRequest,
    ApiResponse<Record<ImDocumentActionStatus>>
  >(apiOptions.useImmutable, DocumentActionStatusResponseRecord);
  return runApi({
    method: 'PUT',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/labels',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}
export function getCommonLabels(
  body: BulkRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<string[]>>;
export function getCommonLabels(
  body: Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<Record<ApiResponse<List<string>>>>;
export function getCommonLabels(
  body: BulkRequest | Record<ImBulkRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<string[]> | Record<ApiResponse<List<string>>>> {
  const transformers = createRecordTransformers<
    ImBulkRequest,
    ApiResponse<List<string>>
  >(apiOptions.useImmutable, GetCommonLabelsResponseRecord);
  return runApi({
    method: 'POST',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/commonLabels/get',
    apiOptions,
    requestOptions: {
      body,
      query,
      transformers
    }
  });
}

export function rotateImage(
  request: RotateImageRequest,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<number>>;
export function rotateImage(
  request: Record<RotateImageRequest>,
  query: DocumentQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<number>>;
export function rotateImage(
  request: RotateImageRequest | Record<RotateImageRequest>,
  query: DocumentQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<number>> {
  const transformers = createRecordRequestTransformer<RotateImageRequest>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'documentLibraryUrlRoot',
    route: '/api/documents/rotate',
    apiOptions,
    requestOptions: {
      body: request,
      query,
      transformers
    }
  });
}
