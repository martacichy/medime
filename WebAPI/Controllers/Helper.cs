using medime.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace medime.Controllers
{
    public class Helper : Controller
    {
        private readonly Helpers.JwtService _jwtService;

        public Helper(JwtService jwtService)
        {
            _jwtService = jwtService;
        }
        
    }
}
