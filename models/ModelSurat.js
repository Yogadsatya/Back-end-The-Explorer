import { DataTypes } from "sequelize";
import db from "../config/database.js";
import ModelUser from "./ModelUser.js";

const ModelSurat = db.define('surat', {
    id_surat: {
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nama_surat: {
        type: DataTypes.STRING,

    },
    user_id: {
        type: DataTypes.INTEGER,

    },
    file_surat: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.INTEGER(1),

    },

},{
    freezeTableName: true
})

ModelSurat.belongsTo(ModelUser,{foreignKey:'user_id', as: 'user'})

export default ModelSurat