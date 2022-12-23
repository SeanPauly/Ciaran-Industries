const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

admin.initializeApp(functions.config().firebase);


async function getFirestore(){
const firestore_con  = await admin.firestore();
const writeResult = firestore_con.collection('sample').doc('sample_doc').get().then(doc => {
if (!doc.exists) { console.log('No such document!'); }
else {return doc.data();}})
.catch(err => { console.log('Error getting document', err);});
return writeResult
}

app.get('/',async (request,response) =>{
var db_result = await getFirestore();
response.render('index',{db_result});
});

app.get('/innovation/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('innovation',{db_result});
});

app.get('/thestory/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('thestory',{db_result});
});


app.get('/projects/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('projects',{db_result});
});

app.get('/services/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('services',{db_result});
});

app.get('/products/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('products',{db_result});
});


app.get('/careers/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('careers',{db_result});
});

app.get('/contact/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('contact',{db_result});
});


exports.app = functions.https.onRequest(app);