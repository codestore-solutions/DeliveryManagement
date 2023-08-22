export interface addNewWorkingLocationInterface {
  agentId: number;
  locationName: string;
  address: string;
  timeSlotIds: Array<string>;
  selectedDays: Array<string>;
  latitude?: number;
  longitude?: number;
}

export interface setLocationInterface {
  serviceLocationId: number;
  agentId: number;
  isActive: boolean;
}
