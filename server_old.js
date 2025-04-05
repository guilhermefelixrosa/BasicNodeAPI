//Importando bibliotecas
import express from "express";

const app = express(); // Instanciando express
app.use(express.json()); // Middleware para interpretar JSON no corpo da requisição, ou seja, dizendo pro meu express que o corpo da requisição é um JSON

const users = [
  { id: 1, name: "Lucas" },
  { id: 2, name: "Ana" },
  { id: 3, name: "João" },
]; // Array de usuários

app.post("/usuarios", (req, res) => {
  const user = req.body; // Capturando o corpo da requisição
  users.push(user); // Adicionando o usuário ao array
  res.status(201).send("Usuário criado com sucesso!" + JSON.stringify(user)); // Enviando resposta de sucesso
});

app.get("/usuarios", (req, res) => {
  // res.send("Lista de usuarios" + JSON.stringify(users)); // Enviando a lista de usuários
  res.json(users);// Enviando a lista de usuários em formato JSON
});

app.listen(3000); // Iniciando o servidor na porta 3000
console.log("Servidor rodando: http://localhost:3000/"); // Mensagem de confirmação

/* 

  Criar um usuário
  Listar todos os usuários
  Editar um usuário
  Deletar um usuário

*/
