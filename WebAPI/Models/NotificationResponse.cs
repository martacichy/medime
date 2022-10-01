using System;

namespace medime.Models
{
    public class NotificationResponse
    {
        public int Id { get; set; }
        public string Frequency { get; set; }
        public bool IfMedicine { get; set; }
        public string Description { get; set; }
#nullable enable
        public string? MedicineName { get; set; }
        public string? Illness { get; set; }

    }
}
