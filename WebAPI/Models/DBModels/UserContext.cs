using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace medime.Models.DBModels {

    public partial class UserContext : DbContext {
        public UserContext() {
        }

        private IConfiguration Configuration;


        public UserContext(DbContextOptions<UserContext> options)
            : base(options) {
        }

        public virtual DbSet<User> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseMySql(this.Configuration.GetConnectionString("MedimeContext"), Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.32-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            

            modelBuilder.Entity<User>(entity => {
                entity.HasKey(e => e.UsId)
                    .HasName("PRIMARY");

                entity.ToTable("users");

                entity.HasIndex(e => e.IllnessesTypes, "illnessesSpecialist_idx");

                entity.Property(e => e.UsId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("usId");

                entity.Property(e => e.IfDoctor)
                    .HasColumnType("tinyint(4)")
                    .HasColumnName("ifDoctor");

                entity.Property(e => e.IllnessesTypes)
                    .HasColumnType("int(11)")
                    .HasColumnName("illnessesTypes");

                entity.Property(e => e.UsBirthDate)
                    .HasColumnType("date")
                    .HasColumnName("usBirthDate");

                entity.Property(e => e.UsEmail)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("usEmail")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UsFirstName)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("usFirstName")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UsLastName)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("usLastName")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UserDescription)
                    .HasColumnType("varchar(150)")
                    .HasColumnName("userDescription")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UsPassword)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("usPassword")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                //entity.HasOne(d => d.IllnessesTypesNavigation)
                //    .WithMany(p => p.Users)
                //    .HasForeignKey(d => d.IllnessesTypes)
                //    .HasConstraintName("illnessesSpecialist");
            });

            

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
