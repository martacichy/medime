using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

#nullable disable

namespace medime.Models.DBModels
{
    public partial class User
    {
        public User() {
            //    //Doctorillnessesspecjalists = new HashSet<Doctorillnessesspecjalist>();
            //UserIllnesses = new HashSet<UserIllness>();
        }

        [Key]
        public int UsId { get; set; }


        public string UsFirstName { get; set; }
        public string UsLastName { get; set; }
        public DateTime UsBirthDate { get; set; }
        public string UsEmail { get; set; }
        public sbyte? IfDoctor { get; set; }
        public int? IllnessesTypes { get; set; }
        public string UserDescription { get; set; }
        [JsonIgnore]
        public string UsPassword { get; set; }

        //public virtual Illnessestype IllnessesTypesNavigation { get; set; }
        //public virtual ICollection<Doctorillnessesspecjalist> Doctorillnessesspecjalists { get; set; }
        //public virtual ICollection<UserIllness> UserIllnesses { get; set; }
    }
}
