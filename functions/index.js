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

async function getFirestore(){
const firestore_con  = await admin.firestore();
const writeResult = firestore_con.collection('sample').doc('sample_doc').get().then(doc => {
if (!doc.exists) { console.log('No such document!'); }
else {return doc.data();}})
.catch(err => { console.log('Error getting document', err);});
return writeResult
}

// Define a middleware function to check the subdomain
function subdomain(req, res, next) {
  const host = req.headers.host;
  const parts = host.split('.');

  // Check if the subdomain is 'ciaran'
  if (parts.length >= 3 && parts[0] === 'ciaran') {
      // For 'ciaran.ciaranindustries.com', handle 'ciaran' subdomain routes
      req.subdomain = 'ciaran';
      return next();
  } else {
      // For main domain or other subdomains, proceed with normal handling
      return next();
  }
}

app.use(subdomain);


// Define routes for the 'ciaran' subdomain
app.get('/', async (request, response) => {
  // Handle requests for the main domain or other subdomains
  if (request.subdomain === 'ciaran') {
      // Serve routes specific to 'ciaran' subdomain
      response.send('This is the ciaran web app');
  } else {
      // Serve routes for main domain or other subdomains
      response.render('index');
  }
});

// Define other routes specific to the 'ciaran' subdomain
app.get('/about', async (request, response) => {
  if (request.subdomain === 'ciaran') {
      // Handle other routes for 'ciaran' subdomain
      response.render('About page of ciaran.ciaranindustries.com');
  } else {
      // Handle routes for main domain or other subdomains
      response.render('about');
  }
});


app.get('/about/what-we-have-done.hbs/',async (request,response) =>{
  response.render('what-we-have-done')
})

app.get('/about/what-we-believe.hbs/',async (request,response) =>{
  response.render('what-we-believe')
})

app.get('/about/who-we-are.hbs/',async (request,response) =>{
  response.render('who-we-are')
})

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

exports.app = functions.https.onRequest(app);