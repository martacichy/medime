using medime.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medime.UserData {

    public class MockData : IUserData {

        private List<User> users = new List<User> {
            new User() {
                Id = 1,
                FirstName = "Jan",
                LastName = "Kowalski"
            },
            new User() {
                Id = 2,
                FirstName = "Adam",
                LastName = "Małysz"
            },
            new User() {
                Id = 100,
                FirstName = "Jan",
                LastName = "Janowicz"
            }
        };

        public User AddUser(User user) {
            throw new NotImplementedException();
        }
        public User EditUser(User user) {
            throw new NotImplementedException();
        }
        
        public List<User> GetUsers() {
            return users;
        }

        public User GetUsers(int id) {
            return users.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
