import express  from "express";
import banco from "./banco.js";

import cors from "cors";

import usuario from "./controller/Usuario.js";
import cardapio from "./controller/Cardapio.js";
import itemCardapio from "./controller/ItemCardapio.js";


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


app.get("/cardapio", cardapio.listar_cardapio);
app.get("/cardapio/:id_cardapio", cardapio.selecionar_cardapio);
app.post("/cardapio/", cardapio.cadastrar_cardapio);
app.put("/cardapio/:id_cardapio", cardapio.alterar_cardapio);
app.delete("/cardapio/:id_cardapio", cardapio.deletar_cardapio);


app.get("/itemcardapio", itemCardapio.listar_itemCardapio);
app.get("/itemcardapio/:id_item_cardapio", itemCardapio.selecionar_itemCardapio);
app.post("/itemcardapio/", itemCardapio.cadastrar_itemCardapio);
app.put("/itemcardapio/:id_item_cardapio", itemCardapio.alterar_itemCardapio);
app.delete("/itemcardapio/:id_item_cardapio", itemCardapio.deletar_itemCardapio);
 

app.listen(5000);