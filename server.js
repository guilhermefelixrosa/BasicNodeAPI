//Importando bibliotecas
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Instanciando o Prisma Client, que é o cliente do banco de dados

const app = express(); // Instanciando express
app.use(express.json()); // Middleware para interpretar JSON no corpo da requisição, ou seja, dizendo pro meu express que o corpo da requisição é um JSON

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }, // Capturando o corpo da requisição
  }); // Adicionando o usuário ao banco de dados

  res.status(201).json(req.body); // Enviando resposta de sucesso
});

app.get("/usuarios", async (req, res) => {

  let users = []
  if(req.query){
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email
      }
    });
  }else{
    users = await prisma.user.findMany(); // Buscando todos os usuários no banco de dados
  }
  
  res.status(200).json(users); 
});

app.put("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }, // Capturando o corpo da requisição
  }); // Editando o usuário no banco de dados

  res.status(200).json(user); // Enviando resposta de sucesso
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  }); // Deletando o usuário no banco de dados

  res.status(204).send({ message: "Usuário deletado com sucesso." }); // Enviando resposta de sucesso
}); // Enviando resposta de sucesso

app.listen(3000); // Iniciando o servidor na porta 3000
console.log("Servidor rodando: http://localhost:3000/"); // Mensagem de confirmação

/* 

  Criar um usuário
  Listar todos os usuários
  Editar um usuário
  Deletar um usuário

*/
