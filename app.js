const express = require("express");

const app = express(); //express gerencia rota

app.use(express.json()); //indicando que a app pode aceitar receber dados json

const contatos = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4'];


//utilização de middleware


/*app.use((req, res , next)=>{
    console.log("Acessou o Middleware!"); //executado antes da instrução executar
    next(); 
})

*/

function valContato(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        })
    }
    return next();
}

function valPosContato(req, res, next) {
    if (!contatos[req.params.id]) {
        return res.status(400).json({
            error: "Contato não encontado!"
        })
    }
    return next();
}



app.get("/", (req,res)=>{ 
    return res.json(contatos);  
});

app.get("/contatos", (req,res)=>{ //requisao e resposta do servidor para o usuario
    console.log("Acessou o listar Middleware!");
    return res.json(contatos);  //res envia resposta
});

app.get("/contatos/:id", valPosContato, (req,res)=>{ //requisao e resposta do servidor para o usuario
   
    const { id } = req.params; //contaante com parametro id que quero receber pela url
    return res.json({
        nome: contatos[id]
       }); 
});

app.post("/contatos", valContato, (req,res) =>{
    const { nome }  = req.body; //recebe todos os dados do corpo que sao enviados atraves do post

    contatos.push(nome);

    return res.json(contatos); //retornando qualquer resposta, no caso, contatos
});

app.put("/contatos/:id", valPosContato,  valContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    contatos[id] = nome;

    return res.json(contatos);
});

app.delete("/contatos/:id", valPosContato, (req,res)=>{
    const{id} = req.params;

    contatos.splice(id, 1);  //excluir somente um registro do array 'contatos'
    return res.json(contatos);
})

app.listen(8080, ()=>{
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080/contatos");
});