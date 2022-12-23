const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var serviceAccount = require("./ciaranindustries-firebase-adminsdk-7dmsc-38bed26896.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://ciaranindustries-default-rtdb.firebaseio.com"
});

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
exports.app = functions.https.onRequest(app);