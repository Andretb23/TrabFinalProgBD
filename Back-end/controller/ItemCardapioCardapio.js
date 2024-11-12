import itemCardapioCardapio from "../model/ItemCardapioCardapioModel.js"

async function listar_itemCardapioCardapio(req, res){
    await itemCardapioCardapio
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_itemCardapioCardapio(req, res){
    await itemCardapioCardapio
    .findByPk(req.params.id_item_cardapio_card)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_itemCardapioCardapio(req, res){
    if (!req.body.id_cardapio)
        res.status(500).send("Parametro id_cardapio é obrigatório.");
    else if (!req.body.id_item_cardapio)
        res.status(500).send("Parâmetro id_item_cardapio é obrigatório.");
    else
        await itemCardapioCardapio
        .create({ 
            id_cardapio: req.body.id_cardapio,
            id_item_cardapio: req.body.id_item_cardapio
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_itemCardapioCardapio(req, res){
    await itemCardapioCardapio
    .update({ 
        id_cardapio: req.body.id_cardapio,
        id_item_cardapio: req.body.id_item_cardapio
    },
    {
        where:  {
            id_item_cardapio_card: req.params.id_item_cardapio_card}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_itemCardapioCardapio(req, res){
    await itemCardapioCardapio
    .destroy(
    {
        where:  {
            id_item_cardapio_card: req.params.id_item_cardapio_card}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_itemCardapioCardapio, selecionar_itemCardapioCardapio, cadastrar_itemCardapioCardapio, alterar_itemCardapioCardapio, deletar_itemCardapioCardapio };