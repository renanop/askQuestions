const Sequelize = require('sequelize');
const connection = require("./database");

// Creating the model of a SQL database for the answers using JSON (Sequelize)

const Answers = connection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answers.sync({force: false});

module.exports = Answers;