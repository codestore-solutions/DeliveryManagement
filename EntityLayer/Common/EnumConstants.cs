﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Common
{
    public class EnumConstants
    {
        public enum DocumentTypes
        {
            DrivingLicence = 1,
            PanCard = 2,
            AadharCard = 3,
            Photo = 4
        }

        public enum AvailabilityStatus
        {
            OffDuty = 0,
            OnDuty = 1,
            Busy = 2,
        }

        public enum VerificationStatus
        {
            NotVerified = 0,
            Verified = 1
        }

        public enum OrderStatus
        {
            Assigned = 5,
            Accepted = 6,
            Rejected = 7,
            Ongoing = 8,
            Delivered = 9,
        }

        public enum DeliveryStatus
        {
            Assigned = 5,
            Accepted = 6,
            Rejected = 7,
            Pickedup = 8,
            ReachedDestination = 9,
            NotAcceptedByCustomer = 10,
            Delivered = 11,
        }

        public enum VehicleTypes
        {
            Motorcycle = 1,
            Scooter,
            GearlessMotorcycle,
            Scooty
        }
    }
}