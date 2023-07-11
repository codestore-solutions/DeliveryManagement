export interface loginPayload{
     username: string;
     password: string
}

export interface personalDetailInterface{
  deliveryAgentId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
}

export interface vechleDteailInterface{
     deliveryAgentId: number,
     vehicleType: string,
     model: string,
     companyName: string,
     numberPlate: string,
     vehicleImageUrl: string,
     registrationNumber: string
}

