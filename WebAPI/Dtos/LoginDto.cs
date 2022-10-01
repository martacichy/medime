using Microsoft.AspNetCore.Mvc;

namespace medime.Dtos {
    public class LoginDto  {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
