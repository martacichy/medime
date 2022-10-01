using Microsoft.AspNetCore.Mvc;

namespace medime.Dtos
{
    public class AddIllnessDto
    {
        public int SelectedIllID { get; set; }
        public string Jwt { get; set; }
    }
}
