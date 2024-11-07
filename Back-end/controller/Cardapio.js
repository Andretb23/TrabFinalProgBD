import cardapio from "../model/CardapioModel.js"

async function listar_cardapio(req, res){
    await cardapio
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_cardapio(req, res){
    await cardapio
    .findByPk(req.params.id_cardapio)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_cardapio(req, res){
    if (!req.body.descricao_cardapio)
        res.status(500).send("Parametro descricao_cardapio é obrigatório.");
    else if (!req.body.ativo)
        res.status(500).send("Parâmetro ativo é obrigatório.");
    else
        await cardapio
        .create({ 
            descricao_cardapio: req.body.descricao_cardapio,
            ativo: req.body.ativo
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_cardapio(req, res){
    await cardapio
    .update({ 
        descricao_cardapio: req.body.descricao_cardapio,
        ativo: req.body.ativo
    },
    {
        where:  {
            id_cardapio: req.params.id_cardapio}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_cardapio(req, res){
    await cardapio
    .destroy(
    {
        where:  {
            id_cardapio: req.params.id_cardapio}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_cardapio, selecionar_cardapio, cadastrar_cardapio, alterar_cardapio, deletar_cardapio };