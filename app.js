const express = require("express");

const app = express(); //express gerencia rota

app.use(express.json()); //indicando que a app pode aceitar receber dados json

const contatos = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4'];

app.get("/", (req,res)=>{ //requisao e resposta do servidor para o usuario
    return res.json(contatos);  //res envia resposta
})

app.get("/contatos", (req,res)=>{ //requisao e resposta do servidor para o usuario
    return res.json(contatos);  //res envia resposta
})

app.get("/contatos/:id", (req,res)=>{ //requisao e resposta do servidor para o usuario
   
    const { id } = req.params; //contaante com parametro id que quero receber pela url
    return res.json({
        nome: contatos[id]
       }); 
})

app.post("/contatos", (req,res) =>{
    const { nome }  = req.body; //recebe todos os dados do corpo que sao enviados atraves do post

    contatos.push(nome);

    return res.json(contatos); //retornando qualquer resposta, no caso, contatos
})

app.put("/contatos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    contatos[id] = nome;

    return res.json(contatos);
})

app.delete("/contatos/:id", (req,res)=>{
    const{id} = req.params;

    contatos.splice(id, 1);  //excluir somente um registro do array 'contatos'
    return res.json(contatos);
})

app.listen(8080, ()=>{
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080/contatos");
})