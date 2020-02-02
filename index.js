const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?nome=Eric
//Route params = /users/1
//Request body = { nome = "Eric", email: "lessa.eric@gmail.com" }

const users = ['Jack', 'Eric'];

function checkUserExists(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exits' });
  }

  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  users[index] = nome;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const index = req.body;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
