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
    [Migration("20230522033010_adding col into service location table")]
    partial class addingcolintoservicelocationtable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EntityLayer.Models.AgentAssociation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BuisnessAdminId")
                        .HasColumnType("int");

                    b.Property<int>("DeliveryAgentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BuisnessAdminId");

                    b.HasIndex("DeliveryAgentId");

                    b.ToTable("AgentAssociations");
                });

            modelBuilder.Entity("EntityLayer.Models.BusinessAdmin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AgentStatus")
                        .HasColumnType("int");

                    b.Property<string>("DeliveryAgentAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DeliveryAgentId")
                        .HasColumnType("int");

                    b.Property<string>("DeliveryAgentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("OrderAssignStatus")
                        .HasColumnType("int");

                    b.Property<int?>("ServiceLocationId")
                        .HasColumnType("int");

                    b.Property<string>("ShippingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VerStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ServiceLocationId");

                    b.ToTable("buisnessAdmin");
                });

            modelBuilder.Entity("EntityLayer.Models.DeliveryAgent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ServiceLocationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ServiceLocationId");

                    b.ToTable("deliveryAgents");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "XYZ",
                            ContactNo = "9034906248",
                            Name = "Sipin"
                        },
                        new
                        {
                            Id = 2,
                            Address = "Yvx",
                            ContactNo = "9034454348",
                            Name = "Kumar"
                        });
                });

            modelBuilder.Entity("EntityLayer.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BusinessAdminId")
                        .HasColumnType("int");

                    b.Property<double?>("OrderAmount")
                        .HasColumnType("float");

                    b.Property<string>("ShippingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("paymentType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BusinessAdminId");

                    b.ToTable("orders");

                    b.HasData(
                        new
                        {
                            Id = 21,
                            OrderAmount = 2799.0,
                            ShippingAddress = "Noida Sector 59",
                            paymentType = 2
                        },
                        new
                        {
                            Id = 22,
                            OrderAmount = 9799.0,
                            ShippingAddress = "Noida Sector 6",
                            paymentType = 1
                        },
                        new
                        {
                            Id = 23,
                            OrderAmount = 18799.0,
                            ShippingAddress = "Noida Electronic City",
                            paymentType = 2
                        },
                        new
                        {
                            Id = 24,
                            OrderAmount = 799.0,
                            ShippingAddress = "Dwarka Sector 21",
                            paymentType = 1
                        },
                        new
                        {
                            Id = 25,
                            OrderAmount = 18299.0,
                            ShippingAddress = "Malviya Nagar Delhi",
                            paymentType = 2
                        },
                        new
                        {
                            Id = 26,
                            OrderAmount = 24799.0,
                            ShippingAddress = "Noida Sector 62",
                            paymentType = 2
                        });
                });

            modelBuilder.Entity("EntityLayer.Models.OrderAssign", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DeliveryAgentId")
                        .HasColumnType("int");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("orderAssigns");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AgentStatus")
                        .HasColumnType("int");

                    b.Property<int>("DeliveryAgentId")
                        .HasColumnType("int");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<int>("MaxDistance")
                        .HasColumnType("int");

                    b.Property<int>("OrderAssignStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("serviceLocations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AgentStatus = 0,
                            DeliveryAgentId = 1,
                            Latitude = 29.416590500000002,
                            Longitude = 76.668152500000005,
                            MaxDistance = 10,
                            OrderAssignStatus = 0
                        },
                        new
                        {
                            Id = 2,
                            AgentStatus = 0,
                            DeliveryAgentId = 2,
                            Latitude = 29.4295905,
                            Longitude = 76.998152500000003,
                            MaxDistance = 10,
                            OrderAssignStatus = 0
                        },
                        new
                        {
                            Id = 3,
                            AgentStatus = 0,
                            DeliveryAgentId = 3,
                            Latitude = 29.4065905,
                            Longitude = 76.268152499999999,
                            MaxDistance = 10,
                            OrderAssignStatus = 0
                        });
                });

            modelBuilder.Entity("EntityLayer.Models.AgentAssociation", b =>
                {
                    b.HasOne("EntityLayer.Models.BusinessAdmin", "BuisnessAdmin")
                        .WithMany()
                        .HasForeignKey("BuisnessAdminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EntityLayer.Models.DeliveryAgent", "DeliveryAgent")
                        .WithMany()
                        .HasForeignKey("DeliveryAgentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BuisnessAdmin");

                    b.Navigation("DeliveryAgent");
                });

            modelBuilder.Entity("EntityLayer.Models.BusinessAdmin", b =>
                {
                    b.HasOne("EntityLayer.Models.ServiceLocation", "ServiceLocation")
                        .WithMany()
                        .HasForeignKey("ServiceLocationId");

                    b.Navigation("ServiceLocation");
                });

            modelBuilder.Entity("EntityLayer.Models.DeliveryAgent", b =>
                {
                    b.HasOne("EntityLayer.Models.ServiceLocation", "ServiceLocation")
                        .WithMany("DeliveryAgents")
                        .HasForeignKey("ServiceLocationId");

                    b.Navigation("ServiceLocation");
                });

            modelBuilder.Entity("EntityLayer.Models.Order", b =>
                {
                    b.HasOne("EntityLayer.Models.BusinessAdmin", "BusinessAdmin")
                        .WithMany()
                        .HasForeignKey("BusinessAdminId");

                    b.Navigation("BusinessAdmin");
                });

            modelBuilder.Entity("EntityLayer.Models.ServiceLocation", b =>
                {
                    b.Navigation("DeliveryAgents");
                });
#pragma warning restore 612, 618
        }
    }
}