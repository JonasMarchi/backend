// Projeto básico de rotas - backend com node.js

const express = require("express");
const app = express();
app.use(express.json());

//banco de dados fake
let usuarios = [
    {id: 1, nome: "João", email: "joao@gmail.com"},
    {id: 2, nome: "Maria", email: "maria@gmail.com"},
    {id: 3, nome: "Carlos", email: "carlos@gmail.com"},
];

//get - Pagina inicial
app.get("/", (req, res) =>{
    res.send("Servidor funcionando com sucesso!");
});

//get - Lista de usuarios
app.get("/usuarios", (req, res) =>{
    res.json(usuarios);
});

//get com parametro("filtro")
app.get("/usuario/:id", (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
    res.json(usuario);
});

//post - cadastrar usuario
app.post("/cadastro", (req, res) =>{
    const{ nome, email } = req.body;

    if(!nome || !email){
        return res.status(400).json({
            mensagem: "Nome e email são obrigatórios"
        });
    }
    const novoUsuario = {
        id:usuarios.length + 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Cadastro realizado com sucesso!",
        usuario: novoUsuario
    });
})

//Put - editar usuario
app.put("/editar/:id", (req, res) => {
    const id = Number(req.params.id);
    const{ nome, email } = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    if(nome) usuario.nome = nome; // criei
    if(email) usuario.email = email; // criei

    res.json({
        mensagem: "Usuário editado com sucesso!",
        usuario
    })
});

//Delete - deletar usuario
app.delete("/deletar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if(index === -1 ){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    const usuarioRemovido = usuarios.splice(index, 1);
    res.json({
        mensagem: "Usuário deletado com sucesso!",
        usuario: usuarioRemovido[0]
    });
});

// Servidor

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})