import { DataTypes } from "sequelize";
import db from "../config/database.js";
import ModelRole from "./ModelRole.js";

const ModelUser = db.define('user', {
    id_user: {
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        
    },
    username: {
        type: DataTypes.STRING,
        
    },
    password: {
        type: DataTypes.STRING,
        
    },
    image: {
        type: DataTypes.STRING,
        
    },
    token: {
        type: DataTypes.STRING,
        
    },
    role_id: {
        type: DataTypes.INTEGER,
        
    },

},{
    freezeTableName: true

})

ModelUser.belongsTo(ModelRole, {foreignKey:'role_id', as:'role'})

export default ModelUser