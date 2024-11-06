import { Sequelize } from "sequelize";
import banco from "../banco.js";


const ItemComanda = banco.define("item_comanda", {
    id_item_comanda: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_comanda: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_comanda_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_comanda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Comanda',
            key: 'id_comanda'
        }
    },
    item_comanda_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'ItemCardapioCardapio',
            key: 'id_item_cardapio_card'
        }
    }
});

export default ItemComanda;