const Sequelize = require('sequelize-cockroachdb');

const db = async () => {
    try {
        const connectionString = process.env.COCKROACH_URL;
        const sequelize = new Sequelize(connectionString)
        console.log("База данных успешно загружена");
    } catch (error) {
        console.log("Ошибка загрузки базы данных");
    }
}

module.exports = { db }