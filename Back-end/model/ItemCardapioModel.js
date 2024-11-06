import { Sequelize } from "sequelize";
import banco from "../banco.js";


const ItemCardapio = banco.define("item_cardapio", {
    id_item_cardapio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao_item: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_item: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_item: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.NUMERIC,
        allowNull: false
    }
});

export default ItemCardapio;