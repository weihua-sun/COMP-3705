import uuidv4 from 'uuid/v4';


class User {
  users = [];

  find() {
    // Returns a list of all users
    return this.users;
  }

  findById(userId) {
    // Find user by Id
    // Returns user, or null if not present
    var a = 0;
    for(var i = 0; i < this.users.length; i++) {
      if(this.users[i].id == userId) {
        a += 1;
        return this.users[i];
      }
    }
    if(a == 0) {
      return null;
    }
  }

  create(user) {
    // Create a new user
    // Return created user
    // Generate the id and overwrite any id that may be present in user
    var newId = uuidv4();
    var Newuser = ({
      id: newId,
      name: user.name,
      address: user.address,
      age: user.age,
    });
    this.users.push(Newuser);
    return Newuser;
  }

  findOneAndUpdate(user) {
    // Find user and update
    // If user does not exist, create it using Id provided
    // Return true if user was updated, false if user was created
    var updateIndex = this.users.map(function(U) {
      return U.id;
    }).indexOf((user.id));

    if(updateIndex === -1) {
      //Movie not found, create new
      this.users.push({
        id: user.id,
        name: user.name,
        address: user.address,
        age: user.age
      });
      return false;
    } else {
      //Update existing
      this.users[updateIndex] = {
        id: user.id,
        name: user.name,
        address: user.address,
        age: user.age
      };
      return true;
    }
  }

  remove(user) {
    // Remove user if exists with the Id provided
    // Return true if removed
    // Return false if did user not exist
    var removeIndex = this.users.map(function(U) {
      return U.id;
    }).indexOf(user.id);

    if(removeIndex === -1) {
      return false;
    } else {
      this.users.splice(removeIndex, 1);
      return true;
    }
  }
}

export default new User();
