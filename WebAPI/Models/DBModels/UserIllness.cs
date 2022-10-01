using System;
using System.Collections.Generic;

#nullable disable

namespace medime.Models.DBModels
{
    public partial class UserIllness
    {
        public int UsId { get; set; }
        public int IllId { get; set; }
        public int Id { get; set; }

        public virtual Illness Ill { get; set; }
        public virtual User Us { get; set; }
    }
}
