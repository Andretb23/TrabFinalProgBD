import ordemProducao from "../model/OrdemProducaoModel.js"
import moment from 'moment';

async function listar_ordemProducao(req, res){
    await ordemProducao
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_ordemProducao(req, res){
    await ordemProducao
    .findByPk(req.params.id_ordem_producao)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_ordemProducao(req, res){

    let hoje = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!req.body.id_item_comanda)
        res.status(500).send("Parametro id_item_comanda é obrigatório.");
    else if (!req.body.status_producao)
        res.status(500).send("Parametro status_producao é obrigatório.");
    else
        await ordemProducao
        .create({ 
            data_pedido: hoje,
            id_item_comanda: req.body.id_item_comanda,
            status_producao: req.body.status_producao
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_ordemProducao(req, res){
    await ordemProducao
    .update({ 
        id_item_comanda: req.body.id_item_comanda,
        status_producao: req.body.status_producao
    },
    {
        where:  {
            id_ordem_producao: req.params.id_ordem_producao}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_ordemProducao(req, res){
    await ordemProducao
    .destroy(
    {
        where:  {
            id_ordem_producao: req.params.id_ordem_producao}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_ordemProducao, selecionar_ordemProducao, cadastrar_ordemProducao, alterar_ordemProducao, deletar_ordemProducao };