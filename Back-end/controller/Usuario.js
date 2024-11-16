import usuario from "../model/UsuarioModel.js"

async function listar_usuario(req, res){
    await usuario
    .findAll()
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function selecionar_usuario(req, res){
    await usuario
    .findByPk(req.params.id_usuario)
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function cadastrar_usuario(req, res){
    if (!req.body.nome)
        res.status(500).send("Parametro nome é obrigatório.");
    else if (!req.body.login)
        res.status(500).send("Parâmetro login é obrigatório.");
    else if (!req.body.senha)
        res.status(500).send("Parâmetro senha é obrigatório.");
    else if (!req.body.tipo_usuario)
        res.status(500).send("Parâmetro tipo_usuario é obrigatório.");
    else if (!req.body.ativo)
        res.status(500).send("Parâmetro ativo é obrigatório.");
    else
        await usuario
        .create({ 
            nome: req.body.nome,
            login: req.body.login,
            senha: req.body.senha,
            tipo_usuario: req.body.tipo_usuario,
            ativo: req.body.ativo
        })
        .then(resultado => { res.status(200).json(resultado)} )
        .catch(erro => { res.status(500).json(erro) });
};


async function alterar_usuario(req, res){
    await usuario
    .update({ 
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        tipo_usuario: req.body.tipo_usuario,
        ativo: req.body.ativo
    },
    {
        where:  {
            id_usuario: req.params.id_usuario}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};

async function deletar_usuario(req, res){
    await usuario
    .destroy(
    {
        where:  {
            id_usuario: req.params.id_usuario}
    })
    .then(resultado => { res.status(200).json(resultado)} )
    .catch(erro => { res.status(500).json(erro) });
};


export default { listar_usuario, selecionar_usuario, cadastrar_usuario, alterar_usuario, deletar_usuario };