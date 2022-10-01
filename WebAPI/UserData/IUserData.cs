using medime.Models;
using System.Collections.Generic;

namespace medime.UserData {

    public interface IUserData {

        List<User> GetUsers();

        User GetUsers(int id);


        User AddUser(User user);

        User EditUser(User user);
    }
}
