﻿// <auto-generated />
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
    [Migration("20230512074907_added new tables")]
    partial class addednewtables
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

                    b.Property<int>("DeliveryAgentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("buisnessAdmin");

                    b.HasData(
                        new
                        {
                            Id = 1001,
                            DeliveryAgentId = 1
                        },
                        new
                        {
                            Id = 1002,
                            DeliveryAgentId = 2
                        });
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

                    b.HasKey("Id");

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
#pragma warning restore 612, 618
        }
    }
}
