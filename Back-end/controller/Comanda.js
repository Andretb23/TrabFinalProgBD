import comanda from "../model/ComandaModel.js"
import moment from 'moment';

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

    let hoje = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

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


export default { listar_comanda, selecionar_comanda, cadastrar_comanda, alterar_comanda, deletar_comanda };