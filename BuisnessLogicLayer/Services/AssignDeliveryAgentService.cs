using AutoMapper;
using Azure.Core;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace BusinessLogicLayer.Services
{
    public class AssignDeliveryAgentService : IAssignDeliveryAgentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public AssignDeliveryAgentService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto> GetAllAsync(int pageNumber=1, int limit=10)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c=> c.Orders).Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();    
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allItems,
                Message = StringConstant.SuccessMessage
            };
        }
        public async Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {       
            foreach (var orderId in assignManuallyDto.OrderIds)
            {
                // Edge Case : When delivery agent has already assigned order  
                var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll()
                .FirstOrDefaultAsync(id => id.DeliveryAgentId == assignManuallyDto.DeliveryAgentId);

                // If delivery agent is present in db , then directly add new orderId to his orders list.
                // Otherwise create a new object of assign delivery agent and input values to it.
                if (assignedAgent != null)
                {
                    var newOrder = new Order()
                    {
                        OrderId = orderId,
                        AssignDeliveryAgentId = assignedAgent.Id
                    };
                    // Adding Orders to agent list
                    assignedAgent.Orders.Add(newOrder);

                    if (assignedAgent != null && assignedAgent.Orders.Count >= 5)
                    {
                        // set its status to busy
                        var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                        getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                    }
                    await unitOfWork.SaveAsync();
                }
                else
                {
                    // creating new object of assign delivery agent
                    assignedAgent = new AssignDeliveryAgent();
                    assignedAgent.DeliveryAgentId = assignManuallyDto.DeliveryAgentId;
                    assignedAgent.BusinessId = assignManuallyDto.BuisnessId;
                    assignedAgent.PickupLatitude = assignManuallyDto.PickupLat;
                    assignedAgent.PickupLongitude = assignManuallyDto.PickupLong;
                    assignedAgent.DeliveryAddressLatitude = assignManuallyDto.DeliveryAddressLat;
                    assignedAgent.DeliveryAddressLongitude = assignManuallyDto.DeliveryAddressLong;


                    var newOrder = new Order()
                    {
                        OrderId = orderId,
                        AssignDeliveryAgentId = assignedAgent.Id
                    };
                    assignedAgent.Orders.Add(newOrder);

                    await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignedAgent);
                    if (assignedAgent != null && assignedAgent.Orders.Count >= 5)
                    {
                        // set its status to busy
                        var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                        getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                    }
                    await unitOfWork.SaveAsync();

                }
            }

            var response = new ResponseDto()
            {
                StatusCode = 200,
                Success    = true,
               // Data       = assignedAgent,
                Message    = StringConstant.SuccessMessage
            };
            return response;
        }
        public async Task<ResponseDto> BulkAgentAssignManuallyAsync(BulkAssignManuallyDto bulkAssignManuallyDto)
        {
            List<long> deliveryAgentIds      = bulkAssignManuallyDto.DeliveryAgentId;
            List<long> orderIds              = bulkAssignManuallyDto.OrderIds;
            List<double> latitudes           = bulkAssignManuallyDto.DeliveryAddressLatitudes;
            List<double> longitudes          = bulkAssignManuallyDto.DeliveryAddressLongitudes;
            List<double> pickupLatitudes     = bulkAssignManuallyDto.PickupLatitudes;
            List<double> pickupLongitudes    = bulkAssignManuallyDto.PickupLongitudes;

            // Handling the case where the count of orderIds ,latitudes and longitudes are not equal.
            if (orderIds.Count != latitudes.Count || orderIds.Count != longitudes.Count || orderIds.Count != deliveryAgentIds.Count )
            {
                return new ResponseDto
                {
                    StatusCode = 400,
                    Success = false,
                    Data = StringConstant.CountsUnequalMessage,
                    Message = StringConstant.ErrorMessage,
                };
            }

            var bulkAssignResponse = new BulkAssignResponseDto();

            int i = 0;
            foreach (var orderId in bulkAssignManuallyDto.OrderIds)
            {
               var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c => c.Orders).FirstOrDefaultAsync(c =>
               c.PickupLatitude == pickupLatitudes[i] && c.PickupLongitude == pickupLongitudes[i]);

                if (assignedAgent != null)
                {
                    var newOrder = new Order()
                    {
                        OrderId = orderId,
                        AssignDeliveryAgentId = assignedAgent.Id
                    };
                    // Adding Orders to agent list
                    assignedAgent.Orders.Add(newOrder);
                    assignedAgent.OrdersCount = assignedAgent.Orders.Count;
                    // Changing status in delivery agent list if any agent has already 5 orders 
                    var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                    if (getAgent == null)
                    {
                        return new ResponseDto
                        {
                            StatusCode = 404,
                            Success = false,
                            Data = StringConstant.InvalidInputError,
                            Message = StringConstant.ErrorMessage,
                        };
                    }

                    if (assignedAgent.OrdersCount >= 5)
                    {
                        // set its status to busy
                        getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                    }
                    await unitOfWork.SaveAsync();
                    // response to frontend
                    bulkAssignResponse.AgentId.Add(assignedAgent.DeliveryAgentId);
                    bulkAssignResponse.AgentName.Add(getAgent.DeliveryAgentName);
                    bulkAssignResponse.Status      = "agent_assigned";
                    bulkAssignResponse.Orders.Add(orderId);
                    bulkAssignResponse.Timestamp   = DateTime.Now;
                }
                else
                {
                    assignedAgent = new AssignDeliveryAgent();                
                    var newOrder = new Order()
                    {
                        OrderId = orderId,
                        AssignDeliveryAgentId = assignedAgent.Id
                    };
                    // Adding Orders to agent list
                    assignedAgent.Orders.Add(newOrder);
                    assignedAgent.DeliveryAgentId           = deliveryAgentIds[i];
                    assignedAgent.BusinessId                = bulkAssignManuallyDto.BusinessId;
                    assignedAgent.PickupLatitude            = pickupLatitudes[i];
                    assignedAgent.PickupLongitude           = pickupLongitudes[i];
                    assignedAgent.DeliveryAddressLatitude   = latitudes[i];
                    assignedAgent.DeliveryAddressLongitude  = longitudes[i];
                    await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignedAgent);
                    assignedAgent.OrdersCount               = assignedAgent.Orders.Count;
                    var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                    if (getAgent == null)
                    {
                        return new ResponseDto
                        {
                            StatusCode = 404,
                            Success = false,
                            Data = StringConstant.InvalidInputError,
                            Message = StringConstant.ErrorMessage,
                        };
                    }

                    if (assignedAgent.OrdersCount >= 5)
                    {
                        // set its status to busy
                        getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                    }
                    await unitOfWork.SaveAsync();
                    // response to frontend
                    bulkAssignResponse.AgentId.Add(assignedAgent.DeliveryAgentId);
                    bulkAssignResponse.AgentName.Add(getAgent.DeliveryAgentName);
                    bulkAssignResponse.Status = "agent_assigned";
                    bulkAssignResponse.Orders.Add(orderId);
                    bulkAssignResponse.Timestamp = DateTime.Now;
                }
                i++;
            }
            var response = new ResponseDto()
            {
                StatusCode = 200,
                Success = true,
                Data = bulkAssignResponse,
                Message = StringConstant.SuccessMessage
            };
            return response;
        }
        public async Task<ResponseDto> SingleAgentAssignAutomaticallyAsync(AssignAgentAutomaticallyDto automaticallyDto)
        {
            // check whether delivery agent assigned or not with the same pickup location
            // if yes, then assign order to same delivery agent 
            // if no , then assign new agent to that order
            var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c=>c.Orders)
            .FirstOrDefaultAsync(c => c.PickupLatitude == automaticallyDto.PickupLatitude
            && c.PickupLongitude == automaticallyDto.PickupLongitude);

            var singleAssignResponse = new singleAssignResponse();

            if (assignedAgent != null && IsAgentAvailableForAnotherOrder(assignedAgent, automaticallyDto))
            {
                // Assigning order within the same locality
                var anotherOrderInSameLocality = new Order()
                {
                    OrderId = automaticallyDto.OrderId,
                    AssignDeliveryAgentId = assignedAgent.Id
                };
                
                assignedAgent.Orders.Add(anotherOrderInSameLocality);
                assignedAgent.OrdersCount = assignedAgent.Orders.Count;
                if (assignedAgent.OrdersCount >= 5)
                {
                    // set its status to busy
                    var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                    getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                }
                bool res = await unitOfWork.SaveAsync();
                singleAssignResponse.AgentId = assignedAgent.DeliveryAgentId;
                singleAssignResponse.Status = "agent_assigned";
                singleAssignResponse.Timestamp = DateTime.Now;
                singleAssignResponse.OrderId = automaticallyDto.OrderId;

                return new ResponseDto()
                { 
                    StatusCode = res ? 200 : 500,
                    Success = res,
                    Data = res ? singleAssignResponse : StringConstant.ErrorMessage,
                    Message = res ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
                };
                
            }
            else
            {
                // Search for nearest delivery agent in database
                var getNearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(automaticallyDto.PickupLatitude, automaticallyDto.PickupLongitude, 5);
                // If we didn't get any agent nearby , push notification .i.e, No delivery agent is available nearby
                if (getNearestDeliveryAgentId == null)
                {
                    return new ResponseDto
                    {
                        StatusCode = 404,
                        Success = false,
                        Data = StringConstant.NotAvailableMessage,
                        Message = StringConstant.ErrorMessage,                     
                    };
                }
                // If we get agent nearby , then assign agent to that order
                var newAgent = new AssignDeliveryAgent();
                newAgent.DeliveryAgentId = (long)getNearestDeliveryAgentId;
                var newOrder = new Order()
                {
                    OrderId = automaticallyDto.OrderId,
                    AssignDeliveryAgentId = newAgent.Id
                };
                newAgent.Orders.Add(newOrder);
                mapper.Map(automaticallyDto, newAgent);

                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(newAgent);
                newAgent.OrdersCount = newAgent.Orders.Count;
                if(newAgent.OrdersCount >= 5)
                {
                    var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == newAgent.DeliveryAgentId);
                    getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                }
                bool res = await unitOfWork.SaveAsync();

                // response to frontend
                singleAssignResponse.AgentId = newAgent.DeliveryAgentId;
                singleAssignResponse.Status = "agent_assigned";
                singleAssignResponse.Timestamp = DateTime.Now;
                singleAssignResponse.OrderId = automaticallyDto.OrderId;

                var response = new ResponseDto()
                {
                    StatusCode = res ? 200 : 500,
                    Success    = res,
                    Data       = res ? singleAssignResponse : StringConstant.ErrorMessage,
                    Message    = res ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
                };
                return response;
            }               
        }
        public async Task<ResponseDto> BulkAgentAssignAutomaticallyAsync(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {          
            List<long>   orderIds           = orderAssingInBulkRequestDto.OrderIds;
            List<double> latitudes          = orderAssingInBulkRequestDto.DeliveryAddressLatitudes;
            List<double> longitudes         = orderAssingInBulkRequestDto.DeliveryAddressLongitudes;
            List<double> pickupLatitudes    = orderAssingInBulkRequestDto.PickupLatitudes;
            List<double> pickupLongitudes   = orderAssingInBulkRequestDto.PickupLongitudes;

            // Handling the case where the count of orderIds ,latitudes and longitudes are not equal.
            if (orderIds.Count != latitudes.Count || orderIds.Count != longitudes.Count)
            {             
                return new ResponseDto
                {
                    StatusCode = 400,
                    Success = false,
                    Data = StringConstant.CountsUnequalMessage,
                    Message = StringConstant.ErrorMessage,
                };
            }

            var bulkAssignResponse = new BulkAssignResponseDto();
            
            int i = 0;
            // Searching a suitable agent for each orderId
            foreach (var orderId in orderAssingInBulkRequestDto.OrderIds)
            {
                // Fetching agent which has already assigned with orders
                var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c =>c.Orders)
                .FirstOrDefaultAsync(c => c.PickupLatitude == pickupLatitudes[i]
                && c.PickupLongitude == pickupLongitudes[i]);

                if (assignedAgent != null && IsAgentAvailableForAnotherOrder(assignedAgent, latitudes[i], longitudes[i]))
                {
                    // Assigning order within the same locality
                    var newOrder = new Order()
                    {
                        OrderId = orderId,
                        AssignDeliveryAgentId = assignedAgent.Id
                    };
                    // Adding Orders to agent list
                    assignedAgent.Orders.Add(newOrder);
                    assignedAgent.OrdersCount = assignedAgent.Orders.Count;
                    var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                    if(getAgent == null)
                    {
                        return new ResponseDto
                        {
                            StatusCode = 404,
                            Success = false,
                            Data = StringConstant.InvalidInputError,
                            Message = StringConstant.ErrorMessage,
                        };
                    }

                    if (assignedAgent.OrdersCount >= 2)
                    {
                        // set its status to busy
                        getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;                      
                    }
                    //await unitOfWork.SaveAsync();
                    // response to frontend
                    bulkAssignResponse.AgentId.Add(assignedAgent.DeliveryAgentId);
                    bulkAssignResponse.AgentName.Add(getAgent.DeliveryAgentName);
                    bulkAssignResponse.Status = "pending";
                    bulkAssignResponse.Orders.Add(orderId);
                    bulkAssignResponse.Timestamp = DateTime.Now;
                }
                else
                {
                    var getNearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(pickupLatitudes[i], pickupLongitudes[i], 10);
                    // If Delivery Agent is not present nearby
                    if (getNearestDeliveryAgentId == null)
                    {
                        bulkAssignResponse.AgentId.Add(null);
                        bulkAssignResponse.Orders.Add(orderId);
                        bulkAssignResponse.AgentName.Add(StringConstant.NotAvailableMessage);
                        i++;
                        break;
                    }

                    var existingAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c => c.Orders).FirstOrDefaultAsync(u =>
                    u.DeliveryAgentId == getNearestDeliveryAgentId);

                    if(existingAgent != null)
                    {
                        var createNewOrder = new Order()
                        {
                            OrderId = orderId,
                            AssignDeliveryAgentId = existingAgent.Id
                        };
                        // Adding Orders to agent list
                        existingAgent.Orders.Add(createNewOrder);
                        existingAgent.OrdersCount = existingAgent.Orders.Count;
                        var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == existingAgent.DeliveryAgentId);
                        if (getAgent == null)
                        {
                            return new ResponseDto
                            {
                                StatusCode = 404,
                                Success = false,
                                Data = StringConstant.InvalidInputError,
                                Message = StringConstant.ErrorMessage,
                            };
                        }

                        if (existingAgent.OrdersCount >= 2)
                        {
                            // set its status to busy
                            getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                        }
                        //await unitOfWork.SaveAsync();
                        // response to frontend
                        bulkAssignResponse.AgentId.Add(existingAgent.DeliveryAgentId);
                        bulkAssignResponse.AgentName.Add(getAgent.DeliveryAgentName);
                        bulkAssignResponse.Status = "pending";
                        bulkAssignResponse.Orders.Add(orderId);
                        bulkAssignResponse.Timestamp = DateTime.Now;
                    }
                    else
                    {
                        assignedAgent = new AssignDeliveryAgent();
                        assignedAgent.DeliveryAgentId = (long)getNearestDeliveryAgentId;                    
                        assignedAgent.BusinessId = orderAssingInBulkRequestDto.BusinessId;

                        var newOrder = new Order()
                        {
                            OrderId = orderId,
                            AssignDeliveryAgentId = assignedAgent.Id
                        };

                        // Adding Orders to agent list
                        assignedAgent.Orders.Add(newOrder);                  
                        assignedAgent.PickupLatitude             = pickupLatitudes[i];
                        assignedAgent.PickupLongitude            = pickupLongitudes[i];
                        assignedAgent.DeliveryAddressLatitude    = latitudes[i];
                        assignedAgent.DeliveryAddressLongitude   = longitudes[i];
                        await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignedAgent);
                        assignedAgent.OrdersCount = assignedAgent.Orders.Count;
                        var getAgent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(c => c.DeliveryAgentId == assignedAgent.DeliveryAgentId);
                        if (getAgent == null)
                        {
                            return new ResponseDto
                            {
                                StatusCode = 404,
                                Success = false,
                                Data = StringConstant.InvalidInputError,
                                Message = StringConstant.ErrorMessage,
                            };
                        }

                        if (assignedAgent.OrdersCount >= 5)
                        {
                            // set its status to busy
                            getAgent.AgentStatus = BusinessAdmin.DeliveryAgentStatus.Busy;
                        }
                        //await unitOfWork.SaveAsync();
                        // response to frontend
                        bulkAssignResponse.AgentId.Add(assignedAgent.DeliveryAgentId);
                        bulkAssignResponse.AgentName.Add(getAgent.DeliveryAgentName);
                        bulkAssignResponse.Status = "pending";
                        bulkAssignResponse.Orders.Add(orderId);
                        bulkAssignResponse.Timestamp = DateTime.Now;
                    }                
                }
                i++;
            }

            var response = new ResponseDto()
            {
                StatusCode = 200,
                Success = true,
                Data = bulkAssignResponse,
                Message = StringConstant.SuccessMessage
            };
            return response;          
        }
        public async Task<ResponseDto> UpdateAsync(long id, UpdateAgentRequestDto updateAgentRequestDto)
        {
            var agentNeedsToBeUpdated = await unitOfWork.AssignDeliveryAgentRepository.GetAll().FirstOrDefaultAsync(id => id.DeliveryAgentId == updateAgentRequestDto.DeliveryAgentId);
            bool res = false;
            if (agentNeedsToBeUpdated != null)
            {
               // agentNeedsToBeUpdated.OrderId = updateAgentRequestDto.OrderId;
                agentNeedsToBeUpdated.DeliveryAgentId = updateAgentRequestDto.DeliveryAgentId;
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(agentNeedsToBeUpdated);
                res = await unitOfWork.SaveAsync();
            }
            
            var response = new ResponseDto()
            {
                StatusCode = res ? 200 : 500,
                Success = res,
                Data = res ? agentNeedsToBeUpdated : StringConstant.ErrorMessage,
                Message = res ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
            };
            return response;
        }
        public async Task RemoveOrderAssignedAsync(long agentId)
        {
            var unassignAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().FirstOrDefaultAsync(id=>id.DeliveryAgentId== agentId);
            await unitOfWork.AssignDeliveryAgentRepository.DeleteAsync(unassignAgent.Id);
            await unitOfWork.SaveAsync();
        }
        public async Task<long?> GetDeliveryAgentsWithinDistance(double pickupLatitude, double pickupLongitude, int maxDistance)
        {
            if (maxDistance > 10)
            {
                return null;// Notify User that Delivery Agent is not available Nearby: Push Notification
            }

            var agents = await unitOfWork.BusinessAdminRepository.GetAll().ToListAsync();
            long? nearsestDeliveryAgentId = null;
            double minDistance = double.MaxValue;
            foreach (var agent in agents)
            {
                double distance = CalculateDistance(pickupLatitude, pickupLongitude, agent.AgentLatitude, agent.AgentLongitude);

                if ((distance <= maxDistance) && (distance< minDistance) && agent.AgentStatus == BusinessAdmin.DeliveryAgentStatus.Availale)
                {
                    minDistance = distance;
                    nearsestDeliveryAgentId = agent.DeliveryAgentId;
                }
            }
            return nearsestDeliveryAgentId;
        }
        public static double CalculateDistance(double startLatitude, double startLongitude, double endLatitude, double endLongitude)
        {
            const double EarthRadius = 6371;
            double dLat = ToRadians(endLatitude - startLatitude);
            double dLon = ToRadians(endLongitude - startLongitude);
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(ToRadians(startLatitude)) * Math.Cos(ToRadians(endLatitude)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            double distance = EarthRadius * c;
            return distance;
        }
        public static double ToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
        }  
        private bool IsAgentAvailableForAnotherOrder(AssignDeliveryAgent agent, AssignAgentAutomaticallyDto automaticallyDto)
        {
            // Check if the order assigned to the agent is within a nearby locality
            double distance = CalculateDistance(agent.DeliveryAddressLatitude, agent.DeliveryAddressLongitude,
                                                automaticallyDto.DeliveryAddressLatitude, automaticallyDto.DeliveryAddressLongitude);
            if (distance <= 1)
            {
                return true;
            }
            return false;             // Agent is available for a nearby order
        }
        private bool IsAgentAvailableForAnotherOrder(AssignDeliveryAgent agent, double deliveryAddressLatitude, double deliveryAddressLongitude)
        {
            // Check if new order is in the same vicinity or not       
            double distance = CalculateDistance(agent.DeliveryAddressLatitude, agent.DeliveryAddressLongitude,
                                                   deliveryAddressLatitude, deliveryAddressLongitude);

                if (distance <= 1)
                {
                    return true;
                }
            return false;             // Agent is not available for a nearby order
        }

        public async Task<ResponseDto> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            // If a new order came from same vicinity, then
            // Case 1: We can assign a new order to the same agent that have already occupied with orders.
            // else we can assign a new agent based on his priority serving location

            // Assuming : One Agent is picking orders from the same vendors only
            var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c => c.Orders)
            .FirstOrDefaultAsync(c => c.PickupLatitude == assignAgentAutomaticallyDto.PickupLatitude
            && c.PickupLongitude == assignAgentAutomaticallyDto.PickupLongitude);

            
            if(assignedAgent != null)
            {
                // Assigning order within the same locality
                var anotherOrderInSameLocality = new Order()
                {
                    OrderId = assignAgentAutomaticallyDto.OrderId,
                    AssignDeliveryAgentId = assignedAgent.Id
                };

                assignedAgent.Orders.Add(anotherOrderInSameLocality);
                assignedAgent.OrdersCount = assignedAgent.Orders.Count;
                bool res = await unitOfWork.SaveAsync();

                return new ResponseDto()
                {
                    StatusCode   = res ? 200 : 500,
                    Success      = res,
                    Data         = res ? assignedAgent : StringConstant.InvalidInputError,
                    Message      = res ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
                };
            }
            else  // If no agent has assigned order from the same vendor, then assign a new agent.
            { 
                // Search for suitable delivery agent in Database.
                var getNearestDeliveryAgentId = await NearestAgentWithinRange(assignAgentAutomaticallyDto, 5);

                // If we didn't get any agent nearby , push notification .i.e, No delivery agent is available nearby
                if (getNearestDeliveryAgentId == null)
                {
                    return new ResponseDto
                    {
                        StatusCode   = 404,
                        Success      = false,
                        Data         = StringConstant.NotAvailableMessage,
                        Message      = StringConstant.ErrorMessage,
                    };
                }

                // If we get agent nearby , then assign agent to that order
                var assignNewAgent = new AssignDeliveryAgent();
                assignNewAgent.DeliveryAgentId = (long)getNearestDeliveryAgentId;
                var newOrder = new Order()
                {
                    OrderId = assignAgentAutomaticallyDto.OrderId,
                    AssignDeliveryAgentId = assignNewAgent.Id
                };
                assignNewAgent.Orders.Add(newOrder);
                mapper.Map(assignAgentAutomaticallyDto, assignNewAgent);

                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
                assignNewAgent.OrdersCount = assignNewAgent.Orders.Count;
                await unitOfWork.SaveAsync();
                
                return new ResponseDto
                {
                    StatusCode = 200,
                    Success = true,
                    Data = assignNewAgent,
                    Message = StringConstant.SuccessMessage
                };
            }
        }

        public async Task<long?> NearestAgentWithinRange(AssignAgentAutomaticallyDto dto, int maxDistance)
        {
            // Find current day in string format
            DateTime currentTime = DateTime.Now;
            DayOfWeek currentDayOfWeek = currentTime.DayOfWeek;
            string currentDay = currentDayOfWeek.ToString();
            TimeSpan currentTimeOfDay = currentTime.TimeOfDay;

            // Available Delivery agent list based on Working preferences.
            var availableAgentList = await unitOfWork.ServiceLocationRepository.GetAll().Where(u=> u.IsActive 
            && u.SelectedDays.Contains(currentDay)
            && currentTimeOfDay <= u.EndTime 
            && currentTimeOfDay >= u.StartTime ).ToListAsync();
            
            long? nearsestAgentId = null;
            foreach (var agent in availableAgentList)
            {             
                // Check Delivery region is within the range according to the preferences of delivery agent.
                double deliveryDistance = CalculateDistance(dto.DeliveryAddressLatitude, dto.DeliveryAddressLongitude, agent.Latitude, agent.Longitude);
                // Check Pickup region is within the range according to the preferences of delivery agent.
                double pickupDistance   = CalculateDistance(dto.PickupLatitude, dto.PickupLongitude, agent.Latitude, agent.Longitude);

                if (deliveryDistance <= maxDistance && pickupDistance <= maxDistance)
                {
                    nearsestAgentId = agent.DeliveryAgentId;
                    return nearsestAgentId;
                }
            }
            return nearsestAgentId;
        }


    }
}
