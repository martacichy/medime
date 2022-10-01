using Microsoft.AspNetCore.Mvc;
using System;

namespace medime.Dtos {
    public class RegisterDto  {
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
