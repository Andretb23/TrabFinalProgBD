import { QueryTypes } from "sequelize";
import comanda from "../model/ComandaModel.js";
import moment from 'moment';
import banco from "../banco.js";

async function listar_comanda(req, res) {
  await comanda
    .findAll()
    .then(resultado => { res.status(200).json(resultado); })
    .catch(erro => { res.status(500).json(erro); });
};

async function selecionar_comanda(req, res) {
  await comanda
    .findByPk(req.params.id_comanda)
    .then(resultado => { res.status(200).json(resultado); })
    .catch(erro => { res.status(500).json(erro); });
};

async function cadastrar_comanda(req, res) {
  try {
    const hoje = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!req.body.nome_cliente) {
      return res.status(400).send("O campo 'nome_cliente' é obrigatório.");
    }

    const novaComanda = await comanda.create({
      nome_cliente: req.body.nome_cliente,
      data_abertura: hoje,
      status: true, // Garantindo o status padrão como aberta
    });

    return res.status(201).json(novaComanda);
  } catch (error) {
    console.error("Erro ao cadastrar comanda:", error);
    return res.status(500).json({ error: "Erro ao cadastrar comanda", details: error.message });
  }
}

async function alterar_comanda(req, res) {
  await comanda
    .update({
      nome_cliente: req.body.nome_cliente,
      data_abertura: req.body.data_abertura,
      data_fechamento: req.body.data_fechamento,
      status: req.body.status
    },
      {
        where: {
          id_comanda: req.params.id_comanda
        }
      })
    .then(resultado => { res.status(200).json(resultado); })
    .catch(erro => { res.status(500).json(erro); });
};

async function deletar_comanda(req, res) {
  await comanda
    .destroy(
      {
        where: {
          id_comanda: req.params.id_comanda
        }
      })
    .then(resultado => { res.status(200).json(resultado); })
    .catch(erro => { res.status(500).json(erro); });
};

async function listarItensComanda(req, res) {
  try {
    const { id_comanda } = req.params;

    const itens = await banco.query(
      `SELECT 
        ic2.nome_item,
        ic2.preco
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

async function encerrarComanda(req, res) {
  const { id_comanda } = req.params;

  try {
    // Chama a stored procedure 'encerrar_comanda' passando o ID da comanda
    await banco.query(
      'CALL encerrar_comanda($1)', // Chama a stored procedure e passa o parâmetro
      {
        bind: [id_comanda], // 'bind' é usado para mapear os parâmetros em ordem
        type: QueryTypes.RAW
      }
    );

    res.status(200).send("Comanda encerrada com sucesso!");
  } catch (error) {
    console.error("Erro ao encerrar comanda:", error);
    res.status(500).json({ error: "Erro ao encerrar comanda", details: error.message });
  }
}

async function mostrar_Valor_Comanda(req, res) {
  try {
    const { id_comanda } = req.params;

    const itens = await banco.query(
      `SELECT 
        total
      FROM comanda c
      WHERE c.id_comanda = :id_comanda`,
      {
        replacements: { id_comanda },
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(itens);
  } catch (error) {
    console.error("Erro ao mostrar total da comanda:", error); // Exibe o erro completo no console
    res.status(500).json({ error: "Erro ao mostrar o total da comanda", details: error.message });
  }
}

async function listarComandasPorData(req, res) {
  const { data } = req.params; // Obtém a data da URL (no formato YYYY-MM-DD)

  try {
    // Realiza a consulta no banco de dados, usando DATE() para comparar apenas a parte da data (sem hora)
    const comandas = await banco.query(
      `SELECT * FROM comanda WHERE DATE(data_fechamento) = :data`,
      {
        replacements: { data }, // Substitui o parâmetro :data na consulta
        type: QueryTypes.SELECT, // Define que a consulta é do tipo SELECT
      }
    );

    // Retorna as comandas encontradas
    res.status(200).json(comandas);
  } catch (error) {
    console.error("Erro ao listar comandas por data:", error);
    res.status(500).json({ error: "Erro ao listar comandas", details: error.message });
  }
}



export default { listar_comanda, selecionar_comanda, cadastrar_comanda, alterar_comanda, deletar_comanda, listarItensComanda,
   encerrarComanda, mostrar_Valor_Comanda, listarComandasPorData };
