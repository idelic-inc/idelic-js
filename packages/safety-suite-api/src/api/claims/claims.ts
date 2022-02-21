import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, EmptyResponse} from 'src/types';

import {runApi} from '../../runApi';
import {PageRequest} from '../pageRequest';

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
  EMERGENCY_CARE = 'Emergency Care',
  MINOR_CLINIC_HOSPITAL = 'Minor Clinic/Hospital',
  NO_MEDICAL_OPTIONS = 'No Medical Treatment'
}

export interface WorkersCompInfo {
  id: string;
  injuryClaim: keyof typeof InjuryClaimType;
  treatmentOptions: keyof typeof TreatmentOptions;
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
  independent = 'Independent',
  accident = 'Accident',
  forkliftIncident = 'Forklift Incident',
  injuryIllness = 'Injury/Illness',
  billOfLading = 'Bill Of Lading',
  materialSpill = 'Material Spill'
}

export enum ContactType {
  ADJUSTER = 'Adjuster',
  ATTORNEY = 'Attorney',
  CLAIMANT_ATTORNEY = 'Claimant Attorney',
  DEPENDENT = 'Dependent',
  INSURANCE_CARRIER = 'Insurance Carrier',
  LEGAL_CONTACT = 'Legal Contact',
  WIDOW = 'Widow'
}

export interface Payment {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
  payee: string;
}

export interface ClaimContact {
  type: keyof typeof ContactType;
  firstName: string;
  lastName: string;
  fullName: string;
  address: Address;
  phoneNumber: string;
  email: string;
  organizationName: string;
  organizationPhoneNumber: string;
  description: string;
  fileNumber: string;
  dateNotified: Date;
}

export interface ClaimModel {
  id: string;
  customerAlias: string;
  sourceSystem: string;
  recordNumber: string;
  lossDate: Date;
  closedDate: Date;
  status: string;
  type: string;
  groupId: number;
  internalClaimId: string;
  description: string;
  related: RelatedOptions;
  claimantInfo: ClaimantInfo;
  workersCompInfo: WorkersCompInfo;
  vehicleInfo: VehicleInfo;
  contacts: ClaimContact[];
  createdDate: Date;
  lastUpdatedDate: Date;
  createdBy: string;
  lastUpdatedBy: string;
  legacyId: number;
  totalReserves: number;
  totalPayments: number;
  totalReserveRemaining: number;
  totalReimbursements: number;
  totalIncurredExpense: number;
  payments: Payment[];
  reimbursements: Payment[];
  reserves: Payment[];
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
): Request<ApiSuccessResponse<ClaimResponse>> {
  return runApi({
    method: 'POST',
    urlRoot: 'claimsSinkUrlRoot',
    route: '/api/claims',
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
): Request<ClaimModel> {
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

/**
 * Create new claim.
 *
 * @param inputClaim - Claim To Create.
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Claim model response object.
 */
export function createClaim(
  inputClaim: ClaimModel,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<ClaimModel> {
  return runApi({
    method: 'POST',
    urlRoot: 'claimsSourceUrlRoot',
    route: '/api/claims',
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      },
      body: inputClaim
    }
  });
}

/**
 * Update claim by id.
 *
 * @param inputClaim - Claim To Update.
 * @param claimId - Claim UUID
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Claim model response object.
 */
export function updateClaim(
  inputClaim: ClaimModel,
  claimId: string,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<ClaimModel> {
  return runApi({
    method: 'PUT',
    urlRoot: 'claimsSourceUrlRoot',
    route: `/api/claims/${claimId}`,
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      },
      body: inputClaim
    }
  });
}

/**
 * Delete claim by id.
 *
 * @param claimId - Claim UUID
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Claim model response object.
 */
export function deleteClaim(
  claimId: string,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<EmptyResponse> {
  return runApi({
    method: 'DELETE',
    urlRoot: 'claimsSourceUrlRoot',
    route: `/api/claims/${claimId}`,
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      }
    }
  });
}
