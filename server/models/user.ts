const mongoose = require('mongoose');
// const graphql = require('graphql');
const Schema = mongoose.Schema;
// const { GraphQLID } = graphql;

const userSchema = new Schema({
    name: String,
    bestFriendId: String,
});

module.exports = mongoose.model('User', userSchema);