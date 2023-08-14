// THIS FILE IS GENERATED
// That means that you should never edit it.
// Yes, that means you.
// See `scripts/generateModelTypes/index.ts` for more details.
import {InputModel, Model} from './types';

// Type definitions for /advancedAccidents / Accident (accident)

export interface AccidentFields {
  accidentClassification?: string | null;
  accidentType?: string | null;
  ataReportable?: boolean;
  basicType?: string | null;
  citation?: string | null;
  citationCount?: number | null;
  citationDetails?: string;
  companyAssetDamageDescription?: string;
  contributingFactors?: string[];
  daTestDetails?: string;
  daTestGiven?: string | null;
  date?: number | null;
  dateReported?: number | null;
  dayOfWorkWeekShift?: string | null;
  description?: string;
  dotReportable?: boolean;
  employeeSignaledOrSoundedBorn?: boolean;
  fatality?: string | null;
  fatalityCount?: number | null;
  fatalityDetails?: string;
  fmcsaReportNo?: string;
  generalArea?: string | null;
  generalPad?: string | null;
  hazardousSpill?: string | null;
  hazardousSpillDetails?: string;
  hourDriving?: string | null;
  hourOnDuty?: string | null;
  injury?: string | null;
  injuryCount?: number | null;
  injuryDetails?: string;
  lightConditions?: string | null;
  locationAddress?: string;
  locationAreaNumber?: string;
  locationCity?: string;
  locationDeaNumber?: string;
  locationDistrictNumber?: string;
  locationName?: string;
  locationPhone?: string;
  locationRegionNumber?: string;
  locationState?: string;
  locationType?: string | null;
  locationZipCode?: string;
  name?: string;
  numberOfVehiclesInvolved?: string | null;
  officerBadgeNumber?: string;
  officerName?: string;
  party1EmployeeRollover?: string | null;
  party2Type?: string | null;
  party3Type?: string | null;
  policeDeptName?: string;
  policeDeptPhone?: string;
  policeReport?: string | null;
  policeReportNumber?: string;
  populationDensity?: string | null;
  principalFault?: string | null;
  proNumber?: string;
  relationToJunction?: string | null;
  reportedCrashSeverity?: string | null;
  roadConditions?: string | null;
  roadTypeSeparation?: string | null;
  roadwayAlignment?: string | null;
  roadwayGrade?: string | null;
  severityWeight?: number | null;
  shortDescription?: string;
  speed?: string;
  status?: string | null;
  terminal?: number | null;
  thirdPartyDamageDescription?: string;
  time?: number | null;
  timeReported?: number | null;
  towed?: string | null;
  towingCount?: number | null;
  towingDetails?: string;
  trafficDensity?: string | null;
  travelDirection?: string | null;
  truckCrashRole?: string;
  truckCrashRoleCategory?: string | null;
  truckPreCrashMovement?: string | null;
  vehicleCriticalReason?: string | null;
  vehicleHasSignalDevice?: boolean;
  weatherConditions?: string | null;
  whoGotCitation?: string | null;
  whoGotInjured?: string | null;
  whoGotTowed?: string | null;
  workZone?: string | null;
}

export interface AccidentRelations {
  assets?: EquipmentModel[];
  claims?: ClaimModel[];
  correctiveAction?: CorrectiveActionModel | null;
  fmcsaBasicReport?: FmcsaBasicReportModel | null;
  primaryModel?: EmployeeModel | null;
  watchListReasons?: WatchListReasonModel | null;
  witnesses?: WitnessModel[];
}

export interface AccidentInputRelations {
  assets?: EquipmentInputModel[];
  claims?: ClaimInputModel[];
  correctiveAction?: CorrectiveActionInputModel | null;
  fmcsaBasicReport?: FmcsaBasicReportInputModel | null;
  primaryModel?: EmployeeInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
  witnesses?: WitnessInputModel[];
}

export interface AccidentComputations {
  assetsInvolved: any;
  claimsCount: any;
  csaScore: number | null;
  daysSince: number | null;
  fullAddress: any;
  hasClaim: boolean;
  preventable: boolean;
  tenureAtTimeOfEvent: number | null;
  timeSinceEnforcement: number | null;
  timeWeight: number | null;
  totalCost: number | null;
  totalIncurred: number | null;
  totalIncurredLegacy: number | null;
  totalReimbursements: number | null;
  totalRemainingReserves: number | null;
  totalReserves: number | null;
}

export type AccidentModel = Model<
  AccidentFields,
  AccidentRelations,
  AccidentComputations
>;

export type AccidentInputModel = InputModel<
  AccidentFields,
  AccidentInputRelations
>;

// Type definitions for /billOfLading / Bill of Lading Incident (bill_of_lading_violation)

export interface BillOfLadingViolationFields {
  consigneeAddress?: string;
  consigneeCity?: string;
  consigneeName?: string;
  consigneePhone?: string;
  consigneeState?: string;
  consigneeZipCode?: string;
  date: number;
  description?: string;
  discoveredVia: string;
  proNumber?: string;
  reason?: string | null;
  responsibility?: string | null;
  salesRepresentative?: string;
  shipperAddress?: string;
  shipperCity?: string;
  shipperName?: string;
  shipperPhone?: string;
  shipperState?: string;
  shipperZipCode?: string;
}

export interface BillOfLadingViolationRelations {
  correctiveAction?: CorrectiveActionModel | null;
  primaryModel?: EmployeeModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface BillOfLadingViolationInputRelations {
  correctiveAction?: CorrectiveActionInputModel | null;
  primaryModel?: EmployeeInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface BillOfLadingViolationComputations {}

export type BillOfLadingViolationModel = Model<
  BillOfLadingViolationFields,
  BillOfLadingViolationRelations,
  BillOfLadingViolationComputations
>;

export type BillOfLadingViolationInputModel = InputModel<
  BillOfLadingViolationFields,
  BillOfLadingViolationInputRelations
>;

// Type definitions for /default/awards / Award (award)

export interface AwardFields {
  awardName?: string;
  description?: string;
  positionsAvailableTo?: string[];
}

export interface AwardRelations {
  employee_awards?: EmployeeAwardModel[];
}

export interface AwardInputRelations {
  employee_awards?: EmployeeAwardInputModel[];
}

export interface AwardComputations {
  label: any;
}

export type AwardModel = Model<AwardFields, AwardRelations, AwardComputations>;

export type AwardInputModel = InputModel<AwardFields, AwardInputRelations>;

// Type definitions for /default/awards / Employee Award (employee_award)

export interface EmployeeAwardFields {
  awardLevel?: number | null;
  date?: number | null;
  dateFinalized?: number | null;
  notes?: string;
  status?: string | null;
}

export interface EmployeeAwardRelations {
  award?: AwardModel | null;
  primaryModel: EmployeeModel;
}

export interface EmployeeAwardInputRelations {
  award?: AwardInputModel | null;
  primaryModel: EmployeeInputModel;
}

export interface EmployeeAwardComputations {}

export type EmployeeAwardModel = Model<
  EmployeeAwardFields,
  EmployeeAwardRelations,
  EmployeeAwardComputations
>;

export type EmployeeAwardInputModel = InputModel<
  EmployeeAwardFields,
  EmployeeAwardInputRelations
>;

// Type definitions for /default/certifications / Certification (certification)

export interface CertificationFields {
  certificationCategory?: string | null;
  certificationName?: string;
  description?: string;
  expiresAfter?: string | null;
  positionsRequiredFor?: string[];
}

export interface CertificationRelations {}

export interface CertificationInputRelations {}

export interface CertificationComputations {
  label: any;
}

export type CertificationModel = Model<
  CertificationFields,
  CertificationRelations,
  CertificationComputations
>;

export type CertificationInputModel = InputModel<
  CertificationFields,
  CertificationInputRelations
>;

// Type definitions for /default/certifications / Employee Certification (employee_certification)

export interface EmployeeCertificationFields {
  approved?: string | null;
  certificationStatus?: string | null;
  dateDue?: number | null;
  dateFinalized?: number | null;
}

export interface EmployeeCertificationRelations {
  certification?: CertificationModel | null;
  primaryModel?: EmployeeModel | null;
  trainer?: EmployeeModel | null;
}

export interface EmployeeCertificationInputRelations {
  certification?: CertificationInputModel | null;
  primaryModel?: EmployeeInputModel | null;
  trainer?: EmployeeInputModel | null;
}

export interface EmployeeCertificationComputations {}

export type EmployeeCertificationModel = Model<
  EmployeeCertificationFields,
  EmployeeCertificationRelations,
  EmployeeCertificationComputations
>;

export type EmployeeCertificationInputModel = InputModel<
  EmployeeCertificationFields,
  EmployeeCertificationInputRelations
>;

// Type definitions for /default/drugTests / Test (employee_test)

export interface EmployeeTestFields {
  bacResult?: number | null;
  certifiedCardReturned?: number | null;
  certifiedLetterSent?: number | null;
  cost?: number | null;
  date?: number | null;
  dateDeducted?: number | null;
  datePaid?: number | null;
  detailsDescription?: string;
  dotOrNot?: string | null;
  drugFound?: string[];
  otherTestLocation?: string;
  paidBy?: string | null;
  resultsDescription?: string;
  splitSpecimen?: string | null;
  splitSpecimenTestRequested?: string | null;
  testLocation?: string | null;
  testReason?: string | null;
  testResult?: string | null;
  testType?: string[];
}

export interface EmployeeTestRelations {
  medicalCard?: MedicalCardModel | null;
  primaryModel?: EmployeeModel | null;
}

export interface EmployeeTestInputRelations {
  medicalCard?: MedicalCardInputModel | null;
  primaryModel?: EmployeeInputModel | null;
}

export interface EmployeeTestComputations {}

export type EmployeeTestModel = Model<
  EmployeeTestFields,
  EmployeeTestRelations,
  EmployeeTestComputations
>;

export type EmployeeTestInputModel = InputModel<
  EmployeeTestFields,
  EmployeeTestInputRelations
>;

// Type definitions for /default / Emergency Contact (emergency_contact)

export interface EmergencyContactFields {
  address?: string;
  city?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  relationship?: string;
  state?: string | null;
  zip?: string;
}

export interface EmergencyContactRelations {
  employee?: EmployeeModel | null;
}

export interface EmergencyContactInputRelations {
  employee?: EmployeeInputModel | null;
}

export interface EmergencyContactComputations {
  label: any;
}

export type EmergencyContactModel = Model<
  EmergencyContactFields,
  EmergencyContactRelations,
  EmergencyContactComputations
>;

export type EmergencyContactInputModel = InputModel<
  EmergencyContactFields,
  EmergencyContactInputRelations
>;

// Type definitions for /default/equipment / Equipment (equipment)

export interface EquipmentFields {
  amendDate?: number | null;
  apu?: string;
  assetNumber?: string;
  axleNumber?: string | null;
  axleSize?: string | null;
  backdoorStyle?: string | null;
  boxSize?: string | null;
  carbCompliant?: string | null;
  carbFilterAdded?: number | null;
  checkNumber?: string;
  clearanceHeight?: string | null;
  condition?: string | null;
  costCenter?: string | null;
  costPerDay?: number | null;
  costPerMile?: number | null;
  dateSold?: number | null;
  decaled?: string | null;
  decaledDetails?: string | null;
  deliveryDate?: number | null;
  description?: string;
  driveAxleWeight?: number | null;
  emptyWeight?: string;
  engineManufacturer?: string | null;
  engineModel?: string | null;
  equipmentCost?: number | null;
  equipmentDetails?: string;
  equipmentType?: string | null;
  equipmentUse?: string | null;
  executoryCosts?: number | null;
  fixedRate?: number | null;
  fixedRatePayEvery?: string | null;
  floorType?: string | null;
  fuelTankSize?: string | null;
  fuelTankType?: string | null;
  fuelType?: string | null;
  gps?: string | null;
  hasPintleHooks?: string | null;
  height?: string | null;
  highwayObservationNumber?: string;
  iftaYear?: string;
  inServiceDate?: number | null;
  interimUnit?: string | null;
  invoiceNumber?: string;
  jakeBrake?: string | null;
  leaseEnd?: number | null;
  leaseStart?: number | null;
  leaseType?: string | null;
  leasor?: string | null;
  leasorNumber?: string;
  leftsideDoor?: string | null;
  liftgate?: string | null;
  liftgateDeckLength?: string | null;
  liftgateDeckMaterial?: string | null;
  liftgateDeckWidth?: string | null;
  liftgateInstallDate?: number | null;
  liftgateManufacturer?: string | null;
  liftgateSerialNumber?: string;
  liftgateType?: string | null;
  liftgateWeightRestriction?: string | null;
  loadSecurement?: string | null;
  lockNumber?: string;
  manufacturer?: string | null;
  mileageRate?: number | null;
  mileageWhenSold?: string;
  model?: string | null;
  numberOfDoors?: string | null;
  numberOfPayments?: number | null;
  numberOfSecuritySeals?: string | null;
  originalDebt?: number | null;
  owner?: string | null;
  ownership?: string | null;
  plate?: string;
  prePass?: string;
  purchaseDate?: number | null;
  purchaseOrderLineNumber?: string;
  purchaseOrderNumber?: string;
  purchasePrice?: number | null;
  reasonForRental?: string | null;
  reasonForSale?: string | null;
  reasonForSalvage?: string | null;
  reeferEngineSerialNumber?: string;
  reeferModelNumber?: string;
  reeferSerialNumber?: string;
  reeferUnitModelNumber?: string;
  registrationNumber?: string;
  registrationRenewalDate?: number | null;
  rentalCost?: number | null;
  rentalDate?: number | null;
  rentalNumber?: string;
  returnDate?: number | null;
  rightsideDoor?: string | null;
  rollerbox?: string | null;
  rollerboxType?: string | null;
  rollerboxVendor?: string | null;
  safetyFeatures?: string[];
  salePrice?: number | null;
  salvageApplicationDate?: number | null;
  salvageTitleNumber?: string;
  scheduleNumber?: string;
  secondAssetNumber?: string;
  serviceLine?: string | null;
  speeds?: string | null;
  state?: string | null;
  status?: string | null;
  steerAxleWeight?: number | null;
  telematicsDeviceType?: string | null;
  telematicsDisplayType?: string | null;
  telematicsNumber?: string;
  telematicsPortability?: string | null;
  terms?: string;
  tireSize?: string | null;
  title?: string | null;
  titleReleasedDate?: number | null;
  titleSent?: string | null;
  trackingNumber?: string;
  tractorType?: string | null;
  tractorWeight?: number | null;
  trailerAxleWeight?: number | null;
  trailerCapacityWeight?: string | null;
  trailerInsideHeight?: string | null;
  trailerInsideWidth?: string | null;
  trailerLength?: string | null;
  trailerType?: string | null;
  trailerWeight?: number | null;
  transmissionManufacturer?: string | null;
  truckType?: string | null;
  unitNumber: string;
  vendor?: string | null;
  vin?: string;
  wasSalvaged?: string | null;
  year?: string;
}

export interface EquipmentRelations {
  accidents?: AccidentModel[];
  equipmentTollPasses?: EquipmentTollPassesModel[];
  maintenance?: MaintenanceModel[];
  mileages?: MileageModel[];
}

export interface EquipmentInputRelations {
  accidents?: AccidentInputModel[];
  equipmentTollPasses?: EquipmentTollPassesInputModel[];
  maintenance?: MaintenanceInputModel[];
  mileages?: MileageInputModel[];
}

export interface EquipmentComputations {
  fixedRatePerPeroid: any;
  label: any;
}

export type EquipmentModel = Model<
  EquipmentFields,
  EquipmentRelations,
  EquipmentComputations
>;

export type EquipmentInputModel = InputModel<
  EquipmentFields,
  EquipmentInputRelations
>;

// Type definitions for /default/equipment / Equipment Toll Passes (equipment_toll_passes)

export interface EquipmentTollPassesFields {
  tollPassType?: string | null;
  transponderNumber?: string;
}

export interface EquipmentTollPassesRelations {
  equipment?: EquipmentModel | null;
}

export interface EquipmentTollPassesInputRelations {
  equipment?: EquipmentInputModel | null;
}

export interface EquipmentTollPassesComputations {}

export type EquipmentTollPassesModel = Model<
  EquipmentTollPassesFields,
  EquipmentTollPassesRelations,
  EquipmentTollPassesComputations
>;

export type EquipmentTollPassesInputModel = InputModel<
  EquipmentTollPassesFields,
  EquipmentTollPassesInputRelations
>;

// Type definitions for /default/equipment / Maintenance (maintenance)

export interface MaintenanceFields {
  cost?: number | null;
  dateDue?: number | null;
  endDate?: number | null;
  maintenanceLocation?: string | null;
  maintenanceOther?: string;
  maintenanceReason?: string | null;
  maintenanceType?: string | null;
  startDate?: number | null;
}

export interface MaintenanceRelations {
  equipment?: EquipmentModel | null;
}

export interface MaintenanceInputRelations {
  equipment?: EquipmentInputModel | null;
}

export interface MaintenanceComputations {
  daysUntilDue: number | null;
}

export type MaintenanceModel = Model<
  MaintenanceFields,
  MaintenanceRelations,
  MaintenanceComputations
>;

export type MaintenanceInputModel = InputModel<
  MaintenanceFields,
  MaintenanceInputRelations
>;

// Type definitions for /default/equipment / Mileage (mileage)

export interface MileageFields {
  deliveryDate?: number | null;
  mileage?: string;
}

export interface MileageRelations {
  equipment?: EquipmentModel | null;
}

export interface MileageInputRelations {
  equipment?: EquipmentInputModel | null;
}

export interface MileageComputations {}

export type MileageModel = Model<
  MileageFields,
  MileageRelations,
  MileageComputations
>;

export type MileageInputModel = InputModel<
  MileageFields,
  MileageInputRelations
>;

// Type definitions for /default/events / Claim (claim)

export interface ClaimFields {
  address?: string;
  adjusterCompany?: string;
  adjusterFileNumber?: string;
  adjusterName?: string;
  adjusterPhoneNumber?: string;
  city?: string;
  claimStatus?: string | null;
  claimType?: string | null;
  closingDate?: number | null;
  companyName?: string;
  costCenter?: string | null;
  dateSubmittedToInsurance?: number | null;
  description?: string;
  fullName?: string;
  insuranceClaimNumber?: string;
  insuranceCompany?: string;
  internalClaimNumber?: string;
  legalCounselName?: string;
  legalCounselPhoneNumber?: string;
  legalLawFirm?: string;
  lossDate?: number | null;
  phone?: string;
  state?: string | null;
  submittedToInsurance?: string | null;
  vehicleColor?: string;
  vehicleLicense?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleState?: string | null;
  vehicleVinNumber?: string;
  vehicleYear?: string;
  zip?: string;
}

export interface ClaimRelations {
  costs?: CostModel[];
  incident?: (AccidentModel | InjuryIllnessModel) | null;
  primaryModel?: EmployeeModel | null;
  reimbursements?: ReimbursementModel[];
  reservesAndTotals?: ReservesAndTotalsModel[];
}

export interface ClaimInputRelations {
  costs?: CostInputModel[];
  incident?: (AccidentInputModel | InjuryIllnessInputModel) | null;
  primaryModel?: EmployeeInputModel | null;
  reimbursements?: ReimbursementInputModel[];
  reservesAndTotals?: ReservesAndTotalsInputModel[];
}

export interface ClaimComputations {
  bodilyInjuryPaid: number | null;
  bodilyInjuryRemaining: number | null;
  bodilyInjuryReserves: number | null;
  companyDamagePaid: number | null;
  companyDamageRemaining: number | null;
  companyDamageReserves: number | null;
  disposalExpensePaid: number | null;
  disposalExpenseRemaining: number | null;
  disposalExpenseReserves: number | null;
  generalExpensePaid: number | null;
  generalExpenseRemaining: number | null;
  generalExpenseReserves: number | null;
  incurredExpense: number | null;
  incurredLoss: number | null;
  indemnityExpensePaid: number | null;
  indemnityExpenseRemaining: number | null;
  indemnityExpenseReserves: number | null;
  litigationExpensePaid: number | null;
  litigationExpenseRemaining: number | null;
  litigationExpenseReserves: number | null;
  medicalExpensePaid: number | null;
  medicalExpenseRemaining: number | null;
  medicalExpenseReserves: number | null;
  propertyDamagePaid: number | null;
  propertyDamageRemaining: number | null;
  propertyDamageReserves: number | null;
  responseExpensePaid: number | null;
  responseExpenseRemaining: number | null;
  responseExpenseReserves: number | null;
  subrogationPaid: number | null;
  subrogationRemaining: number | null;
  subrogationReserves: number | null;
  totalPaid: number | null;
  totalReimbursements: number | null;
  totalRemaining: number | null;
  totalReserves: number | null;
}

export type ClaimModel = Model<ClaimFields, ClaimRelations, ClaimComputations>;

export type ClaimInputModel = InputModel<ClaimFields, ClaimInputRelations>;

// Type definitions for /default/events / Corrective Action (corrective_action)

export interface CorrectiveActionFields {
  correctiveActionType?: string | null;
  dateOfAction?: number | null;
  description?: string;
  disciplinaryAction?: string | null;
  legacy_preventability?: string | null;
  legacy_severity?: string | null;
  letterReturnDate?: number | null;
  letterType?: string | null;
  preventability?: string | null;
  preventable_2?: string | null;
  severity?: string | null;
  severity_2?: string | null;
}

export interface CorrectiveActionRelations {
  incident?:
    | (
        | AccidentModel
        | BillOfLadingViolationModel
        | ForkliftIncidentModel
        | InjuryIllnessModel
        | MaterialSpillModel
        | TelematicsAlertModel
        | CpapViolationModel
        | CustomerObservationModel
        | HighwayObservationModel
        | HoursOfServiceObservationModel
        | WorkplaceObservationModel
        | EnforcementModel
      )
    | null;
  primaryModel: EmployeeModel;
  reviewedBy?: EmployeeModel | null;
}

export interface CorrectiveActionInputRelations {
  incident?:
    | (
        | AccidentInputModel
        | BillOfLadingViolationInputModel
        | ForkliftIncidentInputModel
        | InjuryIllnessInputModel
        | MaterialSpillInputModel
        | TelematicsAlertInputModel
        | CpapViolationInputModel
        | CustomerObservationInputModel
        | HighwayObservationInputModel
        | HoursOfServiceObservationInputModel
        | WorkplaceObservationInputModel
        | EnforcementInputModel
      )
    | null;
  primaryModel: EmployeeInputModel;
  reviewedBy?: EmployeeInputModel | null;
}

export interface CorrectiveActionComputations {}

export type CorrectiveActionModel = Model<
  CorrectiveActionFields,
  CorrectiveActionRelations,
  CorrectiveActionComputations
>;

export type CorrectiveActionInputModel = InputModel<
  CorrectiveActionFields,
  CorrectiveActionInputRelations
>;

// Type definitions for /default/events / Cost (cost)

export interface CostFields {
  amount?: number | null;
  costCategory?: string | null;
  date?: number | null;
  description?: string;
  payee?: string;
}

export interface CostRelations {
  event?:
    | (
        | InjuryIllnessModel
        | ClaimModel
        | ForkliftIncidentModel
        | MaterialSpillModel
      )
    | null;
  reservesAndTotals?: ReservesAndTotalsModel | null;
}

export interface CostInputRelations {
  event?:
    | (
        | InjuryIllnessInputModel
        | ClaimInputModel
        | ForkliftIncidentInputModel
        | MaterialSpillInputModel
      )
    | null;
  reservesAndTotals?: ReservesAndTotalsInputModel | null;
}

export interface CostComputations {}

export type CostModel = Model<CostFields, CostRelations, CostComputations>;

export type CostInputModel = InputModel<CostFields, CostInputRelations>;

// Type definitions for /default/events / Improvement Plan Action (improvement_plan_action)

export interface ImprovementPlanActionFields {
  actualDate?: number | null;
  details?: string;
  expectedDate?: number | null;
  improvementPlanAction?: string | null;
}

export interface ImprovementPlanActionRelations {
  performanceImprovementPlan?: PerformanceImprovementPlanModel | null;
  primaryModel: EmployeeModel;
}

export interface ImprovementPlanActionInputRelations {
  performanceImprovementPlan?: PerformanceImprovementPlanInputModel | null;
  primaryModel: EmployeeInputModel;
}

export interface ImprovementPlanActionComputations {}

export type ImprovementPlanActionModel = Model<
  ImprovementPlanActionFields,
  ImprovementPlanActionRelations,
  ImprovementPlanActionComputations
>;

export type ImprovementPlanActionInputModel = InputModel<
  ImprovementPlanActionFields,
  ImprovementPlanActionInputRelations
>;

// Type definitions for /default/events / Performance Improvement Plan (performance_improvement_plan)

export interface PerformanceImprovementPlanFields {
  startDate?: number | null;
  status?: string | null;
}

export interface PerformanceImprovementPlanRelations {
  improvementPlanActions?: ImprovementPlanActionModel[];
  primaryModel: EmployeeModel;
}

export interface PerformanceImprovementPlanInputRelations {
  improvementPlanActions?: ImprovementPlanActionInputModel[];
  primaryModel: EmployeeInputModel;
}

export interface PerformanceImprovementPlanComputations {
  planActions: any;
}

export type PerformanceImprovementPlanModel = Model<
  PerformanceImprovementPlanFields,
  PerformanceImprovementPlanRelations,
  PerformanceImprovementPlanComputations
>;

export type PerformanceImprovementPlanInputModel = InputModel<
  PerformanceImprovementPlanFields,
  PerformanceImprovementPlanInputRelations
>;

// Type definitions for /default/events / Reimbursement (reimbursement)

export interface ReimbursementFields {
  amount?: number | null;
  costCategory?: string | null;
  date?: number | null;
  description?: string;
  payee?: string;
}

export interface ReimbursementRelations {
  event?: (InjuryIllnessModel | ClaimModel) | null;
  reservesAndTotals?: ReservesAndTotalsModel | null;
}

export interface ReimbursementInputRelations {
  event?: (InjuryIllnessInputModel | ClaimInputModel) | null;
  reservesAndTotals?: ReservesAndTotalsInputModel | null;
}

export interface ReimbursementComputations {}

export type ReimbursementModel = Model<
  ReimbursementFields,
  ReimbursementRelations,
  ReimbursementComputations
>;

export type ReimbursementInputModel = InputModel<
  ReimbursementFields,
  ReimbursementInputRelations
>;

// Type definitions for /default/events / Claim Reserves and Totals (reserves_and_totals)

export interface ReservesAndTotalsFields {
  costCategory?: string | null;
  reserves?: number | null;
}

export interface ReservesAndTotalsRelations {
  costIncident?:
    | (
        | ClaimModel
        | InjuryIllnessModel
        | MaterialSpillModel
        | ForkliftIncidentModel
      )
    | null;
  costs?: CostModel[];
  reimbursements?: ReimbursementModel[];
}

export interface ReservesAndTotalsInputRelations {
  costIncident?:
    | (
        | ClaimInputModel
        | InjuryIllnessInputModel
        | MaterialSpillInputModel
        | ForkliftIncidentInputModel
      )
    | null;
  costs?: CostInputModel[];
  reimbursements?: ReimbursementInputModel[];
}

export interface ReservesAndTotalsComputations {
  incurredExpense: number | null;
  paid: number | null;
  remaining: number | null;
  totalReimbursements: number | null;
}

export type ReservesAndTotalsModel = Model<
  ReservesAndTotalsFields,
  ReservesAndTotalsRelations,
  ReservesAndTotalsComputations
>;

export type ReservesAndTotalsInputModel = InputModel<
  ReservesAndTotalsFields,
  ReservesAndTotalsInputRelations
>;

// Type definitions for /default/events / Witness (witness)

export interface WitnessFields {
  address?: string;
  city?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  state?: string | null;
  statement?: string;
  zip?: string;
}

export interface WitnessRelations {
  incident?: (AccidentModel | InjuryIllnessModel) | null;
}

export interface WitnessInputRelations {
  incident?: (AccidentInputModel | InjuryIllnessInputModel) | null;
}

export interface WitnessComputations {
  label: any;
}

export type WitnessModel = Model<
  WitnessFields,
  WitnessRelations,
  WitnessComputations
>;

export type WitnessInputModel = InputModel<
  WitnessFields,
  WitnessInputRelations
>;

// Type definitions for /default/expirations / A-CDL (a_cdl)

export interface ACdlFields {
  canadaAdministrativeDistrict?: string | null;
  country?: string | null;
  current?: boolean;
  endorsements?: string[];
  expirationDate?: number | null;
  expirationTime?: string | null;
  interim?: boolean;
  issueDate?: number | null;
  licenseStatus?: string | null;
  number?: string;
  realId?: boolean;
  restrictions?: string[];
  state?: string | null;
}

export interface ACdlRelations {
  primaryModel?: EmployeeModel | null;
}

export interface ACdlInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface ACdlComputations {
  cleanNumber: any;
  expirationStatus: any;
  licenseType: any;
}

export type ACdlModel = Model<ACdlFields, ACdlRelations, ACdlComputations>;

export type ACdlInputModel = InputModel<ACdlFields, ACdlInputRelations>;

// Type definitions for /default/expirations / B-CDL (b_cdl)

export interface BCdlFields {
  canadaAdministrativeDistrict?: string | null;
  country?: string | null;
  current?: boolean;
  endorsements?: string[];
  expirationDate?: number | null;
  expirationTime?: string | null;
  interim?: boolean;
  issueDate?: number | null;
  licenseStatus?: string | null;
  number?: string;
  realId?: boolean;
  restrictions?: string[];
  state?: string | null;
}

export interface BCdlRelations {
  primaryModel?: EmployeeModel | null;
}

export interface BCdlInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface BCdlComputations {
  cleanNumber: any;
  expirationStatus: any;
  licenseType: any;
}

export type BCdlModel = Model<BCdlFields, BCdlRelations, BCdlComputations>;

export type BCdlInputModel = InputModel<BCdlFields, BCdlInputRelations>;

// Type definitions for /default/expirations / Certificate of Violation (certificate_of_violation)

export interface CertificateOfViolationFields {
  completedDate?: number | null;
  current?: boolean;
  description?: string;
  exempt?: string | null;
  expirationDate?: number | null;
}

export interface CertificateOfViolationRelations {
  primaryModel?: EmployeeModel | null;
}

export interface CertificateOfViolationInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface CertificateOfViolationComputations {
  expirationStatus: any;
}

export type CertificateOfViolationModel = Model<
  CertificateOfViolationFields,
  CertificateOfViolationRelations,
  CertificateOfViolationComputations
>;

export type CertificateOfViolationInputModel = InputModel<
  CertificateOfViolationFields,
  CertificateOfViolationInputRelations
>;

// Type definitions for /default/expirations / Employer Pull Notice (CA Only) (employer_pull_notice)

export interface EmployerPullNoticeFields {
  completedDate?: number | null;
  current?: boolean;
  description?: string;
  exempt?: string | null;
  expirationDate?: number | null;
}

export interface EmployerPullNoticeRelations {
  primaryModel?: EmployeeModel | null;
}

export interface EmployerPullNoticeInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface EmployerPullNoticeComputations {
  expirationStatus: any;
}

export type EmployerPullNoticeModel = Model<
  EmployerPullNoticeFields,
  EmployerPullNoticeRelations,
  EmployerPullNoticeComputations
>;

export type EmployerPullNoticeInputModel = InputModel<
  EmployerPullNoticeFields,
  EmployerPullNoticeInputRelations
>;

// Type definitions for /default/expirations / Employment Verification Form (employment_verification_form)

export interface EmploymentVerificationFormFields {
  eligibleForRehire?: string | null;
  equipmentOperated?: string;
  workPerformed?: string;
}

export interface EmploymentVerificationFormRelations {
  employmentVerificationFormRequest?: EmploymentVerificationFormRequestModel[];
  primaryModel?: EmployeeModel | null;
  tests?: EmployeeTestModel[];
}

export interface EmploymentVerificationFormInputRelations {
  employmentVerificationFormRequest?: EmploymentVerificationFormRequestInputModel[];
  primaryModel?: EmployeeInputModel | null;
  tests?: EmployeeTestInputModel[];
}

export interface EmploymentVerificationFormComputations {
  hasPositiveTest: boolean;
  hasRefusedTest: boolean;
  highBacResult: boolean;
  maxBacResult: any;
}

export type EmploymentVerificationFormModel = Model<
  EmploymentVerificationFormFields,
  EmploymentVerificationFormRelations,
  EmploymentVerificationFormComputations
>;

export type EmploymentVerificationFormInputModel = InputModel<
  EmploymentVerificationFormFields,
  EmploymentVerificationFormInputRelations
>;

// Type definitions for /default/expirations / Employment Verification Form Request (employment_verification_form_request)

export interface EmploymentVerificationFormRequestFields {
  dateRequested?: number | null;
  dateSent?: number | null;
  time?: number | null;
}

export interface EmploymentVerificationFormRequestRelations {
  employmentVerificationForm?: EmploymentVerificationFormModel | null;
}

export interface EmploymentVerificationFormRequestInputRelations {
  employmentVerificationForm?: EmploymentVerificationFormInputModel | null;
}

export interface EmploymentVerificationFormRequestComputations {}

export type EmploymentVerificationFormRequestModel = Model<
  EmploymentVerificationFormRequestFields,
  EmploymentVerificationFormRequestRelations,
  EmploymentVerificationFormRequestComputations
>;

export type EmploymentVerificationFormRequestInputModel = InputModel<
  EmploymentVerificationFormRequestFields,
  EmploymentVerificationFormRequestInputRelations
>;

// Type definitions for /default/expirations / Federal Background Check (federal_background_check)

export interface FederalBackgroundCheckFields {
  current?: boolean;
  description?: string;
  expirationDate?: number | null;
  issueDate?: number | null;
  passed?: string | null;
}

export interface FederalBackgroundCheckRelations {
  primaryModel?: EmployeeModel | null;
}

export interface FederalBackgroundCheckInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface FederalBackgroundCheckComputations {
  expirationStatus: any;
}

export type FederalBackgroundCheckModel = Model<
  FederalBackgroundCheckFields,
  FederalBackgroundCheckRelations,
  FederalBackgroundCheckComputations
>;

export type FederalBackgroundCheckInputModel = InputModel<
  FederalBackgroundCheckFields,
  FederalBackgroundCheckInputRelations
>;

// Type definitions for /default/expirations / Hazmat Endorsement (hazmat_endorsement)

export interface HazmatEndorsementFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
}

export interface HazmatEndorsementRelations {
  primaryModel?: EmployeeModel | null;
}

export interface HazmatEndorsementInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface HazmatEndorsementComputations {
  expirationStatus: any;
}

export type HazmatEndorsementModel = Model<
  HazmatEndorsementFields,
  HazmatEndorsementRelations,
  HazmatEndorsementComputations
>;

export type HazmatEndorsementInputModel = InputModel<
  HazmatEndorsementFields,
  HazmatEndorsementInputRelations
>;

// Type definitions for /default/expirations / Medical Card (medical_card)

export interface MedicalCardFields {
  current?: boolean;
  description?: string;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  selfCertDateCompleted?: number | null;
  selfCertificationCompleted?: string | null;
}

export interface MedicalCardRelations {
  physicalTest?: EmployeeTestModel | null;
  primaryModel?: EmployeeModel | null;
}

export interface MedicalCardInputRelations {
  physicalTest?: EmployeeTestInputModel | null;
  primaryModel?: EmployeeInputModel | null;
}

export interface MedicalCardComputations {
  expirationStatus: any;
}

export type MedicalCardModel = Model<
  MedicalCardFields,
  MedicalCardRelations,
  MedicalCardComputations
>;

export type MedicalCardInputModel = InputModel<
  MedicalCardFields,
  MedicalCardInputRelations
>;

// Type definitions for /default/expirations / Medical Waiver (medical_waiver)

export interface MedicalWaiverFields {
  current?: boolean;
  description?: string;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  medicalWaiverType?: string;
}

export interface MedicalWaiverRelations {
  primaryModel?: EmployeeModel | null;
}

export interface MedicalWaiverInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface MedicalWaiverComputations {
  expirationStatus: any;
}

export type MedicalWaiverModel = Model<
  MedicalWaiverFields,
  MedicalWaiverRelations,
  MedicalWaiverComputations
>;

export type MedicalWaiverInputModel = InputModel<
  MedicalWaiverFields,
  MedicalWaiverInputRelations
>;

// Type definitions for /default/expirations / Milk Receiver License (milk_receiver_license)

export interface MilkReceiverLicenseFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  receiverNumber?: string;
  state?: string | null;
}

export interface MilkReceiverLicenseRelations {
  primaryModel?: EmployeeModel | null;
}

export interface MilkReceiverLicenseInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface MilkReceiverLicenseComputations {
  expirationStatus: any;
}

export type MilkReceiverLicenseModel = Model<
  MilkReceiverLicenseFields,
  MilkReceiverLicenseRelations,
  MilkReceiverLicenseComputations
>;

export type MilkReceiverLicenseInputModel = InputModel<
  MilkReceiverLicenseFields,
  MilkReceiverLicenseInputRelations
>;

// Type definitions for /default/expirations / MVR (mvr)

export interface MvrFields {
  completedDate?: number | null;
  current?: boolean;
  description?: string;
  exempt?: string | null;
  expirationDate?: number | null;
}

export interface MvrRelations {
  primaryModel?: EmployeeModel | null;
}

export interface MvrInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface MvrComputations {
  expirationStatus: any;
}

export type MvrModel = Model<MvrFields, MvrRelations, MvrComputations>;

export type MvrInputModel = InputModel<MvrFields, MvrInputRelations>;

// Type definitions for /default/expirations / Non-CDL (non_cdl)

export interface NonCdlFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  interim?: boolean;
  issueDate?: number | null;
  number?: string;
  realId?: boolean;
  state?: string | null;
}

export interface NonCdlRelations {
  primaryModel?: EmployeeModel | null;
}

export interface NonCdlInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface NonCdlComputations {
  cleanNumber: any;
  expirationStatus: any;
  licenseType: any;
}

export type NonCdlModel = Model<
  NonCdlFields,
  NonCdlRelations,
  NonCdlComputations
>;

export type NonCdlInputModel = InputModel<NonCdlFields, NonCdlInputRelations>;

// Type definitions for /default/expirations / Passport (passport)

export interface PassportFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  number?: string;
}

export interface PassportRelations {
  primaryModel?: EmployeeModel | null;
}

export interface PassportInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface PassportComputations {
  cleanNumber: any;
  expirationStatus: any;
}

export type PassportModel = Model<
  PassportFields,
  PassportRelations,
  PassportComputations
>;

export type PassportInputModel = InputModel<
  PassportFields,
  PassportInputRelations
>;

// Type definitions for /default/expirations / Permit A-CDL (permit_a_cdl)

export interface PermitACdlFields {
  canadaAdministrativeDistrict?: string | null;
  country?: string | null;
  current?: boolean;
  endorsements?: string[];
  expirationDate?: number | null;
  expirationTime?: string | null;
  interim?: boolean;
  issueDate?: number | null;
  licenseStatus?: string | null;
  number?: string;
  realId?: boolean;
  restrictions?: string[];
  state?: string | null;
}

export interface PermitACdlRelations {
  primaryModel?: EmployeeModel | null;
}

export interface PermitACdlInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface PermitACdlComputations {
  cleanNumber: any;
  expirationStatus: any;
  licenseType: any;
}

export type PermitACdlModel = Model<
  PermitACdlFields,
  PermitACdlRelations,
  PermitACdlComputations
>;

export type PermitACdlInputModel = InputModel<
  PermitACdlFields,
  PermitACdlInputRelations
>;

// Type definitions for /default/expirations / Permit B-CDL (permit_b_cdl)

export interface PermitBCdlFields {
  canadaAdministrativeDistrict?: string | null;
  country?: string | null;
  current?: boolean;
  endorsements?: string[];
  expirationDate?: number | null;
  expirationTime?: string | null;
  interim?: boolean;
  issueDate?: number | null;
  licenseStatus?: string | null;
  number?: string;
  realId?: boolean;
  restrictions?: string[];
  state?: string | null;
}

export interface PermitBCdlRelations {
  primaryModel?: EmployeeModel | null;
}

export interface PermitBCdlInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface PermitBCdlComputations {
  cleanNumber: any;
  expirationStatus: any;
  licenseType: any;
}

export type PermitBCdlModel = Model<
  PermitBCdlFields,
  PermitBCdlRelations,
  PermitBCdlComputations
>;

export type PermitBCdlInputModel = InputModel<
  PermitBCdlFields,
  PermitBCdlInputRelations
>;

// Type definitions for /default/expirations / TSA (tsa)

export interface TsaFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  number?: string;
}

export interface TsaRelations {
  primaryModel?: EmployeeModel | null;
}

export interface TsaInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface TsaComputations {
  cleanNumber: any;
  expirationStatus: any;
}

export type TsaModel = Model<TsaFields, TsaRelations, TsaComputations>;

export type TsaInputModel = InputModel<TsaFields, TsaInputRelations>;

// Type definitions for /default/expirations / TWIC (twic)

export interface TwicFields {
  current?: boolean;
  expirationDate?: number | null;
  expirationTime?: string | null;
  issueDate?: number | null;
  number?: string;
}

export interface TwicRelations {
  primaryModel?: EmployeeModel | null;
}

export interface TwicInputRelations {
  primaryModel?: EmployeeInputModel | null;
}

export interface TwicComputations {
  cleanNumber: any;
  expirationStatus: any;
}

export type TwicModel = Model<TwicFields, TwicRelations, TwicComputations>;

export type TwicInputModel = InputModel<TwicFields, TwicInputRelations>;

// Type definitions for /default/fmcsaBasics / FMCSA BASIC Report (fmcsa_basic_report)

export interface FmcsaBasicReportFields {
  controlledSubstancePercentChange?: number | null;
  controlledSubstancePercentile?: number | null;
  controlledSubstancePercentileMessage?: string;
  crashIndicatorPercentChange?: number | null;
  crashIndicatorPercentile?: number | null;
  crashIndicatorPercentileMessage?: string;
  date?: number | null;
  driverFitnessPercentChange?: number | null;
  driverFitnessPercentile?: number | null;
  driverFitnessPercentileMessage?: string;
  hazardousMaterialPercentChange?: number | null;
  hazardousMaterialPercentile?: number | null;
  hazardousMaterialPercentileMessage?: string;
  hoursOfServicePercentChange?: number | null;
  hoursOfServicePercentile?: number | null;
  hoursOfServicePercentileMessage?: string;
  prevDate?: number | null;
  unsafeDrivingPercentChange?: number | null;
  unsafeDrivingPercentile?: number | null;
  unsafeDrivingPercentileMessage?: string;
  vehicleMaintenancePercentChange?: number | null;
  vehicleMaintenancePercentile?: number | null;
  vehicleMaintenancePercentileMessage?: string;
}

export interface FmcsaBasicReportRelations {
  accidents?: AccidentModel[];
  violations?: EnforcementViolationModel[];
}

export interface FmcsaBasicReportInputRelations {
  accidents?: AccidentInputModel[];
  violations?: EnforcementViolationInputModel[];
}

export interface FmcsaBasicReportComputations {}

export type FmcsaBasicReportModel = Model<
  FmcsaBasicReportFields,
  FmcsaBasicReportRelations,
  FmcsaBasicReportComputations
>;

export type FmcsaBasicReportInputModel = InputModel<
  FmcsaBasicReportFields,
  FmcsaBasicReportInputRelations
>;

// Type definitions for /default/probationaryData / Probationary Data (probationary_data)

export interface ProbationaryDataFields {
  actualEndDate?: number | null;
  expectedEndDate?: number | null;
  extended?: boolean;
  extensionReason?: string;
  startDate: number;
}

export interface ProbationaryDataRelations {
  primaryModel: EmployeeModel;
  reviewer?: EmployeeModel | null;
}

export interface ProbationaryDataInputRelations {
  primaryModel: EmployeeInputModel;
  reviewer?: EmployeeInputModel | null;
}

export interface ProbationaryDataComputations {}

export type ProbationaryDataModel = Model<
  ProbationaryDataFields,
  ProbationaryDataRelations,
  ProbationaryDataComputations
>;

export type ProbationaryDataInputModel = InputModel<
  ProbationaryDataFields,
  ProbationaryDataInputRelations
>;

// Type definitions for /disciplines / Disciplinary Action (disciplinary_action)

export interface DisciplinaryActionFields {
  date?: number | null;
  disciplineReason?: string | null;
  disciplineType?: string | null;
  notes?: string;
  suspended?: string | null;
  suspensionEnd?: number | null;
  uid?: string;
}

export interface DisciplinaryActionRelations {
  primaryModel: EmployeeModel;
}

export interface DisciplinaryActionInputRelations {
  primaryModel: EmployeeInputModel;
}

export interface DisciplinaryActionComputations {}

export type DisciplinaryActionModel = Model<
  DisciplinaryActionFields,
  DisciplinaryActionRelations,
  DisciplinaryActionComputations
>;

export type DisciplinaryActionInputModel = InputModel<
  DisciplinaryActionFields,
  DisciplinaryActionInputRelations
>;

// Type definitions for /dot / DOT Unit (dot_unit)

export interface DotUnitFields {
  contractedDate?: number | null;
  dotName?: string;
  dotNumber?: string;
  nextRenewalDate?: number | null;
  numberOfDrivers?: number | null;
  registeredState?: string | null;
  status?: string | null;
  type?: string | null;
}

export interface DotUnitRelations {
  watchList?: DotWatchListModel | null;
}

export interface DotUnitInputRelations {
  watchList?: DotWatchListInputModel | null;
}

export interface DotUnitComputations {
  activeDriverCount: any;
  inactiveDriverCount: any;
}

export type DotUnitModel = Model<
  DotUnitFields,
  DotUnitRelations,
  DotUnitComputations
>;

export type DotUnitInputModel = InputModel<
  DotUnitFields,
  DotUnitInputRelations
>;

// Type definitions for /dot / DOT Watch List (dot_watch_list)

export interface DotWatchListFields {
  baselineScore?: number | null;
  currentScore?: number | null;
  date?: number | null;
  percentile?: number | null;
  riskScoreBucket?: number | null;
  score30DaysAgo?: number | null;
  scorePercent?: number | null;
  scorePercentChangeInLast30Days?: number | null;
  scores?: (number | null)[];
}

export interface DotWatchListRelations {
  dotUnit?: DotUnitModel | null;
  watchListReasons?: DotWatchListReasonModel[];
}

export interface DotWatchListInputRelations {
  dotUnit?: DotUnitInputModel | null;
  watchListReasons?: DotWatchListReasonInputModel[];
}

export interface DotWatchListComputations {}

export type DotWatchListModel = Model<
  DotWatchListFields,
  DotWatchListRelations,
  DotWatchListComputations
>;

export type DotWatchListInputModel = InputModel<
  DotWatchListFields,
  DotWatchListInputRelations
>;

// Type definitions for /dot / DOT Watch List Reason (dot_watch_list_reason)

export interface DotWatchListReasonFields {
  actions?: string;
  correctiveActions?: string;
  dateRange?: number | null;
  eventsCount?: number | null;
  maxActual?: number | null;
  name?: string;
  outsideSource?: string;
  score?: number | null;
  templateName?: string;
  timeframe?: string;
  totalEventCount?: number | null;
  type?: string;
}

export interface DotWatchListReasonRelations {
  event?: (
    | AccidentModel
    | BillOfLadingViolationModel
    | EnforcementModel
    | TelematicsAlertModel
    | InjuryIllnessModel
    | ForkliftIncidentModel
    | MaterialSpillModel
    | HoursOfServiceObservationModel
    | CpapViolationModel
    | HighwayObservationModel
    | CustomerObservationModel
    | WorkplaceObservationModel
  )[];
  watchList?: DotWatchListModel | null;
}

export interface DotWatchListReasonInputRelations {
  event?: (
    | AccidentInputModel
    | BillOfLadingViolationInputModel
    | EnforcementInputModel
    | TelematicsAlertInputModel
    | InjuryIllnessInputModel
    | ForkliftIncidentInputModel
    | MaterialSpillInputModel
    | HoursOfServiceObservationInputModel
    | CpapViolationInputModel
    | HighwayObservationInputModel
    | CustomerObservationInputModel
    | WorkplaceObservationInputModel
  )[];
  watchList?: DotWatchListInputModel | null;
}

export interface DotWatchListReasonComputations {}

export type DotWatchListReasonModel = Model<
  DotWatchListReasonFields,
  DotWatchListReasonRelations,
  DotWatchListReasonComputations
>;

export type DotWatchListReasonInputModel = InputModel<
  DotWatchListReasonFields,
  DotWatchListReasonInputRelations
>;

// Type definitions for /editableEmployees / Employee (employee)

export interface EmployeeFields {
  associatedDivision?: string;
  associatedRegion?: string;
  associatedTerminal?: string;
  awardDate?: number | null;
  awardExonerated?: boolean;
  awardLevel?: number | null;
  birthDate?: number | null;
  city?: string;
  companyPhoneNumber?: string;
  costCenter?: string | null;
  county?: string;
  effectiveDate?: number | null;
  eligibleForRehire?: string | null;
  email?: string;
  employeeNumber: string;
  employeePay?: number | null;
  employeeType?: string | null;
  firstName: string;
  fullOrPartTime?: string | null;
  gender?: string | null;
  hireDate?: number | null;
  hrIntegrationId?: string;
  lastName: string;
  maritalStatus?: string | null;
  middleName?: string;
  miscellaneousAttributes?: string[];
  numberOfDependents?: string;
  phoneNumber?: string;
  position?: string | null;
  receivedConfidentialFileOn?: number | null;
  receivedDQFileOn?: number | null;
  requiresDrugTest?: string | null;
  socialSecurityNumber?: string;
  state?: string | null;
  status?: string | null;
  streetAddress?: string;
  streetAddress2?: string;
  terminationDate?: number | null;
  terminationReason?: string;
  uid?: string;
  zip?: string;
}

export interface EmployeeRelations {
  accidents?: AccidentModel[];
  asset?: EquipmentModel | null;
  awards?: EmployeeAwardModel[];
  billOfLadingViolations?: BillOfLadingViolationModel[];
  certifications?: EmployeeCertificationModel[];
  claimIncidents?: ClaimModel[];
  classes?: TrainingAttendanceModel[];
  classesTrained?: TrainingClassModel[];
  correctiveActions?: CorrectiveActionModel[];
  cpapViolationReviews?: CpapViolationModel[];
  cpapViolations?: CpapViolationModel[];
  currentCdl?:
    | (ACdlModel | BCdlModel | NonCdlModel | PermitACdlModel | PermitBCdlModel)
    | null;
  customerObservations?: CustomerObservationModel[];
  disciplinaryActions?: DisciplinaryActionModel[];
  documentsWithExpirations?: (
    | ACdlModel
    | BCdlModel
    | NonCdlModel
    | HazmatEndorsementModel
    | MedicalWaiverModel
    | PassportModel
    | TsaModel
    | TwicModel
    | MedicalCardModel
    | PermitACdlModel
    | PermitBCdlModel
    | MvrModel
    | CertificateOfViolationModel
    | FederalBackgroundCheckModel
    | EmployerPullNoticeModel
    | EmploymentVerificationFormModel
    | MilkReceiverLicenseModel
  )[];
  emergencyContacts?: EmergencyContactModel[];
  employmentStatusHistory?: EmploymentStatusHistoryModel[];
  enforcements?: EnforcementModel[];
  forkliftIncidents?: ForkliftIncidentModel[];
  highwayObservations?: HighwayObservationModel[];
  hoursOfServiceObservations?: HoursOfServiceObservationModel[];
  improvementPlanTaskTemplatesAssigned?: ImprovementPlanTaskTemplateModel[];
  improvementPlanTasks?: ImprovementPlanTaskModel[];
  improvementPlanTasksAssigned?: ImprovementPlanTaskModel[];
  improvementPlanWeeks?: ImprovementPlanWeekModel[];
  improvementPlans?: ImprovementPlanModel[];
  improvementPlansActions?: ImprovementPlanActionModel[];
  injuriesIllnesses?: InjuryIllnessModel[];
  inspections?: InspectionModel[];
  materialSpills?: MaterialSpillModel[];
  performanceImprovementPlans?: PerformanceImprovementPlanModel[];
  probationaryData?: ProbationaryDataModel[];
  sleepApnea?: SleepApneaModel[];
  supervisor?: EmployeeModel | null;
  telematicsAlerts?: TelematicsAlertModel[];
  tests?: EmployeeTestModel[];
  watchList?: EmployeeWatchListModel | null;
  workplaceObservations?: WorkplaceObservationModel[];
}

export interface EmployeeInputRelations {
  accidents?: AccidentInputModel[];
  asset?: EquipmentInputModel | null;
  awards?: EmployeeAwardInputModel[];
  billOfLadingViolations?: BillOfLadingViolationInputModel[];
  certifications?: EmployeeCertificationInputModel[];
  claimIncidents?: ClaimInputModel[];
  classes?: TrainingAttendanceInputModel[];
  classesTrained?: TrainingClassInputModel[];
  correctiveActions?: CorrectiveActionInputModel[];
  cpapViolationReviews?: CpapViolationInputModel[];
  cpapViolations?: CpapViolationInputModel[];
  currentCdl?:
    | (
        | ACdlInputModel
        | BCdlInputModel
        | NonCdlInputModel
        | PermitACdlInputModel
        | PermitBCdlInputModel
      )
    | null;
  customerObservations?: CustomerObservationInputModel[];
  disciplinaryActions?: DisciplinaryActionInputModel[];
  documentsWithExpirations?: (
    | ACdlInputModel
    | BCdlInputModel
    | NonCdlInputModel
    | HazmatEndorsementInputModel
    | MedicalWaiverInputModel
    | PassportInputModel
    | TsaInputModel
    | TwicInputModel
    | MedicalCardInputModel
    | PermitACdlInputModel
    | PermitBCdlInputModel
    | MvrInputModel
    | CertificateOfViolationInputModel
    | FederalBackgroundCheckInputModel
    | EmployerPullNoticeInputModel
    | EmploymentVerificationFormInputModel
    | MilkReceiverLicenseInputModel
  )[];
  emergencyContacts?: EmergencyContactInputModel[];
  employmentStatusHistory?: EmploymentStatusHistoryInputModel[];
  enforcements?: EnforcementInputModel[];
  forkliftIncidents?: ForkliftIncidentInputModel[];
  highwayObservations?: HighwayObservationInputModel[];
  hoursOfServiceObservations?: HoursOfServiceObservationInputModel[];
  improvementPlanTaskTemplatesAssigned?: ImprovementPlanTaskTemplateInputModel[];
  improvementPlanTasks?: ImprovementPlanTaskInputModel[];
  improvementPlanTasksAssigned?: ImprovementPlanTaskInputModel[];
  improvementPlanWeeks?: ImprovementPlanWeekInputModel[];
  improvementPlans?: ImprovementPlanInputModel[];
  improvementPlansActions?: ImprovementPlanActionInputModel[];
  injuriesIllnesses?: InjuryIllnessInputModel[];
  inspections?: InspectionInputModel[];
  materialSpills?: MaterialSpillInputModel[];
  performanceImprovementPlans?: PerformanceImprovementPlanInputModel[];
  probationaryData?: ProbationaryDataInputModel[];
  sleepApnea?: SleepApneaInputModel[];
  supervisor?: EmployeeInputModel | null;
  telematicsAlerts?: TelematicsAlertInputModel[];
  tests?: EmployeeTestInputModel[];
  watchList?: EmployeeWatchListInputModel | null;
  workplaceObservations?: WorkplaceObservationInputModel[];
}

export interface EmployeeComputations {
  age: number | null;
  anniversaryLetterContent: any;
  birthdayLetterContent: any;
  csaScore: number | null;
  currentCdlId: any;
  currentScore: number | null;
  dateOfLastAccident: number | null;
  dateOfLastBillOfLadingViolation: number | null;
  dateOfLastCPAPViolation: number | null;
  dateOfLastCustomerObservation: number | null;
  dateOfLastEnforcement: number | null;
  dateOfLastForkliftIncident: number | null;
  dateOfLastHighwayObservation: number | null;
  dateOfLastHoursOfServiceObservation: number | null;
  dateOfLastInjuryIllness: number | null;
  dateOfLastMaterialSpill: number | null;
  dateOfLastTelematicsAlert: number | null;
  dateOfLastWorkplaceObservation: number | null;
  daysSinceAccident: number | null;
  daysSinceBillOfLadingViolation: number | null;
  daysSinceCPAPViolation: number | null;
  daysSinceCustomerObservation: number | null;
  daysSinceEnforcement: number | null;
  daysSinceForkliftIncident: number | null;
  daysSinceHighwayObservation: number | null;
  daysSinceHoursOfServiceObservation: number | null;
  daysSinceInjuryIllness: number | null;
  daysSinceMaterialSpill: number | null;
  daysSinceStart: number | null;
  daysSinceTelematicsAlert: number | null;
  daysSinceWorkplaceObservation: number | null;
  dropdownLabel: any;
  employmentDates: any;
  fullAddress: any;
  fullName: any;
  hasClearingHouseCdl: any;
  hasCriminalInvestigationAuthorization: any;
  hasPhysicalExam: any;
  hasPreEmploymentDrugTest: any;
  hasWorkersCompAuthorization: any;
  label: string;
  lastCompletedPDP: any;
  mostRecentPip: number | null;
  numberOfAccidents: any;
  onPlan: any;
  positionLabel: any;
  scorable: any;
  serviceYears: number | null;
  serviceYearsYear: any;
  totalChecklistItemsNotCompleted: any;
  watchListPlanStatus: any;
}

export type EmployeeModel = Model<
  EmployeeFields,
  EmployeeRelations,
  EmployeeComputations
>;

export type EmployeeInputModel = InputModel<
  EmployeeFields,
  EmployeeInputRelations
>;

// Type definitions for /employmentStatusHistory / Employment Status History (employment_status_history)

export interface EmploymentStatusHistoryFields {
  anticipatedEndDate?: number | null;
  employmentStatus: string;
  endDate?: number | null;
  fmla?: string | null;
  leaveReason?: string | null;
  statusStartDate: number;
}

export interface EmploymentStatusHistoryRelations {
  primaryModel: EmployeeModel;
}

export interface EmploymentStatusHistoryInputRelations {
  primaryModel: EmployeeInputModel;
}

export interface EmploymentStatusHistoryComputations {
  statusLength: number | null;
}

export type EmploymentStatusHistoryModel = Model<
  EmploymentStatusHistoryFields,
  EmploymentStatusHistoryRelations,
  EmploymentStatusHistoryComputations
>;

export type EmploymentStatusHistoryInputModel = InputModel<
  EmploymentStatusHistoryFields,
  EmploymentStatusHistoryInputRelations
>;

// Type definitions for /enforcements / Enforcement Citation (enforcement_citation)

export interface EnforcementCitationFields {
  appealed?: string | null;
  changed?: string | null;
  citationNo?: string;
  datePaid?: number | null;
  details?: string;
  finalSpeedOver?: string | null;
  finalType?: string | null;
  fine?: number | null;
  initialType?: string | null;
  paidBy?: string | null;
  speedOver?: string | null;
}

export interface EnforcementCitationRelations {
  enforcement?: EnforcementModel | null;
}

export interface EnforcementCitationInputRelations {
  enforcement?: EnforcementInputModel | null;
}

export interface EnforcementCitationComputations {
  date: number | null;
  label: any;
  unitNo: any;
}

export type EnforcementCitationModel = Model<
  EnforcementCitationFields,
  EnforcementCitationRelations,
  EnforcementCitationComputations
>;

export type EnforcementCitationInputModel = InputModel<
  EnforcementCitationFields,
  EnforcementCitationInputRelations
>;

// Type definitions for /enforcements / Enforcement (enforcement)

export interface EnforcementFields {
  citationAppealDate?: number | null;
  citationAppealStatus?: string | null;
  convictionDate?: number | null;
  county?: string;
  date: number;
  endTime?: number | null;
  generalArea?: string | null;
  generalPad?: string | null;
  locationType?: string | null;
  otherLocationType?: string;
  performedBy?: string | null;
  proNumber?: string;
  scaleHouse?: string | null;
  source?: string | null;
  startTime?: number | null;
  state?: string | null;
  storeId?: string;
  terminal?: number | null;
  vehicleType?: string | null;
}

export interface EnforcementRelations {
  assets?: EnforcementAssetModel[];
  coDriver?: EmployeeModel | null;
  correctiveAction?: CorrectiveActionModel | null;
  enforcementCitations?: EnforcementCitationModel[];
  enforcementViolations?: EnforcementViolationModel[];
  inspection?: InspectionModel | null;
  primaryModel?: EmployeeModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface EnforcementInputRelations {
  assets?: EnforcementAssetInputModel[];
  coDriver?: EmployeeInputModel | null;
  correctiveAction?: CorrectiveActionInputModel | null;
  enforcementCitations?: EnforcementCitationInputModel[];
  enforcementViolations?: EnforcementViolationInputModel[];
  inspection?: InspectionInputModel | null;
  primaryModel?: EmployeeInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface EnforcementComputations {
  assetsInvolved: any;
  citationCount: number | null;
  csaScore: number | null;
  hasCitationOrViolation: boolean;
  hasInspection: boolean;
  hasOutOfService: boolean;
  inspectionReportNumber: any;
  severityWeight: number | null;
  timeSinceEnforcement: number | null;
  timeWeight: number | null;
  totalTime: number | null;
  violationCount: number | null;
}

export type EnforcementModel = Model<
  EnforcementFields,
  EnforcementRelations,
  EnforcementComputations
>;

export type EnforcementInputModel = InputModel<
  EnforcementFields,
  EnforcementInputRelations
>;

// Type definitions for /enforcements / Enforcement Asset (enforcement_asset)

export interface EnforcementAssetFields {
  unitNo?: string | null;
}

export interface EnforcementAssetRelations {
  asset?: EquipmentModel | null;
  enforcement?: EnforcementModel | null;
}

export interface EnforcementAssetInputRelations {
  asset?: EquipmentInputModel | null;
  enforcement?: EnforcementInputModel | null;
}

export interface EnforcementAssetComputations {
  assetLabel: any;
}

export type EnforcementAssetModel = Model<
  EnforcementAssetFields,
  EnforcementAssetRelations,
  EnforcementAssetComputations
>;

export type EnforcementAssetInputModel = InputModel<
  EnforcementAssetFields,
  EnforcementAssetInputRelations
>;

// Type definitions for /enforcements / Roadside Inspection (inspection)

export interface InspectionFields {
  destination?: number | null;
  details?: string;
  hazmat?: string | null;
  inspectionLevel?: string | null;
  inspectionReportNo?: string;
  origin?: number | null;
  placards?: string | null;
  type?: string | null;
}

export interface InspectionRelations {
  enforcement?: EnforcementModel | null;
  primaryModel?: EmployeeModel | null;
}

export interface InspectionInputRelations {
  enforcement?: EnforcementInputModel | null;
  primaryModel?: EmployeeInputModel | null;
}

export interface InspectionComputations {
  date: number | null;
  hasCitationOrViolation: boolean;
}

export type InspectionModel = Model<
  InspectionFields,
  InspectionRelations,
  InspectionComputations
>;

export type InspectionInputModel = InputModel<
  InspectionFields,
  InspectionInputRelations
>;

// Type definitions for /enforcements / Enforcement Violation (enforcement_violation)

export interface EnforcementViolationFields {
  basicType?: string | null;
  datePaid?: number | null;
  details?: string;
  fine?: number | null;
  fixedAtSite?: string | null;
  outOfService?: string | null;
  paidBy?: string | null;
  reviewed?: boolean;
  sectionNo?: string | null;
  severityWeight?: number | null;
  source?: string | null;
  unitNo?: string | null;
}

export interface EnforcementViolationRelations {
  enforcement?: EnforcementModel | null;
  fmcsaBasicReport?: FmcsaBasicReportModel | null;
  primaryModel?: EmployeeModel | null;
}

export interface EnforcementViolationInputRelations {
  enforcement?: EnforcementInputModel | null;
  fmcsaBasicReport?: FmcsaBasicReportInputModel | null;
  primaryModel?: EmployeeInputModel | null;
}

export interface EnforcementViolationComputations {
  csaScore: number | null;
  date: number | null;
  label: any;
  timeWeight: number | null;
}

export type EnforcementViolationModel = Model<
  EnforcementViolationFields,
  EnforcementViolationRelations,
  EnforcementViolationComputations
>;

export type EnforcementViolationInputModel = InputModel<
  EnforcementViolationFields,
  EnforcementViolationInputRelations
>;

// Type definitions for /forklifts / Forklift Incident (forklift_incident)

export interface ForkliftIncidentFields {
  accidentType?: string | null;
  contributingFactors?: string[];
  date?: number | null;
  description?: string;
  status?: string | null;
  time?: number | null;
}

export interface ForkliftIncidentRelations {
  asset?: EquipmentModel | null;
  correctiveAction?: CorrectiveActionModel | null;
  costs?: CostModel[];
  primaryModel?: EmployeeModel | null;
  reservesAndTotals?: ReservesAndTotalsModel[];
  shiftSupervisor?: EmployeeModel | null;
  unit?: EquipmentModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface ForkliftIncidentInputRelations {
  asset?: EquipmentInputModel | null;
  correctiveAction?: CorrectiveActionInputModel | null;
  costs?: CostInputModel[];
  primaryModel?: EmployeeInputModel | null;
  reservesAndTotals?: ReservesAndTotalsInputModel[];
  shiftSupervisor?: EmployeeInputModel | null;
  unit?: EquipmentInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface ForkliftIncidentComputations {
  bodilyInjuryPaid: number | null;
  bodilyInjuryRemaining: number | null;
  bodilyInjuryReserves: number | null;
  companyDamagePaid: number | null;
  companyDamageRemaining: number | null;
  companyDamageReserves: number | null;
  disposalExpensePaid: number | null;
  disposalExpenseRemaining: number | null;
  disposalExpenseReserves: number | null;
  generalExpensePaid: number | null;
  generalExpenseRemaining: number | null;
  generalExpenseReserves: number | null;
  indemnityExpensePaid: number | null;
  indemnityExpenseRemaining: number | null;
  indemnityExpenseReserves: number | null;
  litigationExpensePaid: number | null;
  litigationExpenseRemaining: number | null;
  litigationExpenseReserves: number | null;
  medicalExpensePaid: number | null;
  medicalExpenseRemaining: number | null;
  medicalExpenseReserves: number | null;
  propertyDamagePaid: number | null;
  propertyDamageRemaining: number | null;
  propertyDamageReserves: number | null;
  responseExpensePaid: number | null;
  responseExpenseRemaining: number | null;
  responseExpenseReserves: number | null;
  subrogationPaid: number | null;
  subrogationRemaining: number | null;
  subrogationReserves: number | null;
  totalPaid: number | null;
  totalRemaining: number | null;
  totalReserves: number | null;
}

export type ForkliftIncidentModel = Model<
  ForkliftIncidentFields,
  ForkliftIncidentRelations,
  ForkliftIncidentComputations
>;

export type ForkliftIncidentInputModel = InputModel<
  ForkliftIncidentFields,
  ForkliftIncidentInputRelations
>;

// Type definitions for /fuelTanks / Fuel Tank (fuel_tank)

export interface FuelTankFields {
  capacity?: string;
  dateInstalled?: number | null;
  fuelTankStatus?: string | null;
  notes?: string;
  overfillProtection?: string;
  pipingConstruction?: string;
  pipingCorrosionProtection?: string;
  releaseDetection?: string;
  spillProtection?: string;
  state?: string | null;
  status?: string;
  tankConstruction?: string;
  tankCorrosionProtection?: string;
  tankName: string;
  tankType?: string | null;
}

export interface FuelTankRelations {}

export interface FuelTankInputRelations {}

export interface FuelTankComputations {
  dueComplianceTasksCount: any;
}

export type FuelTankModel = Model<
  FuelTankFields,
  FuelTankRelations,
  FuelTankComputations
>;

export type FuelTankInputModel = InputModel<
  FuelTankFields,
  FuelTankInputRelations
>;

// Type definitions for /improvementPlan / Professional Development Plan (improvement_plan)

export interface ImprovementPlanFields {
  acceptablePerformance?: string;
  category?: string | null;
  closedDate?: number | null;
  description?: string;
  name?: string;
  startDate: number;
  status?: string | null;
}

export interface ImprovementPlanRelations {
  improvementPlanTasks?: ImprovementPlanTaskModel[];
  improvementPlanTemplate: ImprovementPlanTemplateModel;
  improvementPlanWeeks?: ImprovementPlanWeekModel[];
  negativeEvents?: (
    | AccidentModel
    | BillOfLadingViolationModel
    | EnforcementModel
    | TelematicsAlertModel
    | InjuryIllnessModel
    | ForkliftIncidentModel
    | MaterialSpillModel
    | HoursOfServiceObservationModel
    | CpapViolationModel
    | HighwayObservationModel
    | CustomerObservationModel
    | WorkplaceObservationModel
  )[];
  primaryModel: EmployeeModel;
  progressUpdates?: ImprovementPlanProgressUpdateModel[];
  watchlistPositiveContributor?: WatchListPositiveContributorModel | null;
  watchlistReasons?: WatchListReasonModel[];
}

export interface ImprovementPlanInputRelations {
  improvementPlanTasks?: ImprovementPlanTaskInputModel[];
  improvementPlanTemplate: ImprovementPlanTemplateInputModel;
  improvementPlanWeeks?: ImprovementPlanWeekInputModel[];
  negativeEvents?: (
    | AccidentInputModel
    | BillOfLadingViolationInputModel
    | EnforcementInputModel
    | TelematicsAlertInputModel
    | InjuryIllnessInputModel
    | ForkliftIncidentInputModel
    | MaterialSpillInputModel
    | HoursOfServiceObservationInputModel
    | CpapViolationInputModel
    | HighwayObservationInputModel
    | CustomerObservationInputModel
    | WorkplaceObservationInputModel
  )[];
  primaryModel: EmployeeInputModel;
  progressUpdates?: ImprovementPlanProgressUpdateInputModel[];
  watchlistPositiveContributor?: WatchListPositiveContributorInputModel | null;
  watchlistReasons?: WatchListReasonInputModel[];
}

export interface ImprovementPlanComputations {
  associatedDivision: any;
  associatedRegion: any;
  associatedTerminal: any;
  numberOfOverdueTasks: number | null;
  numberOfOverdueThisWeek: number | null;
  planIsInProgress: boolean;
  planStatus: any;
  projectedEndDate: number | null;
  taskCompletionPercent: any;
  totalComplete: number | null;
  totalIncomplete: number | null;
}

export type ImprovementPlanModel = Model<
  ImprovementPlanFields,
  ImprovementPlanRelations,
  ImprovementPlanComputations
>;

export type ImprovementPlanInputModel = InputModel<
  ImprovementPlanFields,
  ImprovementPlanInputRelations
>;

// Type definitions for /improvementPlan / Development Plan Task (improvement_plan_task)

export interface ImprovementPlanTaskFields {
  acceptablePerformance?: string;
  assignTo?: string | null;
  category?: string | null;
  completed?: boolean;
  daysDueAfterPlanStart?: number | null;
  daysOfWeek?: string | null;
  description?: string;
  dueDate?: number | null;
  name?: string;
  positionAssignedTo?: string | null;
  reminders?: string | null;
  type?: string | null;
}

export interface ImprovementPlanTaskRelations {
  assignee?: EmployeeModel | null;
  improvementPlan?: ImprovementPlanModel | null;
  improvementPlanWeek?: ImprovementPlanWeekModel | null;
  primaryModel: EmployeeModel;
  progressUpdate?: ImprovementPlanProgressUpdateModel | null;
  talkingPoints?: TalkingPointModel[];
}

export interface ImprovementPlanTaskInputRelations {
  assignee?: EmployeeInputModel | null;
  improvementPlan?: ImprovementPlanInputModel | null;
  improvementPlanWeek?: ImprovementPlanWeekInputModel | null;
  primaryModel: EmployeeInputModel;
  progressUpdate?: ImprovementPlanProgressUpdateInputModel | null;
  talkingPoints?: TalkingPointInputModel[];
}

export interface ImprovementPlanTaskComputations {
  assignmentTarget: any;
  dueThisWeek: number | null;
  overdue: number | null;
  planClosed: boolean;
  talkingPointsDisplay: any;
  week: any;
}

export type ImprovementPlanTaskModel = Model<
  ImprovementPlanTaskFields,
  ImprovementPlanTaskRelations,
  ImprovementPlanTaskComputations
>;

export type ImprovementPlanTaskInputModel = InputModel<
  ImprovementPlanTaskFields,
  ImprovementPlanTaskInputRelations
>;

// Type definitions for /improvementPlan / Week (improvement_plan_week)

export interface ImprovementPlanWeekFields {
  name?: string;
  weekNum?: number | null;
}

export interface ImprovementPlanWeekRelations {
  improvementPlan?: ImprovementPlanModel | null;
  improvementPlanTasks?: ImprovementPlanTaskModel[];
  primaryModel: EmployeeModel;
}

export interface ImprovementPlanWeekInputRelations {
  improvementPlan?: ImprovementPlanInputModel | null;
  improvementPlanTasks?: ImprovementPlanTaskInputModel[];
  primaryModel: EmployeeInputModel;
}

export interface ImprovementPlanWeekComputations {
  completedTasks: number | null;
  numberOfTasks: number | null;
}

export type ImprovementPlanWeekModel = Model<
  ImprovementPlanWeekFields,
  ImprovementPlanWeekRelations,
  ImprovementPlanWeekComputations
>;

export type ImprovementPlanWeekInputModel = InputModel<
  ImprovementPlanWeekFields,
  ImprovementPlanWeekInputRelations
>;

// Type definitions for /improvementPlan / Progress Update (improvement_plan_progress_update)

export interface ImprovementPlanProgressUpdateFields {
  meetingDate: number;
  meetingDetails: string;
  touchBaseMeeting?: string;
}

export interface ImprovementPlanProgressUpdateRelations {
  improvementPlan?: ImprovementPlanModel | null;
  improvementPlanTask?: ImprovementPlanTaskModel | null;
  primaryModel?: EmployeeModel | null;
}

export interface ImprovementPlanProgressUpdateInputRelations {
  improvementPlan?: ImprovementPlanInputModel | null;
  improvementPlanTask?: ImprovementPlanTaskInputModel | null;
  primaryModel?: EmployeeInputModel | null;
}

export interface ImprovementPlanProgressUpdateComputations {}

export type ImprovementPlanProgressUpdateModel = Model<
  ImprovementPlanProgressUpdateFields,
  ImprovementPlanProgressUpdateRelations,
  ImprovementPlanProgressUpdateComputations
>;

export type ImprovementPlanProgressUpdateInputModel = InputModel<
  ImprovementPlanProgressUpdateFields,
  ImprovementPlanProgressUpdateInputRelations
>;

// Type definitions for /improvementPlan / Talking Point (talking_point)

export interface TalkingPointFields {
  description?: string;
  name: string;
  sortOrder?: number | null;
}

export interface TalkingPointRelations {
  improvementPlanTask?: ImprovementPlanTaskModel | null;
}

export interface TalkingPointInputRelations {
  improvementPlanTask?: ImprovementPlanTaskInputModel | null;
}

export interface TalkingPointComputations {}

export type TalkingPointModel = Model<
  TalkingPointFields,
  TalkingPointRelations,
  TalkingPointComputations
>;

export type TalkingPointInputModel = InputModel<
  TalkingPointFields,
  TalkingPointInputRelations
>;

// Type definitions for /improvementPlan/templates / Task Template (improvement_plan_task_template)

export interface ImprovementPlanTaskTemplateFields {
  assignTo?: string | null;
  daysDueAfterPlanStart: number;
  daysOfWeek?: string | null;
  description?: string;
  name?: string;
  positionAssignedTo?: string | null;
  reminders?: string | null;
  type?: string | null;
}

export interface ImprovementPlanTaskTemplateRelations {
  assignee?: EmployeeModel | null;
  improvementPlan?: ImprovementPlanTemplateModel | null;
  improvementPlanWeek?: ImprovementPlanWeekTemplateModel | null;
  talkingPoints?: TalkingPointTemplateModel[];
}

export interface ImprovementPlanTaskTemplateInputRelations {
  assignee?: EmployeeInputModel | null;
  improvementPlan?: ImprovementPlanTemplateInputModel | null;
  improvementPlanWeek?: ImprovementPlanWeekTemplateInputModel | null;
  talkingPoints?: TalkingPointTemplateInputModel[];
}

export interface ImprovementPlanTaskTemplateComputations {
  assignmentTarget: any;
}

export type ImprovementPlanTaskTemplateModel = Model<
  ImprovementPlanTaskTemplateFields,
  ImprovementPlanTaskTemplateRelations,
  ImprovementPlanTaskTemplateComputations
>;

export type ImprovementPlanTaskTemplateInputModel = InputModel<
  ImprovementPlanTaskTemplateFields,
  ImprovementPlanTaskTemplateInputRelations
>;

// Type definitions for /improvementPlan/templates / PDP Template (improvement_plan_template)

export interface ImprovementPlanTemplateFields {
  acceptablePerformance?: string;
  category?: string | null;
  description?: string;
  name?: string;
  status?: string | null;
}

export interface ImprovementPlanTemplateRelations {
  improvementPlanTasks?: ImprovementPlanTaskTemplateModel[];
  improvementPlanWeeks?: ImprovementPlanWeekTemplateModel[];
  talkingPoints?: TalkingPointTemplateModel[];
}

export interface ImprovementPlanTemplateInputRelations {
  improvementPlanTasks?: ImprovementPlanTaskTemplateInputModel[];
  improvementPlanWeeks?: ImprovementPlanWeekTemplateInputModel[];
  talkingPoints?: TalkingPointTemplateInputModel[];
}

export interface ImprovementPlanTemplateComputations {
  label: any;
}

export type ImprovementPlanTemplateModel = Model<
  ImprovementPlanTemplateFields,
  ImprovementPlanTemplateRelations,
  ImprovementPlanTemplateComputations
>;

export type ImprovementPlanTemplateInputModel = InputModel<
  ImprovementPlanTemplateFields,
  ImprovementPlanTemplateInputRelations
>;

// Type definitions for /improvementPlan/templates / Week Template (improvement_plan_week_template)

export interface ImprovementPlanWeekTemplateFields {
  weekNum?: number | null;
}

export interface ImprovementPlanWeekTemplateRelations {
  improvementPlan?: ImprovementPlanTemplateModel | null;
  improvementPlanTasks?: ImprovementPlanTaskTemplateModel[];
}

export interface ImprovementPlanWeekTemplateInputRelations {
  improvementPlan?: ImprovementPlanTemplateInputModel | null;
  improvementPlanTasks?: ImprovementPlanTaskTemplateInputModel[];
}

export interface ImprovementPlanWeekTemplateComputations {
  name: any;
}

export type ImprovementPlanWeekTemplateModel = Model<
  ImprovementPlanWeekTemplateFields,
  ImprovementPlanWeekTemplateRelations,
  ImprovementPlanWeekTemplateComputations
>;

export type ImprovementPlanWeekTemplateInputModel = InputModel<
  ImprovementPlanWeekTemplateFields,
  ImprovementPlanWeekTemplateInputRelations
>;

// Type definitions for /improvementPlan/templates / Talking Point Template (talking_point_template)

export interface TalkingPointTemplateFields {
  description?: string;
  name: string;
  sortOrder?: number | null;
}

export interface TalkingPointTemplateRelations {
  improvementPlan?: ImprovementPlanTemplateModel | null;
  improvementPlanTask?: ImprovementPlanTaskTemplateModel | null;
}

export interface TalkingPointTemplateInputRelations {
  improvementPlan?: ImprovementPlanTemplateInputModel | null;
  improvementPlanTask?: ImprovementPlanTaskTemplateInputModel | null;
}

export interface TalkingPointTemplateComputations {}

export type TalkingPointTemplateModel = Model<
  TalkingPointTemplateFields,
  TalkingPointTemplateRelations,
  TalkingPointTemplateComputations
>;

export type TalkingPointTemplateInputModel = InputModel<
  TalkingPointTemplateFields,
  TalkingPointTemplateInputRelations
>;

// Type definitions for /injuries / Injury (injury_illness)

export interface InjuryIllnessFields {
  autopsyPerformed?: string | null;
  averageWeeklyWage?: string;
  behavioralRelatedConditions?: string[];
  benefitState?: string | null;
  causeOfInjury?: string | null;
  claimNo?: string;
  claimStatus?: string | null;
  claimType?: string | null;
  closedDate?: number | null;
  commodityCausingInjury?: string;
  date: number;
  dateBeganWork?: number | null;
  dateInsuranceNotified?: number | null;
  dateOfMedicalTreatment?: number | null;
  dateReported?: number | null;
  dateSupervisorNotified?: number | null;
  deathDate?: number | null;
  deathTime?: number | null;
  descriptionOfInjuryIllness?: string;
  doctorOrProvider?: string;
  employeeTreatedInEr?: string | null;
  fatality?: string | null;
  generalArea?: string | null;
  generalPad?: string | null;
  hadPriorWorkersComp?: string | null;
  hasLitigation?: string | null;
  hospitalizedOvernight?: string | null;
  hourOnDuty?: string | null;
  hourlyWage?: string;
  ifYesThenExplain?: string;
  injuryTerminal: number;
  insuranceAdjuster?: string;
  insuranceAdjusterEmail?: string;
  insuranceCarrier?: string | null;
  insuranceCarrierPhoneNo?: string;
  insuranceRefNumber?: string;
  investigationAndPrevention?: string;
  lackOfSkills?: string[];
  locationAddress?: string;
  locationCity?: string;
  locationName?: string;
  locationPhone?: string;
  locationState?: string;
  locationType?: string | null;
  locationZipCode?: string;
  medicalFacility?: string | null;
  medicalFacilityPhoneNo?: string;
  occurredDueToMechanicalDefect?: string | null;
  oshaReportable?: string | null;
  packageType?: string | null;
  policyOrProceduresConditions?: string[];
  privacyCase?: string | null;
  privacyState?: string | null;
  proNumber?: string;
  rootCauseAndWhyInjuryOccurred?: string;
  safetyEquipmentUsed?: string | null;
  skidCount?: string;
  soughtMedicalAttention?: string | null;
  status?: string | null;
  storeId?: string;
  supervisorFollowUp?: string | null;
  temporaryTotalDisability?: string;
  terminal?: number | null;
  timeBeganWork?: number | null;
  timeOfInjury?: number | null;
  timeReported?: number | null;
  totalPieces?: string;
  totalWeight?: string;
  treatmentOptions?: string | null;
  unsafeActByInjuredEmployee?: string | null;
  unsafeActByOtherEmployee?: string | null;
  wasWearingProperPpe?: string | null;
  whatHappened?: string;
  whatHappenedAccordingToEmployee?: string;
  workEnvironmentConditions?: string[];
  workProcessOfEmployee?: string;
}

export interface InjuryIllnessRelations {
  claims?: ClaimModel[];
  correctiveAction?: CorrectiveActionModel | null;
  costs?: CostModel[];
  injuryIllnessCodes?: InjuryIllnessCodeModel[];
  injuryIllnessContacts?: InjuryIllnessContactModel[];
  lostRestrictedDays?: LostRestrictedDaysModel[];
  otherEmployee?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  reimbursements?: ReimbursementModel[];
  reservesAndTotals?: ReservesAndTotalsModel[];
  supervisorNotified?: EmployeeModel | null;
  watchListReasons?: WatchListReasonModel | null;
  witnesses?: WitnessModel[];
}

export interface InjuryIllnessInputRelations {
  claims?: ClaimInputModel[];
  correctiveAction?: CorrectiveActionInputModel | null;
  costs?: CostInputModel[];
  injuryIllnessCodes?: InjuryIllnessCodeInputModel[];
  injuryIllnessContacts?: InjuryIllnessContactInputModel[];
  lostRestrictedDays?: LostRestrictedDaysInputModel[];
  otherEmployee?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  reimbursements?: ReimbursementInputModel[];
  reservesAndTotals?: ReservesAndTotalsInputModel[];
  supervisorNotified?: EmployeeInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
  witnesses?: WitnessInputModel[];
}

export interface InjuryIllnessComputations {
  bodilyInjuryPaid: number | null;
  bodilyInjuryRemaining: number | null;
  bodilyInjuryReserves: number | null;
  companyDamagePaid: number | null;
  companyDamageRemaining: number | null;
  companyDamageReserves: number | null;
  daysSince: number | null;
  disposalExpensePaid: number | null;
  disposalExpenseRemaining: number | null;
  disposalExpenseReserves: number | null;
  generalExpensePaid: number | null;
  generalExpenseRemaining: number | null;
  generalExpenseReserves: number | null;
  hasDaysAwayFromWork: any;
  hasHearingLoss: any;
  hasInjury: any;
  hasJobTransferOrRestriction: any;
  hasOtherIllness: any;
  hasOtherRecordableCases: any;
  hasPoisoning: any;
  hasRespiratoryCondition: any;
  hasSkinDisorders: any;
  incurredExpense: number | null;
  indemnityExpensePaid: number | null;
  indemnityExpenseRemaining: number | null;
  indemnityExpenseReserves: number | null;
  ledToDeath: any;
  litigationExpensePaid: number | null;
  litigationExpenseRemaining: number | null;
  litigationExpenseReserves: number | null;
  medicalExpensePaid: number | null;
  medicalExpenseRemaining: number | null;
  medicalExpenseReserves: number | null;
  natureOfInjuryList: any;
  partsOfBody: any;
  propertyDamagePaid: number | null;
  propertyDamageRemaining: number | null;
  propertyDamageReserves: number | null;
  responseExpensePaid: number | null;
  responseExpenseRemaining: number | null;
  responseExpenseReserves: number | null;
  subrogationPaid: number | null;
  subrogationRemaining: number | null;
  subrogationReserves: number | null;
  totalDaysLost: number | null;
  totalDaysRestricted: number | null;
  totalPaid: number | null;
  totalReimbursements: number | null;
  totalRemaining: number | null;
  totalReserves: number | null;
}

export type InjuryIllnessModel = Model<
  InjuryIllnessFields,
  InjuryIllnessRelations,
  InjuryIllnessComputations
>;

export type InjuryIllnessInputModel = InputModel<
  InjuryIllnessFields,
  InjuryIllnessInputRelations
>;

// Type definitions for /injuries / Injury Code (injury_illness_code)

export interface InjuryIllnessCodeFields {
  natureOfInjury?: string | null;
  partOfBody?: string | null;
  sideOfBody?: string[];
}

export interface InjuryIllnessCodeRelations {
  injuryIllness?: InjuryIllnessModel | null;
}

export interface InjuryIllnessCodeInputRelations {
  injuryIllness?: InjuryIllnessInputModel | null;
}

export interface InjuryIllnessCodeComputations {
  description: any;
}

export type InjuryIllnessCodeModel = Model<
  InjuryIllnessCodeFields,
  InjuryIllnessCodeRelations,
  InjuryIllnessCodeComputations
>;

export type InjuryIllnessCodeInputModel = InputModel<
  InjuryIllnessCodeFields,
  InjuryIllnessCodeInputRelations
>;

// Type definitions for /injuries / Injury Contact (injury_illness_contact)

export interface InjuryIllnessContactFields {
  address?: string;
  city?: string;
  contactType?: string | null;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  organizationPhoneNo?: string;
  phoneNo?: string;
  state?: string;
  zipCode?: string;
}

export interface InjuryIllnessContactRelations {
  injuryIllness?: InjuryIllnessModel | null;
}

export interface InjuryIllnessContactInputRelations {
  injuryIllness?: InjuryIllnessInputModel | null;
}

export interface InjuryIllnessContactComputations {
  fullName: any;
}

export type InjuryIllnessContactModel = Model<
  InjuryIllnessContactFields,
  InjuryIllnessContactRelations,
  InjuryIllnessContactComputations
>;

export type InjuryIllnessContactInputModel = InputModel<
  InjuryIllnessContactFields,
  InjuryIllnessContactInputRelations
>;

// Type definitions for /injuries / Lost/Restricted Days (lost_restricted_days)

export interface LostRestrictedDaysFields {
  endDate?: number | null;
  lostOrRestricted?: string | null;
  startDate: number;
}

export interface LostRestrictedDaysRelations {
  injuryIllness?: InjuryIllnessModel | null;
}

export interface LostRestrictedDaysInputRelations {
  injuryIllness?: InjuryIllnessInputModel | null;
}

export interface LostRestrictedDaysComputations {
  totalDays: number | null;
}

export type LostRestrictedDaysModel = Model<
  LostRestrictedDaysFields,
  LostRestrictedDaysRelations,
  LostRestrictedDaysComputations
>;

export type LostRestrictedDaysInputModel = InputModel<
  LostRestrictedDaysFields,
  LostRestrictedDaysInputRelations
>;

// Type definitions for /materialSpills / Material Spill (material_spill)

export interface MaterialSpillFields {
  address?: string;
  causeOfSpill?: string | null;
  chemicalNameOfMaterial?: string;
  city?: string;
  consigneeAddress?: string;
  consigneeCity?: string;
  consigneeName?: string;
  consigneePhone?: string;
  consigneeState?: string;
  consigneeZipCode?: string;
  date?: number | null;
  deliveryStatus?: string | null;
  description?: string;
  dotTrackNumber?: string;
  hazardClass?: string | null;
  hazardId?: string;
  incidentLocation?: string | null;
  packageType?: string | null;
  packingGroup?: string | null;
  phone?: string;
  proNumber: string;
  properShippingName?: string;
  quantityReleased?: string;
  salesRepresentative?: string;
  shiftDiscovered?: string | null;
  shiftResponsible?: string | null;
  shipperAddress?: string;
  shipperCity?: string;
  shipperName?: string;
  shipperPhone?: string;
  shipperState?: string;
  shipperZipCode?: string;
  state?: string;
  status?: string | null;
  terminalDiscovered?: number | null;
  terminalResponsible?: number | null;
  time?: number | null;
  zipCode?: string;
}

export interface MaterialSpillRelations {
  correctiveAction?: CorrectiveActionModel | null;
  costs?: CostModel[];
  primaryModel?: EmployeeModel | null;
  reservesAndTotals?: ReservesAndTotalsModel[];
  unit?: EquipmentModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface MaterialSpillInputRelations {
  correctiveAction?: CorrectiveActionInputModel | null;
  costs?: CostInputModel[];
  primaryModel?: EmployeeInputModel | null;
  reservesAndTotals?: ReservesAndTotalsInputModel[];
  unit?: EquipmentInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface MaterialSpillComputations {
  bodilyInjuryPaid: number | null;
  bodilyInjuryRemaining: number | null;
  bodilyInjuryReserves: number | null;
  companyDamagePaid: number | null;
  companyDamageRemaining: number | null;
  companyDamageReserves: number | null;
  disposalExpensePaid: number | null;
  disposalExpenseRemaining: number | null;
  disposalExpenseReserves: number | null;
  generalExpensePaid: number | null;
  generalExpenseRemaining: number | null;
  generalExpenseReserves: number | null;
  indemnityExpensePaid: number | null;
  indemnityExpenseRemaining: number | null;
  indemnityExpenseReserves: number | null;
  litigationExpensePaid: number | null;
  litigationExpenseRemaining: number | null;
  litigationExpenseReserves: number | null;
  medicalExpensePaid: number | null;
  medicalExpenseRemaining: number | null;
  medicalExpenseReserves: number | null;
  propertyDamagePaid: number | null;
  propertyDamageRemaining: number | null;
  propertyDamageReserves: number | null;
  responseExpensePaid: number | null;
  responseExpenseRemaining: number | null;
  responseExpenseReserves: number | null;
  subrogationPaid: number | null;
  subrogationRemaining: number | null;
  subrogationReserves: number | null;
  totalPaid: number | null;
  totalRemaining: number | null;
  totalReserves: number | null;
}

export type MaterialSpillModel = Model<
  MaterialSpillFields,
  MaterialSpillRelations,
  MaterialSpillComputations
>;

export type MaterialSpillInputModel = InputModel<
  MaterialSpillFields,
  MaterialSpillInputRelations
>;

// Type definitions for /observations / Customer Observation (customer_observation)

export interface CustomerObservationFields {
  actions?: string[];
  consigneeAddress?: string;
  consigneeAreaNumber?: string;
  consigneeCity?: string;
  consigneeDeaNumber?: string;
  consigneeDistrictNumber?: string;
  consigneeName?: string;
  consigneePhone?: string;
  consigneeRegionNumber?: string;
  consigneeState?: string;
  consigneeZipCode?: string;
  date?: number | null;
  details?: string;
  generalArea?: string | null;
  generalPad?: string | null;
  locationType?: string | null;
  outsideSource?: string;
  proNumber?: string;
  terminal?: number | null;
  time?: number | null;
  type?: string | null;
}

export interface CustomerObservationRelations {
  assets?: EquipmentModel[];
  correctiveAction?: CorrectiveActionModel | null;
  performedBy?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  telematicsAlert?: TelematicsAlertModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface CustomerObservationInputRelations {
  assets?: EquipmentInputModel[];
  correctiveAction?: CorrectiveActionInputModel | null;
  performedBy?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  telematicsAlert?: TelematicsAlertInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface CustomerObservationComputations {}

export type CustomerObservationModel = Model<
  CustomerObservationFields,
  CustomerObservationRelations,
  CustomerObservationComputations
>;

export type CustomerObservationInputModel = InputModel<
  CustomerObservationFields,
  CustomerObservationInputRelations
>;

// Type definitions for /observations / Highway Observation (highway_observation)

export interface HighwayObservationFields {
  actions?: string[];
  date?: number | null;
  description?: string;
  details?: string;
  generalArea?: string | null;
  generalPad?: string | null;
  locationAddress?: string;
  locationAreaNumber?: string;
  locationCity?: string;
  locationDeaNumber?: string;
  locationDistrictNumber?: string;
  locationName?: string;
  locationPhone?: string;
  locationRegionNumber?: string;
  locationState?: string;
  locationType?: string | null;
  locationZipCode?: string;
  outsideSource?: string;
  proNumber?: string;
  state?: string | null;
  terminal?: number | null;
  time?: number | null;
  type?: string | null;
}

export interface HighwayObservationRelations {
  assets?: EquipmentModel[];
  correctiveAction?: CorrectiveActionModel | null;
  performedBy?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  telematicsAlert?: TelematicsAlertModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface HighwayObservationInputRelations {
  assets?: EquipmentInputModel[];
  correctiveAction?: CorrectiveActionInputModel | null;
  performedBy?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  telematicsAlert?: TelematicsAlertInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface HighwayObservationComputations {}

export type HighwayObservationModel = Model<
  HighwayObservationFields,
  HighwayObservationRelations,
  HighwayObservationComputations
>;

export type HighwayObservationInputModel = InputModel<
  HighwayObservationFields,
  HighwayObservationInputRelations
>;

// Type definitions for /observations / Hours Of Service Observation (hours_of_service_observation)

export interface HoursOfServiceObservationFields {
  date?: number | null;
  details?: string;
  outsideSource?: string;
  reason?: string[];
  time?: number | null;
  type?: string[];
}

export interface HoursOfServiceObservationRelations {
  correctiveAction?: CorrectiveActionModel | null;
  performedBy?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  watchListReasons?: WatchListReasonModel | null;
}

export interface HoursOfServiceObservationInputRelations {
  correctiveAction?: CorrectiveActionInputModel | null;
  performedBy?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface HoursOfServiceObservationComputations {}

export type HoursOfServiceObservationModel = Model<
  HoursOfServiceObservationFields,
  HoursOfServiceObservationRelations,
  HoursOfServiceObservationComputations
>;

export type HoursOfServiceObservationInputModel = InputModel<
  HoursOfServiceObservationFields,
  HoursOfServiceObservationInputRelations
>;

// Type definitions for /observations / Workplace Observation (workplace_observation)

export interface WorkplaceObservationFields {
  actions?: string[];
  consigneeAddress?: string;
  consigneeAreaNumber?: string;
  consigneeCity?: string;
  consigneeDeaNumber?: string;
  consigneeDistrictNumber?: string;
  consigneeName?: string;
  consigneePhone?: string;
  consigneeRegionNumber?: string;
  consigneeState?: string;
  consigneeZipCode?: string;
  date?: number | null;
  details?: string;
  generalArea?: string | null;
  generalPad?: string | null;
  hourOnDuty?: string | null;
  locationType?: string | null;
  outsideSource?: string;
  proNumber?: string;
  response?: string[];
  terminal?: number | null;
  time?: number | null;
  type?: string | null;
}

export interface WorkplaceObservationRelations {
  correctiveAction?: CorrectiveActionModel | null;
  performedBy?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  telematicsAlert?: TelematicsAlertModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface WorkplaceObservationInputRelations {
  correctiveAction?: CorrectiveActionInputModel | null;
  performedBy?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  telematicsAlert?: TelematicsAlertInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface WorkplaceObservationComputations {}

export type WorkplaceObservationModel = Model<
  WorkplaceObservationFields,
  WorkplaceObservationRelations,
  WorkplaceObservationComputations
>;

export type WorkplaceObservationInputModel = InputModel<
  WorkplaceObservationFields,
  WorkplaceObservationInputRelations
>;

// Type definitions for /permits / Alcohol Permit (alcohol_permit)

export interface AlcoholPermitFields {
  dateComplete: number;
  nextDueDate: number;
  notes?: string;
  permitId?: string;
  siteId?: string;
  state?: string | null;
  status?: string | null;
}

export interface AlcoholPermitRelations {}

export interface AlcoholPermitInputRelations {}

export interface AlcoholPermitComputations {}

export type AlcoholPermitModel = Model<
  AlcoholPermitFields,
  AlcoholPermitRelations,
  AlcoholPermitComputations
>;

export type AlcoholPermitInputModel = InputModel<
  AlcoholPermitFields,
  AlcoholPermitInputRelations
>;

// Type definitions for /permits / Hazmat Permit (hazmat_permit)

export interface HazmatPermitFields {
  dateIssued: number;
  nextDueDate: number;
  notes?: string;
  permitId?: string;
  permitName?: string;
  permitType: string;
  terminal?: number | null;
}

export interface HazmatPermitRelations {}

export interface HazmatPermitInputRelations {}

export interface HazmatPermitComputations {}

export type HazmatPermitModel = Model<
  HazmatPermitFields,
  HazmatPermitRelations,
  HazmatPermitComputations
>;

export type HazmatPermitInputModel = InputModel<
  HazmatPermitFields,
  HazmatPermitInputRelations
>;

// Type definitions for /permits / Stormwater Permit (stormwater_permit)

export interface StormwaterPermitFields {
  dateComplete: number;
  issuingState?: string | null;
  nextDueDate: number;
  notes?: string;
  permitId?: string;
  permitType: string;
  siteId?: string;
  status?: string | null;
  terminal?: number | null;
}

export interface StormwaterPermitRelations {}

export interface StormwaterPermitInputRelations {}

export interface StormwaterPermitComputations {}

export type StormwaterPermitModel = Model<
  StormwaterPermitFields,
  StormwaterPermitRelations,
  StormwaterPermitComputations
>;

export type StormwaterPermitInputModel = InputModel<
  StormwaterPermitFields,
  StormwaterPermitInputRelations
>;

// Type definitions for /sleepApnea / CPAP Machine Information (cpap_machine)

export interface CpapMachineFields {
  current?: string | null;
  deductionAmount?: number | null;
  hasPayrollDeduction?: string | null;
  hasWirelessMonitoring?: string | null;
  machineType: string;
  payrollDeductionSigned?: number | null;
  receiveDate: number;
  setupDate?: number | null;
  wirelessMonitoringIn?: string;
}

export interface CpapMachineRelations {
  primaryModel: EmployeeModel;
  sleepApnea: SleepApneaModel;
}

export interface CpapMachineInputRelations {
  primaryModel: EmployeeInputModel;
  sleepApnea: SleepApneaInputModel;
}

export interface CpapMachineComputations {}

export type CpapMachineModel = Model<
  CpapMachineFields,
  CpapMachineRelations,
  CpapMachineComputations
>;

export type CpapMachineInputModel = InputModel<
  CpapMachineFields,
  CpapMachineInputRelations
>;

// Type definitions for /sleepApnea / CPAP Violation (cpap_violation)

export interface CpapViolationFields {
  date?: number | null;
  details?: string;
  time?: number | null;
}

export interface CpapViolationRelations {
  correctiveAction?: CorrectiveActionModel | null;
  primaryModel: EmployeeModel;
  reviewer?: EmployeeModel | null;
  sleepApnea?: SleepApneaModel | null;
  watchListReasons?: WatchListReasonModel | null;
}

export interface CpapViolationInputRelations {
  correctiveAction?: CorrectiveActionInputModel | null;
  primaryModel: EmployeeInputModel;
  reviewer?: EmployeeInputModel | null;
  sleepApnea?: SleepApneaInputModel | null;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface CpapViolationComputations {}

export type CpapViolationModel = Model<
  CpapViolationFields,
  CpapViolationRelations,
  CpapViolationComputations
>;

export type CpapViolationInputModel = InputModel<
  CpapViolationFields,
  CpapViolationInputRelations
>;

// Type definitions for /sleepApnea / Sleep Apnea & CPAP (sleep_apnea)

export interface SleepApneaFields {
  dotMedicalExamDate?: number | null;
  dotMedicalExamResult?: string | null;
  sleepStudyDate?: number | null;
  sleepStudyResult?: string | null;
  sleepSurveyDate?: number | null;
  sleepSurveyResult?: string | null;
  status?: string | null;
  watchDate?: number | null;
  watchResult?: string | null;
}

export interface SleepApneaRelations {
  cpapMachine?: CpapMachineModel[];
  cpapViolations?: CpapViolationModel[];
  primaryModel: EmployeeModel;
}

export interface SleepApneaInputRelations {
  cpapMachine?: CpapMachineInputModel[];
  cpapViolations?: CpapViolationInputModel[];
  primaryModel: EmployeeInputModel;
}

export interface SleepApneaComputations {
  cpapViolationsCount: number | null;
  mostRecentViolationDate: number | null;
}

export type SleepApneaModel = Model<
  SleepApneaFields,
  SleepApneaRelations,
  SleepApneaComputations
>;

export type SleepApneaInputModel = InputModel<
  SleepApneaFields,
  SleepApneaInputRelations
>;

// Type definitions for /telematics / Telematics Alert (telematics_alert)

export interface TelematicsAlertFields {
  actions?: string[];
  actual?: number | null;
  date?: number | null;
  defensive?: boolean;
  details?: string;
  duration?: number | null;
  generalArea?: string | null;
  generalPad?: string | null;
  limit?: number | null;
  locationAddress?: string;
  locationAreaNumber?: string;
  locationCity?: string;
  locationDeaNumber?: string;
  locationDistrictNumber?: string;
  locationName?: string;
  locationPhone?: string;
  locationRegionNumber?: string;
  locationState?: string;
  locationType?: string | null;
  locationZipCode?: string;
  outsideSource?: string;
  proNumber?: string;
  severity?: string | null;
  terminal?: number | null;
  time?: number | null;
  type?: string | null;
  unitType?: string | null;
}

export interface TelematicsAlertRelations {
  assets?: EquipmentModel[];
  correctiveAction?: CorrectiveActionModel | null;
  observations?: (
    | HighwayObservationModel
    | CustomerObservationModel
    | WorkplaceObservationModel
  )[];
  performedBy?: EmployeeModel | null;
  primaryModel: EmployeeModel;
  watchListReasons?: WatchListReasonModel | null;
}

export interface TelematicsAlertInputRelations {
  assets?: EquipmentInputModel[];
  correctiveAction?: CorrectiveActionInputModel | null;
  observations?: (
    | HighwayObservationInputModel
    | CustomerObservationInputModel
    | WorkplaceObservationInputModel
  )[];
  performedBy?: EmployeeInputModel | null;
  primaryModel: EmployeeInputModel;
  watchListReasons?: WatchListReasonInputModel | null;
}

export interface TelematicsAlertComputations {
  amountOver: number | null;
}

export type TelematicsAlertModel = Model<
  TelematicsAlertFields,
  TelematicsAlertRelations,
  TelematicsAlertComputations
>;

export type TelematicsAlertInputModel = InputModel<
  TelematicsAlertFields,
  TelematicsAlertInputRelations
>;

// Type definitions for /training / Training Attendance (training_attendance)

export interface TrainingAttendanceFields {
  completedDate?: number | null;
  grade?: number | null;
  historicalGrade?: number | null;
  startDate?: number | null;
  status?: string | null;
}

export interface TrainingAttendanceRelations {
  employee?: EmployeeModel | null;
  trainingClass?: TrainingClassModel | null;
}

export interface TrainingAttendanceInputRelations {
  employee?: EmployeeInputModel | null;
  trainingClass?: TrainingClassInputModel | null;
}

export interface TrainingAttendanceComputations {
  expirationDate: number | null;
}

export type TrainingAttendanceModel = Model<
  TrainingAttendanceFields,
  TrainingAttendanceRelations,
  TrainingAttendanceComputations
>;

export type TrainingAttendanceInputModel = InputModel<
  TrainingAttendanceFields,
  TrainingAttendanceInputRelations
>;

// Type definitions for /training / Training Class (training_class)

export interface TrainingClassFields {
  assignedDate?: number | null;
  completed?: boolean;
  date?: number | null;
  description?: string;
  dueDate?: number | null;
  endTime?: number | null;
  expirationInterval?: number | null;
  expirationIntervalUnits?: string | null;
  isExpiring?: string | null;
  name?: string;
  startDate?: number | null;
  startTime?: number | null;
}

export interface TrainingClassRelations {
  attendees?: TrainingAttendanceModel[];
  trainer?: EmployeeModel | null;
  trainingCourse: TrainingCourseModel;
}

export interface TrainingClassInputRelations {
  attendees?: TrainingAttendanceInputModel[];
  trainer?: EmployeeInputModel | null;
  trainingCourse: TrainingCourseInputModel;
}

export interface TrainingClassComputations {
  courseDescription: any;
  courseName: any;
  expiresEvery: any;
  numberOfAttendees: any;
  numberOfExempt: any;
  numberOfFailed: any;
  numberOfPassed: any;
  trainerName: any;
}

export type TrainingClassModel = Model<
  TrainingClassFields,
  TrainingClassRelations,
  TrainingClassComputations
>;

export type TrainingClassInputModel = InputModel<
  TrainingClassFields,
  TrainingClassInputRelations
>;

// Type definitions for /training / Training Course (training_course)

export interface TrainingCourseFields {
  dayOffset?: number | null;
  description?: string;
  expirationInterval?: number | null;
  expirationIntervalUnits?: string | null;
  expirationPeriod?: string | null;
  expirationValue?: number | null;
  isExpiring?: string | null;
  name?: string;
  positionsRequired?: string[];
  source: string;
}

export interface TrainingCourseRelations {
  classes?: TrainingClassModel[];
}

export interface TrainingCourseInputRelations {
  classes?: TrainingClassInputModel[];
}

export interface TrainingCourseComputations {
  dropdownLabel: any;
  expiresEvery: any;
  label: any;
}

export type TrainingCourseModel = Model<
  TrainingCourseFields,
  TrainingCourseRelations,
  TrainingCourseComputations
>;

export type TrainingCourseInputModel = InputModel<
  TrainingCourseFields,
  TrainingCourseInputRelations
>;

// Type definitions for /watchlist / Employee Watch List (employee_watch_list)

export interface EmployeeWatchListFields {
  baselineScore?: number | null;
  date?: number | null;
  percentile?: number | null;
  score30DaysAgo?: number | null;
  scorePercentChangeInLast30Days?: number | null;
  scores?: (number | null)[];
}

export interface EmployeeWatchListRelations {
  positiveContributors?: WatchListPositiveContributorModel[];
  primaryModel?: EmployeeModel | null;
  watchListReasons?: WatchListReasonModel[];
}

export interface EmployeeWatchListInputRelations {
  positiveContributors?: WatchListPositiveContributorInputModel[];
  primaryModel?: EmployeeInputModel | null;
  watchListReasons?: WatchListReasonInputModel[];
}

export interface EmployeeWatchListComputations {
  currentScore: number | null;
  riskScoreBucket: number | null;
  scorePercent: number | null;
}

export type EmployeeWatchListModel = Model<
  EmployeeWatchListFields,
  EmployeeWatchListRelations,
  EmployeeWatchListComputations
>;

export type EmployeeWatchListInputModel = InputModel<
  EmployeeWatchListFields,
  EmployeeWatchListInputRelations
>;

// Type definitions for /watchlist / Watch List Positive Contributor (watch_list_positive_contributor)

export interface WatchListPositiveContributorFields {
  description?: string;
  score?: number | null;
  variancePortion?: number | null;
}

export interface WatchListPositiveContributorRelations {
  event?: ImprovementPlanModel | null;
  watchList?: EmployeeWatchListModel | null;
}

export interface WatchListPositiveContributorInputRelations {
  event?: ImprovementPlanInputModel | null;
  watchList?: EmployeeWatchListInputModel | null;
}

export interface WatchListPositiveContributorComputations {}

export type WatchListPositiveContributorModel = Model<
  WatchListPositiveContributorFields,
  WatchListPositiveContributorRelations,
  WatchListPositiveContributorComputations
>;

export type WatchListPositiveContributorInputModel = InputModel<
  WatchListPositiveContributorFields,
  WatchListPositiveContributorInputRelations
>;

// Type definitions for /watchlist / Watch List Reason (watch_list_reason)

export interface WatchListReasonFields {
  name?: string;
  score?: number | null;
  scorePercent?: number | null;
  totalEventCount?: number | null;
  variancePortion?: number | null;
}

export interface WatchListReasonRelations {
  event?: (
    | AccidentModel
    | BillOfLadingViolationModel
    | EnforcementModel
    | TelematicsAlertModel
    | InjuryIllnessModel
    | ForkliftIncidentModel
    | MaterialSpillModel
    | HoursOfServiceObservationModel
    | CpapViolationModel
    | HighwayObservationModel
    | CustomerObservationModel
    | WorkplaceObservationModel
  )[];
  positiveEvent?: ImprovementPlanModel | null;
  watchList?: EmployeeWatchListModel | null;
}

export interface WatchListReasonInputRelations {
  event?: (
    | AccidentInputModel
    | BillOfLadingViolationInputModel
    | EnforcementInputModel
    | TelematicsAlertInputModel
    | InjuryIllnessInputModel
    | ForkliftIncidentInputModel
    | MaterialSpillInputModel
    | HoursOfServiceObservationInputModel
    | CpapViolationInputModel
    | HighwayObservationInputModel
    | CustomerObservationInputModel
    | WorkplaceObservationInputModel
  )[];
  positiveEvent?: ImprovementPlanInputModel | null;
  watchList?: EmployeeWatchListInputModel | null;
}

export interface WatchListReasonComputations {
  actions: string;
  correctiveActions: any;
  dateRange: number | null;
  eventsCount: number | null;
  maxActual: number | null;
  outsideSource: string;
  templateName: any;
  timeframe: any;
  type: string;
}

export type WatchListReasonModel = Model<
  WatchListReasonFields,
  WatchListReasonRelations,
  WatchListReasonComputations
>;

export type WatchListReasonInputModel = InputModel<
  WatchListReasonFields,
  WatchListReasonInputRelations
>;
