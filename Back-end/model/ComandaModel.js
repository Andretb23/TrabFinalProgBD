import { Sequelize } from "sequelize";
import banco from "../banco.js";


const Comanda = banco.define("comanda", {
    id_comanda: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_abertura: {
        type: Sequelize.TIME,
        allowNull: false
    },
    data_fechamento: {
        type: Sequelize.TIME
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export default Comanda;