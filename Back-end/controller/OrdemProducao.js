import ordemProducao from "../model/OrdemProducaoModel.js";
import moment from 'moment';
import banco from "../banco.js";  // Certifique-se de importar o banco de dados

// Função para listar todas as ordens de produção
async function listar_ordemProducao(req, res) {
    await ordemProducao
        .findAll()
        .then(resultado => { res.status(200).json(resultado); })
        .catch(erro => { res.status(500).json(erro); });
};

// Função para selecionar uma ordem de produção específica
async function selecionar_ordemProducao(req, res) {
    await ordemProducao
        .findByPk(req.params.id_ordem_producao)
        .then(resultado => { res.status(200).json(resultado); })
        .catch(erro => { res.status(500).json(erro); });
};

// Função para cadastrar uma nova ordem de produção
async function cadastrar_ordemProducao(req, res) {
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
            .then(resultado => { res.status(200).json(resultado); })
            .catch(erro => { res.status(500).json(erro); });
};

// Função para alterar uma ordem de produção existente
async function alterar_ordemProducao(req, res) {
    await ordemProducao
        .update({
            id_item_comanda: req.body.id_item_comanda,
            status_producao: req.body.status_producao
        }, {
            where: { id_ordem_producao: req.params.id_ordem_producao }
        })
        .then(resultado => { res.status(200).json(resultado); })
        .catch(erro => { res.status(500).json(erro); });
};

// Função para deletar uma ordem de produção
async function deletar_ordemProducao(req, res) {
    await ordemProducao
        .destroy({
            where: { id_ordem_producao: req.params.id_ordem_producao }
        })
        .then(resultado => { res.status(200).json(resultado); })
        .catch(erro => { res.status(500).json(erro); });
};

// Função para listar itens para a Cozinha (tipo_item = 2)
async function listar_ordemProducao_cozinha(req, res) {
    try {
        const tipoItem = req.params.tipo_item;  // Pega o tipo_item da URL

        // Consulta ao banco para buscar os pedidos da cozinha
        const resultado = await banco.query(`
            SELECT ic2.nome_item, ic2.tipo_item
            FROM ordem_producao op
            JOIN item_comanda ic ON op.id_item_comanda = ic.id_item_comanda
            JOIN item_cardapio_cardapio icc ON ic.item_comanda_cardapio = icc.id_item_cardapio_card
            JOIN item_cardapio ic2 ON icc.id_item_cardapio = ic2.id_item_cardapio
            WHERE ic2.tipo_item = ?
            ORDER BY op.id_ordem_producao
        `, {
            replacements: [tipoItem],  // Substitui o valor na consulta
            type: banco.QueryTypes.SELECT
        });

        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar itens da cozinha:", erro);
        res.status(500).json({ error: "Erro ao buscar itens da cozinha" });
    }
}

// Função para listar itens para a Copa (tipo_item = 1)
async function listar_ordemProducao_copa(req, res) {
    try {
        const tipoItem = req.params.tipo_item;  // Pega o tipo_item da URL

        // Consulta ao banco para buscar os pedidos da copa
        const resultado = await banco.query(`
            SELECT ic2.nome_item, ic2.tipo_item
            FROM ordem_producao op
            JOIN item_comanda ic ON op.id_item_comanda = ic.id_item_comanda
            JOIN item_cardapio_cardapio icc ON ic.item_comanda_cardapio = icc.id_item_cardapio_card
            JOIN item_cardapio ic2 ON icc.id_item_cardapio = ic2.id_item_cardapio
            WHERE ic2.tipo_item = ?
            ORDER BY op.id_ordem_producao
        `, {
            replacements: [tipoItem],  // Substitui o valor na consulta
            type: banco.QueryTypes.SELECT
        });

        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar itens da copa:", erro);
        res.status(500).json({ error: "Erro ao buscar itens da copa" });
    }
}


export default {
    listar_ordemProducao,
    selecionar_ordemProducao,
    cadastrar_ordemProducao,
    alterar_ordemProducao,
    deletar_ordemProducao,
    listar_ordemProducao_cozinha,
    listar_ordemProducao_copa
};
