//import uuidv4 from 'uuid/v4';
import User from './users.model';

// let users = [];
export function index(req, res) {
  res.json(User.find());
}

export function show(req, res) {
  var users = User.findById(req.params.id);
  if(users === null) {
    res.status(404);
    res.json({message: 'Not Found'});
  } else {
    res.json(users);
  }
}

export function create(req, res) {
  if(!req.body.name ||
    !req.body.address ||
    !req.body.age) {
    res.status(400);
    res.json({message: 'Request is not Valid'});
  } else {
    var input = {
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    };
    var users = User.create(input);
    res.status(201);
    res.send(users);
  }
}

export function upsert(req, res) {
  var input = User.findOneAndUpdate(req.params.id);
  if(input === false) {
    res.status(201);
    res.json({message: 'new user' + req.params.id + 'created'});
  } else {
    res.status(200);
    res.json({message: 'user' + req.params.id + 'updated'});
  }
}


export function destroy(req, res) {
  var input = User.remove(req.params.id);

  if(input === false) {
    res.json({message: 'Not found'});
  } else {
    res.status(204).send();
  }
}

