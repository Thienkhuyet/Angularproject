export type UserRole = 'Phone' | 'Phone';
export interface User {
  id: string; // fix
  carrierUserDisplayID: null; // luôn null
  carrierCompanyId: string; // fix
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  identityCardNumber: null;
  isActive: boolean;
  loginType: string; // value: Phone / Email
  loginEmail: string;
  login: string;
  profileImage: null;
  isDispatcher: boolean;
  isDriver: boolean;
  carrierUserRequirements: Array<any>;
}
export interface CarrierUserRequirements {
  id: string;
  carrierUserId: string;
  requirementTitle: string;
  expiryDate: string;
  referenceValue1: string;
  referenceValue2: string;
  isMandatory: boolean;
  isActive: boolean;
  isDeleted: boolean;
  carrierUserRequirementDocuments: [];
}
export interface CarrierUserRequirementDocuments {
  id: string;
  carrierUserRequirementId: string;
  documentName: string;
  documentLink: string;
  isDeleted: boolean;
}
// carrierUserRequirementDocuments;
