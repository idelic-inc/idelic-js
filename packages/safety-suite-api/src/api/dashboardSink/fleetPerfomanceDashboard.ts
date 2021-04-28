import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';

interface Sort {
  column: string;
  direction?: string;
}

interface Query {
  customerAlias: string;
  groupIds?: string[];
}

interface TableQuery extends Query {
  sort: Sort;
  page?: number;
  size?: number;
}

interface Model {
  id: number;
  employeeLabel: string;
  customerAlias: string;
  groupId: number;
}

// Accident
interface AccidentCounts {
  daysSincePreventable: number;
}

interface Accident extends Model {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  type: string;
  preventable: boolean;
  daysSince: number;
}

// Development Plans

interface DevelopmentPlanCounts {
  activePlans: number;
  tasksAssigned: number;
  tasksPastDue: number;
}

interface DevelopmentPlan extends Model {
  recordNumber: number;
  planType: string;
  planStatus: string;
}

// Enforcement

interface EnforcementCounts {
  inspections: number;
  cleanInspections: number;
  inspectionsWithViolations: number;
}

interface Enforcement extends Model {
  recordNumber: number;
  date: string;
  csaPoints: number;
  outOfService: boolean;
}

// Expiring Documents

interface ExpirationCounts {
  expired: number;
  expiresIn30Days: number;
  expiresIn60Days: number;
}

interface Expiration extends Model {
  recordNumber: number;
  expirationDate: string;
  terminalLabel: string;
  recordType: string;
}

// Injuries

interface InjuryCounts {
  daysSince: number;
}

interface Injury extends Model {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  oshaReportable: boolean;
  daysSince: number;
}

// Watch List

type RiskScoreBuckets =
  | '1'
  | '11'
  | '21'
  | '31'
  | '41'
  | '51'
  | '61'
  | '71'
  | '81'
  | '91';

type RiskScoreGraph = {[R in RiskScoreBuckets]: number};

interface RiskScore extends Model {
  terminalLabel: string;
  riskScore: number;
  planStatus: string;
}

const getSortString = (sort: Sort): string => {
  return sort.direction ? `${sort.column},${sort.direction}` : sort.column;
};

// Accidents

export function getAccidentCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<AccidentCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/accidents/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getAccidents(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Accident[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/accidents',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}

// Development Plans

export function getDevelopmentPlanCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DevelopmentPlanCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/development-plans/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDevelopmentPlans(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DevelopmentPlan[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/development-plans',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}

// Enforcements

export function getEnforcementCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<EnforcementCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/enforcement/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getEnforcements(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Enforcement[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/enforcements',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}

// Expirations

export function getExpirationCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<ExpirationCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getExpirations(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Expiration[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}

// Injuries

export function getInjuryCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<InjuryCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/injuries/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getInjuries(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Injury[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/injuries',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}

// Watch List

export function getRiskScoresGraph(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<RiskScoreGraph>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/risk-scores/graph',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getRiskScores(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<RiskScore[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/risk-scores',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: getSortString(query.sort)
      }
    }
  });
}
