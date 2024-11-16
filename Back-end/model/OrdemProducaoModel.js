import { Sequelize } from "sequelize";
import banco from "../banco.js";


const OrdemProducao = banco.define("ordem_producao", {
    id_ordem_producao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    data_pedido: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_item_comanda: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status_producao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_item_comanda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'ItemComanda',
            key: 'id_item_comanda'
        }
    }
});

export default OrdemProducao;