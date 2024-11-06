import express  from "express";
import banco from "./banco.js";

import cors from "cors";

import usuario from "./controller/Usuario.js";

try {
    await banco.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express();
app.use(express.json());
app.use(cors());

app.get('/teste', (request, response) => {
    response.status(200).send('Requisição recebida.');
});


app.get("/usuario", usuario.listar_usuario);
app.get("/usuario/:id_usuario", usuario.selecionar_usuario);
app.post("/usuario/", usuario.cadastrar_usuario);
app.put("/usuario/:id_usuario", usuario.alterar_usuario);
app.delete("/usuario/:id_usuario", usuario.deletar_usuario);
 

app.listen(5000);