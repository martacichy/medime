using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


#nullable disable
namespace medime.Models.DBModels
{

    public partial class QuestionnaireContext : DbContext
    {
        public QuestionnaireContext()
        {
        }

        private IConfiguration Configuration;


        public QuestionnaireContext(DbContextOptions<QuestionnaireContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Questionnaire> Questionnaire { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(this.Configuration.GetConnectionString("MedimeContext"), Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.32-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Questionnaire>(entity => {
                entity.HasKey(e => e.Id)
                    .HasName("PRIMARY");

                entity.ToTable("questionnaireresults");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.CreationDate)
                    .HasColumnType("dateTime")
                    .HasColumnName("creationDate");

                entity.Property(e => e.Description)
                    .HasColumnType("varchar(150)")
                    .HasColumnName("description");

                entity.Property(e => e.HealthLevel)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("healthLevel");

                entity.Property(e => e.MedicineName)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("medicineName");

                entity.Property(e => e.Temperature)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("temperature");

                entity.Property(e => e.BloodPressure)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("bloodPressure");
                entity.Property(e => e.Saturation)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("saturation");
                entity.Property(e => e.Pulse)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("pulse");

                entity.Property(e => e.UserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("userId");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

