using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace medime.Models.DBModels {
    public partial class IllnessContext : DbContext {
        public IllnessContext() {
        }
        private IConfiguration Configuration;

        public IllnessContext(DbContextOptions<IllnessContext> options)
            : base(options) {
        }

        public virtual DbSet<Illness> Illness { get; set; }
        public virtual DbSet<UserIllness> UserIllness { get; set;}


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql(this.Configuration.GetConnectionString("MedimeContext"), Microsoft.EntityFrameworkCore.ServerVersion.FromString("5.7.32-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {


            modelBuilder.Entity<Illness>(entity => {
                entity.HasKey(e => e.IllId)
                    .HasName("PRIMARY");

                entity.ToTable("illnesses");

                entity.HasIndex(e => e.IllType, "ilnesseType_idx");

                entity.Property(e => e.IllId)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("illId");

                entity.Property(e => e.IllDesc)
                    .IsRequired()
                    .HasColumnType("varchar(45)")
                    .HasColumnName("illDesc")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.IllType)
                    .HasColumnType("int(11)")
                    .HasColumnName("illType");

                //entity.HasOne(d => d.IllnessType)
                //    .WithMany()
                //    .HasConstraintName("ilnesseType");
            });

            modelBuilder.Entity<UserIllness>(entity => {
                entity.HasKey(e => e.Id)
                    .HasName("PRIMARY");

                entity.ToTable("user_illness");

                entity.HasIndex(e => e.IllId, "illId_idx");

                entity.HasIndex(e => e.UsId, "userId_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.IllId)
                    .HasColumnType("int(11)")
                    .HasColumnName("illId");

                entity.Property(e => e.UsId)
                    .HasColumnType("int(11)")
                    .HasColumnName("usId");

                entity.HasOne(d => d.Ill)
                    .WithMany(p => p.UserIllnesses)
                    .HasForeignKey(d => d.IllId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("illId");

                //entity.HasOne(d => d.Us)
                //    .WithMany(p => p.UserIllnesses)
                //    .HasForeignKey(d => d.UsId)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("usId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
