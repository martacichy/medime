using medime.Models.DBModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace medime.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class IllnessTypesController : ControllerBase {
        private IllnessTypesContext _illnessTypesData;

        public IllnessTypesController(IllnessTypesContext illnessTypesData) {
            _illnessTypesData = illnessTypesData;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetIllnessTypes() {
            return Ok(_illnessTypesData.IllnessTypes.ToList());
        }

    }
}
