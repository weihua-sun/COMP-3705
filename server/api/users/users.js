import uuidv4 from 'uuid/v4';

let users = [];
export function listContents(req, res) {
  res.json(users);
}

export function findOne(req, res) {
  var currUser = users.filter(function(user) {
    if(user.id == req.params.id) {
      return true;
    }
  });
  if(currUser.length == 1) {
    res.json(currUser[0]);
  } else {
    res.status(404);//Set status to 404 as movie was not found
    res.json({message: 'Not Found'});
  }
}

export function createUser(req, res) {
  //let id = uuidv4();
  if(!req.body.name ||
    !req.body.address ||
    !req.body.age) {
    res.status(400);
    res.json({message: 'Request is not Valid'});
  } else {
    var newId = uuidv4();
    users.push({
      id: newId,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
    });
    res.status(201);
    res.json({message: 'New user created.' + 'ID' + newId + 'name' + req.body.name + 'address' + req.body.adress + 'age' + req.body.age});

  }

 /* var newId = uuidv4();
  users.push({
    id: newId,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
  });
  res.json({message: 'New user created.'});
  */
}
