const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintainence.hbs');
//   next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'This is Home. Youre Safe!'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    pageTitle : 'Projects Page'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
});
