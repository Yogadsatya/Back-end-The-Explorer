import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const db= new Sequelize('himpunan','root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
})

export default db