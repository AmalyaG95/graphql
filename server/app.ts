const express = require('express');
const graphqlObj = require('express-graphql');
const schema = require('./schema/schema.ts');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://Amalya:kaycorik22@cluster0.jfcac.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
    
})

const app = express();

app.use(cors()); 

app.use('/graphql', graphqlObj.graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
    
})