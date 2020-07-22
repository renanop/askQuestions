const Sequelize = require('sequelize');


// Creating the table on the database. The askquestions database was created previously on mysql workbench.
const connection = new Sequelize('askquestions','root','renan012', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;