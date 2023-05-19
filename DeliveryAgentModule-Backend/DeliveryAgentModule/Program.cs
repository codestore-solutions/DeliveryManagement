
using BuisnessLogicLayer.IServices;
using BuisnessLogicLayer.Mappings;
using BuisnessLogicLayer.Services;
using BusinessLogicLayer.IServices;
using BusinessLogicLayer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DataAccessLayer.Repository;
using Microsoft.EntityFrameworkCore;

namespace DeliveryAgentModule
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IBusinessAdminService, BusinessAdminService>();
            builder.Services.AddScoped<IBusinessAdminRepository,BusinessAdminRepository>();
            builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IOrderAssignService, OrderAssignService>();
            builder.Services.AddScoped<IOrderService, OrderService>();
            builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

            builder.Services.AddDbContext<DeliveryDbContext>(options =>
            options.UseSqlServer("name=ConnectionStrings:DeliveryAgentConnectionString"));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
            var app = builder.Build();


            app.UseSwagger();
            app.UseSwaggerUI();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
               
            }

            app.UseCors("AllowOrigin");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}