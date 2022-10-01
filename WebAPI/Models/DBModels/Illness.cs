using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace medime.Models.DBModels
{
    public partial class Illness
    {
        public Illness()
        {
            UserIllnesses = new HashSet<UserIllness>();
        }

        [Key]
        public int IllId { get; set; }
        public int IllType { get; set; }
        public string IllDesc { get; set; }

        public virtual ICollection<UserIllness> UserIllnesses { get; set; }
    }
}
