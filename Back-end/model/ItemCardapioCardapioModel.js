import { Sequelize } from "sequelize";
import banco from "../banco.js";


const ItemCardapioCardapio = banco.define("item_cardapio_cardapio", {
    id_item_cardapio_card: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_item_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Cardapio',
            key: 'id_cardapio'
        }
    },
    id_item_cardapio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'ItemCardapio',
            key: 'id_item_cardapio'
        }
    }
});

export default ItemCardapioCardapio;