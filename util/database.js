// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:''
// });

// module.exports = pool.promise();

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete','root', '', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

//  module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://sumitnair26:2SNUtRsSSyeYkQup@cluster0.mtbwp.mongodb.net/shop?retryWrites=true&w=majority')
    .then( client => {
        _db = client.db();
        console.log('Connected');
        callback();
    }).catch(
        err=> {
            console.log(err);
            throw err;
        }
    );
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Databse found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

