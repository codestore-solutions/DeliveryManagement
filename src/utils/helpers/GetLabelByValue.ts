enum VehicleType {
    Motorcycle = 1,
    Scooter = 2,
    GearlessMotorcycle = 3,
    Scooty = 4,
  }
  
  export function getVehicleLabel(value: number): string  {
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
  