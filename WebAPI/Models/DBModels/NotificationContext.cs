using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


#nullable disable

namespace medime.Models.DBModels {

    public partial class NotificationContext : DbContext {
        public NotificationContext() {
        }

        private IConfiguration Configuration;


        public NotificationContext(DbContextOptions<NotificationContext> options)
            : base(options) {
        }

        public virtual DbSet<Notification> Notification { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseMySql(this.Configuration.GetConnectionString("MedimeContext"), Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.32-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Notification>(entity => {
                entity.HasKey(e => e.Id)
                    .HasName("PRIMARY");

                entity.ToTable("notifications");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("notId");

                entity.Property(e => e.IllnessId)
                    .HasColumnType("int(11)")
                    .HasColumnName("illnessId");

                entity.Property(e => e.Description)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("notDesc");

                entity.Property(e => e.IfMedicine)
                    .HasColumnType("tinyint")
                    .HasColumnName("ifMedicine");

                entity.Property(e => e.Frequency)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("medicineFrequency");

                entity.Property(e => e.UserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("userId");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

