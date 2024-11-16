import itemCardapio from "../model/ItemCardapioModel.js"

async function listar_itemCardapio(req, res){
    await itemCardapio
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_itemCardapio(req, res){
    await itemCardapio
    .findByPk(req.params.id_item_cardapio)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_itemCardapio(req, res){
    if (!req.body.descricao_item)
        res.status(500).send("Parametro descricao_item é obrigatório.");
    else if (!req.body.nome_item)
        res.status(500).send("Parâmetro nome_item é obrigatório.");
    else if (!req.body.tipo_item)
        res.status(500).send("Parâmetro tipo_item é obrigatório.");
    else if (!req.body.preco)
        res.status(500).send("Parâmetro preco é obrigatório.");
    else
        await itemCardapio
        .create({ 
            descricao_item: req.body.descricao_item,
            nome_item: req.body.nome_item,
            tipo_item: req.body.tipo_item,
            preco: req.body.preco
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_itemCardapio(req, res){
    await itemCardapio
    .update({ 
        descricao_item: req.body.descricao_item,
        nome_item: req.body.nome_item,
        tipo_item: req.body.tipo_item,
        preco: req.body.preco
    },
    {
        where:  {
            id_item_cardapio: req.params.id_item_cardapio}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_itemCardapio(req, res){
    await itemCardapio
    .destroy(
    {
        where:  {
            id_item_cardapio: req.params.id_item_cardapio}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_itemCardapio, selecionar_itemCardapio, cadastrar_itemCardapio, alterar_itemCardapio, deletar_itemCardapio };