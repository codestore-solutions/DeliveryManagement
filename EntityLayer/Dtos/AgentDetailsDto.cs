﻿using EntityLayer.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace EntityLayer.Dtos
{
    public class AgentDetailsDto
    {

        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$", ErrorMessage = StringConstant.FullNameError)]
        public string FullName { get; set; } = null!;

        [Required]
        [StringLength(5)]
        [RegularExpression(@"^[0-9+ -]+$")]
        public string CountryCode { get; set; } = null!;

        [Required]
        [DataType(DataType.PhoneNumber)]
        [StringLength(15, MinimumLength = 10)]
        [Phone]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[A-Za-z0-9 -]+$")]
        [StringLength(15)]
        public string Gender { get; set; } = null!;

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[A-Za-z0-9.:,/@*&%#!{} -]+$")]
        public string Address { get; set; } = null!;

        [Required]
        public string ProfileImage { get; set; } = string.Empty;
    }
}
