using System;
using System.Collections.Generic;

#nullable disable

namespace medime.Models.DBModels
{
    public partial class IllnessTypes {

        public IllnessTypes() {
            //Illnesses = new HashSet<Illness>();
            //Users = new HashSet<User>();
        }

        public int IllTypeId { get; set; }
        public string IllTypeName { get; set; }

        //public virtual ICollection<Illness> Illnesses { get; set; }
        //public virtual ICollection<User> Users { get; set; }
    }
}
