namespace medime.Models
{
    public class QuestionnaireResponse
    {
        public int Id { get; set; }
        public string HealthLevel { get; set; }
        public string CreationDate { get; set; }
        public string Description { get; set; }
        public string MedicineName { get; set; }
        public string Parameters { get; set; }
        public string Sympthoms { get; set; }
    }
}
