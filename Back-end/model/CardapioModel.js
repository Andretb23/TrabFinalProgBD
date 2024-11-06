import { Sequelize } from "sequelize";
import banco from "../banco.js";


const Cardapio = banco.define("cardapio", {
    id_cardapio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao_cardapio: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

export default Cardapio;