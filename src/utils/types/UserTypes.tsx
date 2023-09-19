export interface loginPayload {
  username: string;
  password: string;
}

export interface personalDetailInterface {
  agentId: number;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
}

export interface vehicleDetailInterface {
  agentId: number;
  vehicleType: number;
  vehicleModel: string;
  manufacturedYear: string;
  company: string;
  vehicleImage: string;
  registrationNumber: string;
}

export interface bankDetailInterface {
  agentId: number;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

export interface updateAgentStatus {
  agentId: number;
  agentStatus: number;
}

export interface uploadImageInterface {
  image: any;
}

export interface updateProfileInterface {
  agentId: number;
  isProfileCompleted: boolean;
}
