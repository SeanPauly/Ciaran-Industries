const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');
/* const { studystar } = require('./subapps/studystar'); */
const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

admin.initializeApp(functions.config().firebase);
/*
// Middleware to handle subdomains
app.use((req, res, next) => {
    const subdomain = req.subdomains[0]; // Extract the subdomain from the request
  
    if (subdomain === 'studystar') {
      req.url = `/studystar${req.url}`; // Prepend '/studystar' to the URL
    }
  
    next();
  }); */

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
response.render('index');
});

app.get('/about/',async (request,response) =>{
  response.render('about');
});

app.get('/innovations/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/innovations/ciaran',async (request,response) =>{
  response.render('ciaran-info');
});

app.get('/ciaran-demo/',async (request,response) =>{
  response.render('ciaran-demo');
});

app.get('/news/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/shop/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/timeline/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/invest-supply/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/career/',async (request,response) =>{
  response.render('comingsoon');
});

app.get('/contact/',async (request,response) =>{
    var db_result = await getFirestore();
    response.render('contact',{db_result});
});


/*
app.use('/studystar', studystar);


for (const file of files) {
  const pth = '/' + file  
  app.get(pth, function(req, res) {
    const newpth = "views/assets" + pth 
    res.sendFile(path.join(__dirname, newpth));
  });
*/
exports.app = functions.https.onRequest(app);