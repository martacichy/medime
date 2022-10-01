using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


#nullable disable

namespace medime.Models.DBModels {

    public partial class IllnessTypesContext : DbContext {
        public IllnessTypesContext() {
        }
        private IConfiguration Configuration;

        public IllnessTypesContext(DbContextOptions<IllnessTypesContext> options)
            : base(options) {
        }

        public virtual DbSet<IllnessTypes> IllnessTypes { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseMySql(this.Configuration.GetConnectionString("MedimeContext"), Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.32-mysql"));

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<IllnessTypes>(entity => {
                entity.HasKey(e => e.IllTypeId)
                    .HasName("PRIMARY");

                entity.ToTable("illnessesTypes");

                entity.Property(e => e.IllTypeId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("illTypeId");

                entity.Property(e => e.IllTypeName)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("illTypeName")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

