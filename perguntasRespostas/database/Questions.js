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


// Writing the data on the SQL table
Questions.sync({force: false}).then(() => {});

module.exports = Questions;