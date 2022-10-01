using Microsoft.AspNetCore.Mvc;

namespace medime.Dtos
{
    public class AddCustomIllnessDto
    {
        public int SelectedIllType { get; set; }
        public string Illness { get; set; }
        public string Jwt { get; set; }
    }
}
