const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to log to Server');
        }
  });

  next();
  
} );

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  res.render('maintenance.hbs');

});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
} );

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome',
    welcomeText: 'Welcome Everyone'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {

res.send({
  errorMessage: 'Unable to handle the request'
})

});

app.listen(3000,() => {
  console.log('Server is up on the port 3000');
} );
