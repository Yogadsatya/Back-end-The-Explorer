import { DataTypes } from "sequelize";
import db from "../config/database.js";

const ModelRole = db.define('role', {
    id_role: {
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        
    }

},{
    freezeTableName: true

})

export default ModelRole