using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace medime.Models {

    public class User {

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(45, ErrorMessage ="Mniejznakow")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IfDoctor { get; set; }
    }
}
