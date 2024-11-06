import { Sequelize } from "sequelize";
import banco from "../banco.js";


const TipoUsuario = banco.define("tipo_usuario", {
    id_tipo_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default TipoUsuario;