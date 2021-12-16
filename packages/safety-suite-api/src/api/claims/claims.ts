import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiResponse, ApiSuccessResponse} from 'src/types';

import {runApi} from '../../runApi';
import {PageRequest} from '../pageRequest';

export enum ClaimStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  LITIGATION = 'Ligitation',
  SUBRO = 'Subro'
}

export interface RelatedOptions {
  id: string;
  employee: number;
  relatedIncidents: RelatedIncidents;
  internalEquipment: number[];
}

export interface RelatedIncidents {
  accident: number;
  billOfLading: number;
  forkliftIncident: number;
  injuryIllness: number;
  materialSpill: number;
}

export interface Address {
  city: string;
  state: string;
  zipCode: string;
  streetLine1: string;
  streetLine2: string;
}

export interface ClaimantInfo {
  id: string;
  address: Address;
  companyInfo: string;
  description: string;
  email: string;
  fullName: string;
  insuranceClaimNumber: string;
  insuranceCompany: string;
  phoneNumber: string;
}

export enum InjuryClaimType {
  INTERNAL_ONLY = 'Internal only',
  MEDICAL_ONLY = 'Medical only',
  RESTRICTION_ONLY = 'Restriction only',
  LOST_TIME = 'Lost time',
  FATALITY = 'Fatality'
}

export enum TreatmentOptions {
  NO_MEDICAL_OPTIONS = 'No medical options',
  MINOR_CLINIC_HOSPITAL = 'Minor clinic hospital',
  EMERGENCY_CARE = 'Emergency care'
}

export interface WorkersCompInfo {
  id: string;
  injuryClaim: keyof typeof InjuryClaimType;
  treatmentOptions: TreatmentOptions;
  averageWeeklyWage: string;
  benefitState: string;
  hourlyWage: string;
  litigation: boolean;
  medicalFacility: string;
  medicalFacilityPhoneNumber: string;
  priorWorkersComp: boolean;
  privacyCase: boolean;
  privacyCaseState: string;
  temporaryTotalDisability: string;
}

export interface VehicleInfo {
  id: string;
  color: string;
  description: string;
  licenseNumber: string;
  vinNumber: string;
  licenseState: string;
  make: string;
  model: string;
  year: string;
}

export enum EventType {
  INJURY = 'Injury',
  ACCIDENT = 'Accident'
}

export interface ClaimModel {
  id: string;
  customerAlias: string;
  sourceSystem: string;
  recordNumber: string;
  lossDate: Date;
  closedDate: Date;
  status: keyof typeof ClaimStatus;
  type: string;
  groupId: number;
  internalClaimId: string;
  description: string;
  related: RelatedOptions;
  claimantInfo: ClaimantInfo;
  workersCompInfo: WorkersCompInfo;
  vehicleInfo: VehicleInfo;
  createdDate: Date;
  lastUpdatedDate: Date;
  createdBy: string;
  lastUpdatedBy: string;
  totalReserves: number;
  totalPaid: number;
  totalRemaining: number;
  // Clarify
  eventType: keyof typeof EventType;
}

export interface ClaimResponse {
  claims: ClaimModel[];
}

/**
 * Get all claims by page.
 *
 * @param pageRequest - Default claims by page request with filtering and sorting.
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Claim models page response object.
 */
export function getClaims(
  pageRequest: PageRequest,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<ApiResponse<ApiSuccessResponse<ClaimResponse>>> {
  return runApi({
    method: 'POST',
    urlRoot: 'claimsSinkUrlRoot',
    route: `/api/claims`,
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      },
      body: pageRequest
    }
  });
}

/**
 * Get claim by id.
 *
 * @param claimId - Claim Id.
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Claim model response object.
 */
export function getClaimById(
  claimId: string,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<ApiResponse<ClaimModel>> {
  return runApi({
    method: 'GET',
    urlRoot: 'claimsSinkUrlRoot',
    route: `/api/claims/${claimId}`,
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      }
    }
  });
}
