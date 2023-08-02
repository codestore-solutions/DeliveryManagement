﻿using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static EntityLayer.Models.PersonalDetail;

namespace BusinessLogicLayer.IServices
{
    public interface IPersonalDetailsService
    {
        public Task<ResponseDto?> GetPersonalDetailsAsync(long agentId);
        public Task<ResponseDto?> AddDetailsAsync(PersonalDetailsDto personalDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, PersonalDetailsDto agentDetailsDto);
        public Task<ResponseDto?> GetAllDetailsAsync(string? filterQuery, int? agentStatus
         , int pageNumber = 1, int limit = 10);
        public Task<ResponseDto?> GetDetailByAgentId(long agentId);
        public Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds);
        public Task<ResponseDto?> AddProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto);
        public Task<ResponseDto?> GetProfileCompletedStatusAsync(long agentId);


    }
}
