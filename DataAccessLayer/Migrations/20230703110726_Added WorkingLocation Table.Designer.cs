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
    [Migration("20230703110726_Added WorkingLocation Table")]
    partial class AddedWorkingLocationTable
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

            modelBuilder.Entity("EntityLayer.Models.DeliveryAgentDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("AadharCardUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("AccountNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BankName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<string>("DrivingLicenseUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

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

                    b.Property<string>("IFSCCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NumberPlate")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("PancardUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhotoUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("RegistrationNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("VehicleCompanyName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("VehicleImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VehicleModel")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("VehicleType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("YourName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DeliveryAgentDetails");
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

                    b.Property<string>("ShippingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AssignDeliveryAgentId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("EntityLayer.Models.SelectedDay", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("SelectDay")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("ServiceLocationId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ServiceLocationId");

                    b.ToTable("SelectedDay");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.Property<long>("ServiceLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("ServiceLocationId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<string>("LocationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("MaxDistance")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<long>("WorkingLocationId")
                        .HasColumnType("bigint");

                    b.HasKey("ServiceLocationId");

                    b.HasIndex("WorkingLocationId");

                    b.ToTable("ServiceLocations");
                });

            modelBuilder.Entity("EntityLayer.Models.WorkingLocation", b =>
                {
                    b.Property<long>("WorkingLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("WorkingLocationId"));

                    b.Property<long>("DeliveryAgentId")
                        .HasColumnType("bigint");

                    b.HasKey("WorkingLocationId");

                    b.ToTable("WorkingLocation");
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

            modelBuilder.Entity("EntityLayer.Models.SelectedDay", b =>
                {
                    b.HasOne("EntityLayer.Models.ServiceLocation", "ServiceLocation")
                        .WithMany("SelectedDays")
                        .HasForeignKey("ServiceLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ServiceLocation");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.HasOne("EntityLayer.Models.WorkingLocation", "WorkingLocation")
                        .WithMany("ServiceLocations")
                        .HasForeignKey("WorkingLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkingLocation");
                });

            modelBuilder.Entity("EntityLayer.Models.AssignDeliveryAgent", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.Navigation("SelectedDays");
                });

            modelBuilder.Entity("EntityLayer.Models.WorkingLocation", b =>
                {
                    b.Navigation("ServiceLocations");
                });
#pragma warning restore 612, 618
        }
    }
}
