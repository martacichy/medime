using medime.Dtos;
using medime.Helpers;
using medime.Models;
using medime.Models.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medime.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase {

        private NotificationContext _NotificationData;
        private readonly Helpers.JwtService _jwtService;
        private IllnessContext _IllnessData;


        public NotificationController(NotificationContext NotificationData, JwtService jwtService, IllnessContext IllnessData) {
            _NotificationData = NotificationData;
            _jwtService = jwtService;
            _IllnessData = IllnessData;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetNotificationes() {
            return Ok(_NotificationData.Notification.ToList());
        }

        [HttpPost]
        [Route("api/[controller]/getUserNotifications")]
        public IActionResult GetNotificationByUser(GetNotificationByUserDto dto) {
            int userId = GetUserByToken(dto.Jwt);
            var result = new List<NotificationResponse>();
            var response = _NotificationData.Notification.Where(x => x.UserId == userId).ToList();
            foreach (var notification in response) {
                var notificationResponse = new NotificationResponse()
                {
                    Id = notification.Id,
                    MedicineName = notification?.MedicineName,
                    Frequency = notification.Frequency,
                    IfMedicine = notification.IfMedicine,
                    Illness = _IllnessData.Illness.Where(x => x.IllId == notification.IllnessId).FirstOrDefault().IllDesc,
                    Description = notification.Description

                };
                result.Add(notificationResponse);

            }
            
            return
                Ok(result);
        }

        [HttpPost]
        [Route("api/[controller]/getById")]
        public Notification GetNotificationById(int id) {
            return _NotificationData.Notification.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        [Route("api/[controller]/addNotificationUser")]
        public async Task<IActionResult> AddNotificationUser(AddNotificationDto dto)
        {
            var notData = dto.notificationData;
            int userId = GetUserByToken(notData.Jwt);
            var notification = new Notification()
            {
                UserId = userId,
                MedicineName = notData.MedicineName,
                Frequency = notData.NotificationFrequency,
                IfMedicine = notData.IfMedicine,
                IllnessId = notData.IllnessId,
                Description = notData.NotDesc,
            };
            _NotificationData.Notification.Add(notification);
            await _NotificationData.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNotificationById), new { id = notification.Id }, notification);

        }

        [HttpPost]
        [Route("api/[controller]/deleteNotifications")]
        public async Task<IActionResult> DeleteNotifications(DeleteNotificationDto dto)
        {
            foreach (var id in dto.idToDelete)
            {
                var notification = await _NotificationData.Notification.FindAsync(id);
                _NotificationData.Notification.Remove(notification);
                await _NotificationData.SaveChangesAsync();

            }
            return CreatedAtAction(nameof(DeleteNotifications), new { message = "Usunięto" });
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
