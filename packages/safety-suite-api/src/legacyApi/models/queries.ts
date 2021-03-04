import {ModelQuery} from '../../api/models/types';
import {Id} from '../../types';
import {LegacyApi} from '../types';

export type ModelExportTypes = 'xlsx' | 'csv';

export type ExportColumn = {
  field: string | string[];
  label: string;
};

export type ModelExport = {
  query: ModelQuery;
  columns: ExportColumn[];
  options: {
    timezone: string;
  };
};

export type XlsxExportColumn = {
  query: ModelQuery;
  columnName: string;
};

export type XlsxExportQuery = {
  reportName: string;
  columns: XlsxExportColumn[];
};

export type LostRestrictedInput = {
  modelId: Id;
  estimateLostDays: number;
  estimateRestrictedDays: number;
};

export type OshaInput = {
  year: number;
  terminalId: Id;
  averageNumberOfEmployees: number;
  totalHoursWorked: number;
  company: string;
  companyExecutive: string;
  title: string;
  phone: string;
  lostRestrictedDays: LostRestrictedInput[];
};

/**
 * @deprecated Use `queryModels` instead.
 * @param modelQuery - Model query object.
 */
export function runModelsQuery(modelQuery: ModelQuery): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/query',
    requestOptions: {body: modelQuery}
  };
}

export function exportModelsQuery(
  modelExport: ModelExport,
  exportType: ModelExportTypes
): LegacyApi {
  return {
    method: 'POST',
    route: `/api/models/query/${exportType}`,
    requestOptions: {
      body: modelExport,
      responseType: exportType === 'xlsx' ? 'blob' : 'text'
    }
  };
}

export function exportXlsxQuery(xlsxQuery: XlsxExportQuery): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/queries/xlsx',
    requestOptions: {
      body: xlsxQuery,
      responseType: 'blob'
    }
  };
}

export function exportEnforcementsReport(query: ModelQuery): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/query/canned/enforcements/xlsx',
    requestOptions: {
      body: query,
      responseType: 'blob'
    }
  };
}

export function exportTurnoverReport(query: ModelQuery): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/query/canned/turnover/xlsx',
    requestOptions: {
      body: query,
      responseType: 'blob'
    }
  };
}

export function exportOshaReport(input: OshaInput): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/query/canned/osha/xlsx',
    requestOptions: {
      body: input,
      responseType: 'blob'
    }
  };
}

export function exportModelsToPdf(ids: Id[], viewName: string): LegacyApi {
  return {
    method: 'POST',
    route: `/api/models/export/${viewName}`,
    requestOptions: {
      body: {ids},
      responseType: 'blob'
    }
  };
}
