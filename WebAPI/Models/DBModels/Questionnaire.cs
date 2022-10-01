using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace medime.Models.DBModels
{
    public partial class Questionnaire
    {
        public Questionnaire()
        {
        }

        [Key]

        public int Id { get; set; }
        public string HealthLevel { get; set; }
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; }
        public string Sympthoms { get; set; }
        public string Description { get; set; }
        public string? MedicineName { get; set; }
        public string? Temperature { get; set; }
        public string? BloodPressure { get; set; }
        public string? Saturation { get; set; }
        public string? Pulse { get; set; }
    }
}
