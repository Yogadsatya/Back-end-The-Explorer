import { DataTypes } from "sequelize";
import db from "../config/database.js";
import ModelUser from "./ModelUser.js";

const ModelKas = db.define('tb_kas',{
    id_kas: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    bulan: {
        type: DataTypes.CHAR(50),
    },
    total_bayar: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.TINYINT(1)
    }
},{
    freezeTableName: true
})

ModelKas.belongsTo(ModelUser, {foreignKey: "user_id", as: "user"})

export default ModelKas
