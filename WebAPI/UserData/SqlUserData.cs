using medime.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medime.UserData {

    public class SqlUserData : IUserData {

        private UserContext _userContext;

        public SqlUserData(UserContext userContext) {
            _userContext = userContext;
        }

        public User AddUser(User user) {
            throw new NotImplementedException();
        }
        public User EditUser(User user) {
            throw new NotImplementedException();
        }
        public List<User> GetUsers() {
            return _userContext.Users.ToList();
        }
        public User GetUsers(int id) {
            var user = _userContext.Users.Find(id);
            return user;

        }
    }
}
