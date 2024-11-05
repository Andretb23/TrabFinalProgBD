import express  from "express";
import banco from "./banco.js";

import cors from "cors";

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



app.listen(5000);