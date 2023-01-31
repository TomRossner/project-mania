const {MongoClient} = require("mongodb");

const url = process.env.MongoURL;
const client = new MongoClient(url);
const dbName = process.env.dbName;
const db = client.db(dbName);
const usersCollection = db.collection('users');
const boardsCollection = db.collection('boards');

module.exports = {
    client,
    usersCollection,
    boardsCollection
}