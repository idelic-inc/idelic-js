import {Request} from '@idelic/safety-net';
import {ApiOptions} from 'src/types';

import {runApi} from '../runApi';

/**
 * Returns a Blob of an business hierarchy XLSX file.
 *
 * @param templateId - Id of business hierarchy template.
 * @param apiOptions - Optional options for runApi.
 */
export function getBusinessHierarchyTemplateFile(
  templateId: number,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'GET',
    route: `/api/businessHierarchy/content/${templateId}`,
    apiOptions,
    requestOptions: {
      responseType: 'blob'
    }
  });
}

enum BusinessHierarchyTemplateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type BusinessHierarchyUploadTemplate = {
  file: File;
  companyStructureName: string;
  description: string;
};

export type BusinessHierarchyTemplate = {
  id: number;
  fileName: string;
  status: BusinessHierarchyTemplateStatus;
  s3Link: string;
  companyStructureName: string;
  description: string;
  createdBy: number;
  uploadedDate: string;
};

/**
 * Uploads business hierarchy template file.
 *
 * @param upload - Template file, company name and description.
 * @param apiOptions - Optional options for runApi.
 */
export function uploadBusinessHierarchyTemplate(
  upload: BusinessHierarchyUploadTemplate,
  apiOptions?: ApiOptions
): Request<BusinessHierarchyTemplate> {
  const buildForm = (data: BusinessHierarchyUploadTemplate): FormData => {
    const form = new FormData();
    form.append('', data.file);
    form.append('description', data.description);
    form.append('companyStructureName', data.companyStructureName);
    return form;
  };

  const body = buildForm(upload);

  return runApi({
    method: 'POST',
    route: `/api/businessHierarchy/upload`,
    notJson: true,
    apiOptions,
    requestOptions: {
      body
    }
  });
}

/**
 * Get list of existing business hierarchy template files.
 *
 * @param apiOptions - Optional options for runApi.
 */
export function getBusinessHierarchyTemplates(
  apiOptions?: ApiOptions
): Request<BusinessHierarchyTemplate[]> {
  return runApi({
    method: 'GET',
    route: `/api/businessHierarchy`,
    apiOptions
  });
}
