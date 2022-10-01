using Microsoft.AspNetCore.Mvc;
namespace medime.Dtos

{
    public class AddNotificationDto
    {
        public NotificationData notificationData { get; set; }
        
        
    }
    public class NotificationData
    {
        public string Jwt { get; set; }
        public bool IfMedicine { get; set; }

        public string NotificationFrequency { get; set; }
        
        public int IllnessId { get; set; }

#nullable enable
        public string? NotDesc { get; set; }
        public string? MedicineName { get; set; }
    }

}

