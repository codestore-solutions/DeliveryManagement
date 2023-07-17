﻿// <auto-generated />
using System;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccessLayer.Migrations
{
    [DbContext(typeof(DeliveryDbContext))]
    [Migration("20230716180025_Added On-OfF Duty Status Column In Service Location Table")]
    partial class AddedOnOfFDutyStatusColumnInServiceLocationTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EntityLayer.Models.AssignDeliveryAgent", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("BusinessId")
                        .HasColumnType("bigint");

                    b.Property<double>("DeliveryAddressLatitude")
                        .HasColumnType("float");

                    b.Property<double>("DeliveryAddressLongitude")
                        .HasColumnType("float");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<int>("OrdersCount")
                        .HasColumnType("int");

                    b.Property<double>("PickupLatitude")
                        .HasColumnType("float");

                    b.Property<double>("PickupLongitude")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("AssignDeliveryAgents");
                });

            modelBuilder.Entity("EntityLayer.Models.BankDetails", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("BankName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("IFSCCode")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("YourName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("BankDetails");
                });

            modelBuilder.Entity("EntityLayer.Models.BusinessAdmin", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("AgentEmailId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("AgentLatitude")
                        .HasColumnType("float");

                    b.Property<double>("AgentLongitude")
                        .HasColumnType("float");

                    b.Property<int>("AgentStatus")
                        .HasColumnType("int");

                    b.Property<long>("BusinessId")
                        .HasColumnType("bigint");

                    b.Property<string>("DeliveryAgentAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("DeliveryAgentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxDistance")
                        .HasColumnType("int");

                    b.Property<int>("OrderAssignStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("BusinessAdmin");
                });

            modelBuilder.Entity("EntityLayer.Models.Image", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("FileDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileExtension")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("FileSizeInBytes")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EntityLayer.Models.KYC", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("AadharCardUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("DrivingLicenseUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("PancardUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("PhotoUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.ToTable("kYCs");
                });

            modelBuilder.Entity("EntityLayer.Models.Order", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("AssignDeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<long>("OrderId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AssignDeliveryAgentId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("EntityLayer.Models.PersonalDetails", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PersonalDetails");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.Property<long>("ServiceLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("ServiceLocationId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("AgentStatus")
                        .HasColumnType("int");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("MaxDistance")
                        .HasColumnType("int");

                    b.Property<string>("SelectedDays")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("ServiceLocationId");

                    b.ToTable("ServiceLocations");
                });

            modelBuilder.Entity("EntityLayer.Models.VehicleDetails", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("NumberPlate")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("RegistrationNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VehicleImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VehicleType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("VechicleDetails");
                });

            modelBuilder.Entity("EntityLayer.Models.Order", b =>
                {
                    b.HasOne("EntityLayer.Models.AssignDeliveryAgent", "AssignDeliveryAgent")
                        .WithMany("Orders")
                        .HasForeignKey("AssignDeliveryAgentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AssignDeliveryAgent");
                });

            modelBuilder.Entity("EntityLayer.Models.AssignDeliveryAgent", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
