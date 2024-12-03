import { QueryTypes } from "sequelize";
import comanda from "../model/ComandaModel.js";
import moment from 'moment';
import banco from "../banco.js";

async function listar_comanda(req, res){
    await comanda
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_comanda(req, res){
    await comanda
    .findByPk(req.params.id_comanda)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_comanda(req, res){

    let hoje = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!req.body.nome_cliente)
        res.status(500).send("Parametro nome_cliente é obrigatório.");
    //else if (!req.body.data_fechamento)
    //    res.status(500).send("Parâmetro data_fechamento é obrigatório.");
    else if (!req.body.status)
        res.status(500).send("Parâmetro status é obrigatório.");
    else
        await comanda
        .create({ 
            nome_cliente: req.body.nome_cliente,
            data_abertura: hoje,
            data_fechamento: req.body.data_fechamento,
            status: req.body.status
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_comanda(req, res){
    await comanda
    .update({ 
        nome_cliente: req.body.nome_cliente,
            data_abertura: req.body.data_abertura,
            data_fechamento: req.body.data_fechamento,
            status: req.body.status
    },
    {
        where:  {
            id_comanda: req.params.id_comanda}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_comanda(req, res){
    await comanda
    .destroy(
    {
        where:  {
            id_comanda: req.params.id_comanda}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function listarItensComanda(req, res) {
    try {
      const { id_comanda } = req.params;
  
      const itens = await banco.query(
        `SELECT ic2.nome_item 
         FROM comanda c
         JOIN item_comanda ic ON c.id_comanda = ic.id_comanda
         JOIN item_cardapio_cardapio icc ON ic.item_comanda_cardapio = icc.id_item_cardapio_card
         JOIN item_cardapio ic2 ON icc.id_item_cardapio = ic2.id_item_cardapio
         WHERE c.id_comanda = :id_comanda`,
        {
          replacements: { id_comanda },
          type: QueryTypes.SELECT,
        }
      );
  
      res.status(200).json(itens);
    } catch (error) {
      console.error("Erro ao listar itens da comanda:", error); // Exibe o erro completo no console
      res.status(500).json({ error: "Erro ao listar itens da comanda", details: error.message });
    }
  }
  


export default { listar_comanda, selecionar_comanda, cadastrar_comanda, alterar_comanda, deletar_comanda, listarItensComanda };