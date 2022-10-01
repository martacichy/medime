using medime.Dtos;
using medime.Helpers;
using medime.Models.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medime.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class IllnessController : ControllerBase {

        private IllnessContext _illnessData;
        private readonly Helpers.JwtService _jwtService;

        public IllnessController(IllnessContext illnessData, JwtService jwtService) {
            _illnessData = illnessData;
            _jwtService = jwtService;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetIllnesses() {
            return Ok(_illnessData.Illness.ToList());
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public IActionResult GetIllnessById(int id) {
            return Ok(_illnessData.Illness.FirstOrDefault(x => x.IllId == id));
        }

        [HttpGet]
        [Route("api/[controller]/{typeId}")]
        public IActionResult GetIllnessesByType(int typeId) {
            return Ok(_illnessData.Illness.Where(x => x.IllType == typeId).ToList());
        }

        [HttpPost]
        [Route("api/[controller]/AddIllnessAsync")]
        public async Task<IActionResult> AddIllnessAsync(Illness illness)
        {
            _illnessData.Illness.Add(illness);
            await _illnessData.SaveChangesAsync();
            return CreatedAtAction(nameof(GetIllnessById), new { id = illness.IllId }, illness);
        }

        [HttpPost]
        [Route("api/[controller]/getuserilless")]
        public IActionResult GetUserIllnessById(GetIllnessByUserDto dto) {
            var token = _jwtService.Verify(dto.Jwt);
            List<Illness> response = new List<Illness>();

            int userId = int.Parse(token.Issuer);
            var usIllList = _illnessData.UserIllness.Where(x => x.UsId == userId).Select(x => x.IllId).ToList();
            foreach (var us in usIllList) {
                response.Add(_illnessData.Illness.Where(x => x.IllId == us).FirstOrDefault());
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddIllnessUser(AddIllnessDto dto) {
            var userId = GetUserByToken(dto.Jwt);
            var userIllness = new UserIllness() {
               IllId = dto.SelectedIllID,
               UsId = userId
            };
            _illnessData.UserIllness.Add(userIllness);
            await _illnessData.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserIllnessById), new { id = userIllness.Id }, userIllness);


        }

        [HttpPost]
        [Route("api/[controller]/addCustomIllnessUser")]
        public async Task<IActionResult> AddCustomIllnessUser(AddCustomIllnessDto dto)
        {
            var userId = GetUserByToken(dto.Jwt);
            
            var newIlless = new Illness()
            {
                IllType = dto.SelectedIllType,
                IllDesc = dto.Illness.Trim()
            };
            var illness = await AddIllnessAsync(newIlless);
            var userIllness = new UserIllness()
            {
                UsId = userId,
                IllId = _illnessData.Illness.Where(x => x.IllDesc == dto.Illness.Trim()).First().IllId
            };

            _illnessData.UserIllness.Add(userIllness);
            await _illnessData.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserIllnessById), new { id = userIllness.Id }, userIllness);

        }

        //PRIVATE METHODS
        private int GetUserByToken(string jwt)
        {
            var token = _jwtService.Verify(jwt);
            if (token != null)
            {
                return int.Parse(token.Issuer);

            }
            return 0;
        }
    }
}
