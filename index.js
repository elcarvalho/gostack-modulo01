const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?nome=Eric
//Route params = /users/1
//Request body = { nome = "Eric", email: "lessa.eric@gmail.com" }

server.get('/', (req, res) => {
  const { nome } = req.query;

  return res.json({ message: `Hello ${nome}` });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando usuário ${id}` });
});

server.post('/users', (req, res) => {
  const { nome, email } = req.body;

  return res.json({ message: `Nome: ${nome}, E-mail: ${email}` });
});

server.listen(3000);
