using BusinessLogicLayer.IServices;
using BusinessLogicLayer.Mappings;
using BusinessLogicLayer.Services;
using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DataAccessLayer.Repository;
using DeliveryAgent.API.CustomActionFilter;
using DeliveryAgent.Entities.Common;
using DeliveryAgentModule.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

namespace DeliveryAgentModule
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File(StringConstant.LogPath, rollingInterval: RollingInterval.Day)
                .CreateLogger();
            builder.Logging.ClearProviders();
            builder.Logging.AddSerilog(logger);

            builder.Services.AddControllers();
            builder.Services.AddControllers(options =>
            {
                options.Filters.AddService<LoggingActionFilter>();
            });
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
                options.ReportApiVersions = true;
            });
            builder.Services.AddVersionedApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });
            builder.Services.AddSwaggerGen(options =>
            {
                // options.SwaggerDoc("v1", new OpenApiInfo { Title = "Delivery Agent API", Version = "v1" });
                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                          Reference = new OpenApiReference
                          {
                             Type = ReferenceType.SecurityScheme,
                             Id = JwtBearerDefaults.AuthenticationScheme,
                          },
                             Scheme = "oauth2",
                             Name = JwtBearerDefaults.AuthenticationScheme,
                             In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });

            builder.Services.AddScoped<IBusinessAdminService, BusinessAdminService>();
            builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IAssignDeliveryAgentService, AssignDeliveryAgentService>();
            builder.Services.AddScoped<IImageService, ImageService>();
            builder.Services.AddScoped<IServiceLocationService, ServiceLocationService>();
            builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));
            builder.Services.AddScoped<IAgentDetailsService, AgentDetailsService>();
            builder.Services.AddScoped<IBankDetailsService, BankDetailsService>();
            builder.Services.AddScoped<IKYCService, KYCService>();
            builder.Services.AddScoped<IVehicleDetailsService, VehicleDetailsService>();
            builder.Services.AddScoped<ITokenRepository, TokenRepository>();
            builder.Services.AddScoped<ITimeSlotService, TimeSlotService>();
            builder.Services.AddScoped<LoggingActionFilter>();
            builder.Services.AddScoped<IAccountService, AccountService>();  

            builder.Services.AddDbContext<DeliveryDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString(StringConstant.ConnectionStringPath)));

            /*            builder.Services.AddDbContext<DeliveryAuthDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DeliveryAgentAuthConnectionString")));*/
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
            /* builder.Services.AddIdentityCore<IdentityUser>()
                 .AddRoles<IdentityRole>()
                 .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("DeliveryAgent")
                 .AddEntityFrameworkStores<DeliveryAuthDbContext>()
                 .AddDefaultTokenProviders();*/
            builder.Services.AddSingleton<HttpClient>(sp =>
            {
                // Create a new instance of HttpClient
                var httpClient = new HttpClient();
                // httpClient.Timeout = TimeSpan.FromSeconds(60);
                return httpClient;
            });
            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
                options.Password.RequireUppercase = false;
            });
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    //ValidIssuer = builder.Configuration["JWT:Issuer"],
                    //ValidAudience = builder.Configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
                });
            builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();
            var app = builder.Build();
            var versionDescriptionProvider =
                app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                foreach (var description in versionDescriptionProvider.ApiVersionDescriptions)
                {
                    options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json",
                        description.GroupName.ToUpperInvariant());
                }
            });
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {

            }

            var webSocketOptions = new WebSocketOptions
            {
                KeepAliveInterval = TimeSpan.FromMinutes(2)
            };

            app.UseCors("AllowOrigin");

            app.UseHttpsRedirection();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseWebSockets(webSocketOptions);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
                RequestPath = "/Images"
            });

            app.MapControllers();

            app.Run();
        }
    }
}