using medime.Models.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using medime.Dtos;
using medime.Helpers;

namespace medime.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {

        private readonly UserContext _userData;
        private readonly JwtService _jwtService;

        public UsersController(UserContext userData, JwtService jwtService) {
            _userData = userData;
            _jwtService = jwtService;
        }


        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetUsers() {
            return Ok(_userData.Users.ToList());
        }

        [HttpGet]
        [Route("api/[controller]/getById")]
        public User GetUserByEmail(string email) {
            return _userData.Users.FirstOrDefault(u => u.UsEmail == email);
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public User GetUserById(int id) {
            return _userData.Users.FirstOrDefault(x => x.UsId == id);
        }


        [HttpPost]
        [Route("api/[controller]/login")]

        public IActionResult Login(LoginDto dto) {
            var user = GetUserByEmail(dto.Email);

            if (user != null && BCrypt.Net.BCrypt.Verify(dto.Password, user.UsPassword)) {
                var jwt = _jwtService.Generate(user.UsId);
                
                return Ok(new  { jwtToken = jwt } );
            } else {
                return BadRequest(new { message = "Błąd autoryzacji" });
            }
        } 

        [HttpPost]
        [Route("api/[controller]/get")]
        public User User(GetLoggedUserDto dto) {

            try {
                var token = _jwtService.Verify(dto.Jwt);

                int userId = int.Parse(token.Issuer);
                return GetUserById(userId);
            } catch (Exception ex) {
                return null;
            }
            
        }

        [HttpPost]
        [Route("api/[controller]/register")]
        public async Task<IActionResult> Register(RegisterDto dto) {
            var user = new Models.DBModels.User() {
                UsFirstName = dto.Name,
                UsLastName = dto.LastName,
                UsBirthDate = dto.BirthDate,
                UsEmail = dto.Email,
                UsPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };
            _userData.Users.Add(user);
            await _userData.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserById), new { id = user.UsId }, user);
        }


        [HttpPost]
        [Route("api/[controller]/logout")]
        public IActionResult Logout() {
            Response.Cookies.Delete("jwt");

            return Ok(new { message = "Wylogowano" });
        }



        
    }
        
}
