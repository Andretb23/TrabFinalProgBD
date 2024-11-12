import itemComanda from "../model/ItemComandaModel.js"

async function listar_itemComanda(req, res){
    await itemComanda
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_itemComanda(req, res){
    await itemComanda
    .findByPk(req.params.id_item_comanda)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_itemComanda(req, res){
    if (!req.body.id_comanda)
        res.status(500).send("Parametro id_comanda é obrigatório.");
    else if (!req.body.item_comanda_cardapio)
        res.status(500).send("Parâmetro item_comanda_cardapio é obrigatório.");
    else
        await itemComanda
        .create({ 
            id_comanda: req.body.id_comanda,
            item_comanda_cardapio: req.body.item_comanda_cardapio
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_itemComanda(req, res){
    await itemComanda
    .update({ 
        id_comanda: req.body.id_comanda,
        item_comanda_cardapio: req.body.item_comanda_cardapio
    },
    {
        where:  {
            id_item_comanda: req.params.id_item_comanda}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_itemComanda(req, res){
    await itemComanda
    .destroy(
    {
        where:  {
            id_item_comanda: req.params.id_item_comanda}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_itemComanda, selecionar_itemComanda, cadastrar_itemComanda, alterar_itemComanda, deletar_itemComanda };