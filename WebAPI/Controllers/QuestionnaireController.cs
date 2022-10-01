
using medime.Dtos;
using medime.Helpers;
using medime.Models;
using medime.Models.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medime.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionnaireController : ControllerBase
    {

        private QuestionnaireContext _QuestionnaireData;
        private readonly Helpers.JwtService _jwtService;

        public QuestionnaireController(QuestionnaireContext QuestionnaireData, JwtService jwtService)
        {
            _QuestionnaireData = QuestionnaireData;
            _jwtService = jwtService;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetQuestionnairees()
        {
            return Ok(_QuestionnaireData.Questionnaire.ToList());
        }

        [HttpGet]
        [Route("api/[controller]/{id}")]
        public IActionResult GetQuestionnaireById(int id)
        {
            return Ok(_QuestionnaireData.Questionnaire.FirstOrDefault(x => x.Id == id));
        }


        [HttpPost]
        [Route("api/[controller]/getUserQuestionnaireResults")]
        public IActionResult GetQuestionnaireResultsByUserId(GetQuestionnaireResultsByUserDto dto)
        {
            var result = new List<QuestionnaireResponse>();
            int userId = GetUserByToken(dto.Jwt);
            var userResponses = _QuestionnaireData.Questionnaire.Where(x => x.UserId == userId).ToList();
            foreach (var responseItem in userResponses)
            {
                var questionnaireResultResponse = new QuestionnaireResponse()
                {
                    Id = responseItem.Id,
                    CreationDate = responseItem.CreationDate.ToString().Replace("T", " "),
                    Description = responseItem.Description,
                    HealthLevel = responseItem.HealthLevel,
                    MedicineName = responseItem.MedicineName,
                    Sympthoms = responseItem.Sympthoms,
                    Parameters = CreateParametersResponse(responseItem.Temperature, responseItem.BloodPressure, responseItem.Saturation, responseItem.Pulse)
                };
                result.Add(questionnaireResultResponse);
            }
           
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestionnaireResult(AddQuestionnaireResultDto dto)
        {
            var questionnaireData = dto.questionnaireData;

            var userId = GetUserByToken(questionnaireData.Jwt);
            var questionnaireResult = new Questionnaire()
            {
                HealthLevel = questionnaireData.HealthLevel,
                CreationDate = DateTime.Now,
                UserId = userId,
                Description = questionnaireData.Description,
                MedicineName = questionnaireData.MedicineName,
                Sympthoms = CreateSympthomsResponse(questionnaireData.Sympthoms),
                Temperature = questionnaireData.Temperature.Trim() != "" ? questionnaireData.Temperature : "Nie zmierzono",
                BloodPressure = questionnaireData.BloodPressure.Trim() != "" ? questionnaireData.BloodPressure : "Nie zmierzono",
                Saturation = questionnaireData.Saturation.Trim() != "" ? questionnaireData.Saturation : "Nie zmierzono",
                Pulse = questionnaireData.Pulse.Trim() != "" ? questionnaireData.Pulse : "Nie zmierzono"
            };
            _QuestionnaireData.Questionnaire.Add(questionnaireResult);
            await _QuestionnaireData.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuestionnaireById), new { id = questionnaireResult.Id }, questionnaireResult);


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

        private string CreateParametersResponse(string temperature, string bloodPressure, string saturation, string pulse)
        {
            return String.Concat("Zmierzone parametry - temperatura: ", temperature, "; cisnienie: ", bloodPressure, "; saturacja: ", saturation, "; puls: ", pulse);
        }

        private string CreateSympthomsResponse(string[] sympthoms)
        {
            var response = "";

            foreach(var sy in sympthoms)
            {
                response = String.Concat(response, " ", sy);
            }

            return response;
        }
    }
}
