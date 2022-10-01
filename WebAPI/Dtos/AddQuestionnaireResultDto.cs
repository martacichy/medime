namespace medime.Dtos
{
    public class AddQuestionnaireResultDto
    {
        public QuestionnaireData questionnaireData { get; set;  }

        public class QuestionnaireData
        {
            public string Jwt { get; set; }
            public string HealthLevel { get; set; }
            public string Description { get; set; }
            public string[] Sympthoms { get; set; }
            public string? MedicineName { get; set; }
            public string? Temperature { get; set; }
            public string? BloodPressure { get; set; }
            public string? Saturation { get; set; }
            public string? Pulse { get; set; }
        }
    }
}
