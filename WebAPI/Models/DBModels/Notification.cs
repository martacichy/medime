using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace medime.Models.DBModels {
    public partial class Notification {
        public Notification() {
        }

        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Frequency { get; set; }
        public bool IfMedicine { get; set; }
        public string Description { get; set; }
#nullable enable
        public string? MedicineName { get; set; }
        public int? IllnessId { get; set; }

        //public virtual ICollection<IllnessTypes> IllnessType { get; set; }
        //public virtual ICollection<Doctorillnessesspecjalist> Doctorillnessesspecjalists { get; set; }
        public virtual ICollection<UserIllness> UserIllnesses { get; set; }
    }
}
