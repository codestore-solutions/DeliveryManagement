enum VehicleType {
  Motorcycle = 1,
  Scooter = 2,
  GearlessMotorcycle = 3,
  Scooty = 4,
}

export function getVehicleLabel(value: number): string {
  switch (value) {
    case VehicleType.Motorcycle:
      return 'Motorcycle';
    case VehicleType.Scooter:
      return 'Scooter';
    case VehicleType.GearlessMotorcycle:
      return 'GearlessMotorcycle';
    case VehicleType.Scooty:
      return 'Scooty';
    default:
      return '';
  }
}

export function generateLabelArray(dataArray: Array<any>) {
  const resultArray = [];

  for (const data of dataArray) {
    const label = `${data.slotName}`;
    const newObj = {
      label,
      value: data.id,
    };
    resultArray.push(newObj);
  }

  return resultArray;
}
