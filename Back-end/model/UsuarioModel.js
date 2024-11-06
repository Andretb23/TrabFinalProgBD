import { Sequelize } from "sequelize";
import banco from "../banco.js";


const Usuario = banco.define("usuario", {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    
    }
});

export default Usuario;