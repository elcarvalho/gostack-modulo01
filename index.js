const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?nome=Eric
//Route params = /users/1
//Request body = { nome = "Eric", email: "lessa.eric@gmail.com" }

const users = ['Jack', 'Eric'];

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.post('/users', (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);
});

server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  users[index] = nome;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const index = req.body;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
