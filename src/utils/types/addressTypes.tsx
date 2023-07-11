export interface addNewWorkingLocationInterface{
  deliveryAgentId: number,
  locationName: string,
  address: string,
  fromTime: string,
  toTime: string,
  selectDays: string,
  latitude?: number,
  longitude?: number
}