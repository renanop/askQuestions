//Importing sequelize and the connection with the database
const Sequelize = require('sequelize');
const connection = require('./database');

// Creating the model of a SQL table with JSON
const Questions = connection.define('questions', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});


// Creating the table in the database
Questions.sync({force: false}).then(() => {});

module.exports = Questions;